/* eslint-disable no-undef */
// Creates listings based on database info
const createListingElement = listing => {
  let $listing = `
  <div id='listing${listing.id}' class="posts">
    <img src='${listing.imageurl}' class="carPhoto" />
    <button id="starButton${listing.id}" class='starButton submitListingStar star${listing.id}' data-id='${listing.id}' type="button">
      <i class="star fa-solid fa-star"></i>
    </button>
    <button id="starRemoveButton${listing.id}" class='starRemoveButton submitRemoveListingStar starRemove${listing.id}' data-id='${listing.id}' type="button">
      <i class="star fa-solid fa-star"></i>
    </button>
    <div class="postBox">
      <div class="titlePrice">
        <div class="postTitle"> #${listing.id} ${listing.year} ${listing.make} ${listing.model}</div>
        <div class="postPrice">$${listing.price}</div>
      </div>
      <div class='messageButtonContainer'>
        <div class="postInfo">
          <div>
            <b><p> Color: ${listing.color}</p></b>
          </div>
          <div>
            ${listing.transmission ?  '<b>M/T</b>' : '<b>A/T</b>'}
          </div>
          <div>
            <b>${listing.odometer} KM</b>
          </div>
        </div>
        <div class="contact">
          <button class='messageButton submitListingMessage message${listing.id}' data-id='${listing.id}' type='button'>
          <i class="fa-solid fa-message"></i></button>
          <div>
          <b>${listing.name}</b>
          </div>
          <div>
          <strong>${listing.city}, ${listing.province} ${listing.country}</strong>
          </div>
        </div>
      </div>
      <div class="description">
        <div class="postDesc">
          ${listing.descriptions}
        </div>
      </div>
      <form class='listingSold' action='/listing/sold/${listing.id}' method='POST'>
        <button class='${listing.id} submitListingSold' data-id='${listing.id}' type='button'>
          SOLD
        </button>
      </form>
      <form class='listingDelete' action='/listing/delete/${listing.id}' method='POST'>
        <button class='${listing.id} submitListingDelete' data-id='${listing.id}' type='button'>
        Remove
        </button>
      </form>
    </div>
  </div>`;

  return $listing;
};



// Renders listings onto the DOM
const renderListing = listings => {
  // console.log(listings);
  listings.forEach(listing => {
    $('.listings').prepend(createListingElement(listing));
    if (listing.sold) {
      $('.posts').prepend(`
      <div class='sold'>
      SOLD
      </div>
      `);
    }
  });


  //arrays that designate each button of the injected listings
  const listingMessage = [...document.querySelectorAll('.submitListingMessage')];
  const listingSold = [...document.querySelectorAll('.submitListingSold')];
  const listingDelete = [...document.querySelectorAll('.submitListingDelete')];
  const listingFavorite = [...document.querySelectorAll('.submitListingStar')];
  const listingRemoveFavorite = [...document.querySelectorAll('.submitRemoveListingStar')];


  // Creates click event listener for each injected delete button
  listingDelete.forEach(listItem => {
    const listingID = listItem.dataset.id;
    listItem.addEventListener('click', event => {
      event.preventDefault();
      $.ajax({
        method: 'POST',
        url: `/listing/delete/${listingID}`,
        data: $('.listings').serialize()
      }).then(listings => {
        $('.listings').empty();
        renderListing(listings);
        $('.messageButton').css('display', 'none');
        $('.listingDelete').css('display', 'flex');
      });
    });
  });


  // Creates click event listener for each injected favorite button
  listingFavorite.forEach(listItem => {
    const listingID = listItem.dataset.id;
    listItem.addEventListener('click', event => {
      event.preventDefault();

      $.ajax({
        url: `/listing/favoritesTrue/${listingID}`,
        method: 'POST',
      }).then(() => {
        $(`#listing${listingID}`).hide();
        // $(`#starButton${listingID}`).hide();
        // $(`#starRemoveButton${listingID}`).css('display', 'contents');
      }).catch(e => console.error(e));
    });
  });

  listingRemoveFavorite.forEach(listItem => {
    const listingID = listItem.dataset.id;
    listItem.addEventListener('click', event => {
      event.preventDefault();

      $.ajax({
        url: `/listing/favoritesFalse/${listingID}`,
        method: 'POST'
      }).then((listings) => {
        $(`#listing${listingID}`).hide();
      }).catch(err => console.error(err));
    });
  });


  // Creates click event listener for each injected sold button
  listingSold.forEach(listItem => {
    const listingID = listItem.dataset.id;

    listItem.addEventListener('click', event => {
      event.preventDefault();

      $.ajax({
        method: 'POST',
        url: `/listing/sold/${listingID}`,
        data: $('.listings').serialize()
      }).then(listings => {
        $('.listings').empty();
        renderListing(listings);
        $('.messageButton').css('display', 'none');
        $('.listingDelete').css('display', 'none');
        $('.listingSold').css('display', 'flex');
      });
    });
  });


  // Creates click event listener for each injected message seller button
  listingMessage.forEach(listItem => {
    const listingID = listItem.dataset.id;

    listItem.addEventListener('click', event => {
      event.preventDefault();



      $.ajax({
        method: 'POST',
        url: `/api/messages/new/${listingID}`
      }).then(data => {
        $('.inbox').empty();
        $('.inbox').fadeToggle('slow');
        $('.chatFeed').show();
        renderMails(data);
      }).catch(err => console.error(err.message));
    });
  });
};

// function that loads listings to the front page (REMOVED FOR CLEANER FRONT UI)

// const loadListings = () => {
//   $.ajax({
//     method: 'GET',
//     url: '/listing'
//   }).then(data => {
//     $('.listingDelete').css('display', 'none');
//     renderListing(data);
//   });
// };

$(() => {
  // loadListings(); (keeping in case we decide to have listings on load)


  // BROWSE/SEARCH and Filter buttons
  $('#carSearch').on('submit', function(event) {
    // $('.filterOptions').slideUp('slow');
    $('.listingDelete').css('display', 'none');
    const data = $(this).serialize();
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: '/listing/browse',
      data: data
    }).then(listings => {
      $('.listings').empty();
      renderListing(listings);
    });
  });

  // My Listings nav button
  $('#listings').click(event => {
    $('.listingDelete').css('display', 'none');
    $('.newForm').slideUp('slow');
    $('.filterOptions').slideUp('slow');
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: '/listing/mylisting',
      data: $('.listings').serialize()
    }).then(listings => {
      $('.listings').empty();
      renderListing(listings);
      $('.messageButton').css('display', 'none');
      $('.listingSold').css('display', 'flex');
    });
  });

  // My Favorites nav button
  $('#favorites').click(event => {
    $('.newForm').slideUp('slow');
    $('.filterOptions').slideUp('slow');
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: '/listing/favorited',
      data: $('.listings').serialize()
    }).then(listings => {
      console.log("LISTINGS", listings);
      $('.listings').empty();
      renderListing(listings);
      $('.messageButton').css('color', 'black');
      $('.listingDelete').css('display', 'none');
      $('.listingSold').css('display', 'none');
      $('.starButton').hide();
      $('.starRemoveButton').css('display', 'contents');
    });
  });

  // My Sold nav button
  $('#sold').click(event => {
    $('.newForm').slideUp('slow');
    $('.filterOptions').slideUp('slow');
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: '/listing/soldlisting',
      data: $('.listings').serialize()
    }).then(listings => {
      $('.listings').empty();
      renderListing(listings);
      $('.star').css('display', 'none');
      $('.messageButton').css('display', 'none');
      $('.listingDelete').css('display', 'flex');
    });
  });
});
