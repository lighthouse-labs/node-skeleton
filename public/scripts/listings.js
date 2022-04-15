// Creates listings based on database info
const createListingElement = listing => {

  let $listing = `
  <div id='listing${listing.id}' class="posts">
    <img src='${listing.imageurl}' class="carPhoto" />
    <button class="starButton ${listing.id}" data-id='${listing.id}' type="button">
      <i class="star fa-solid fa-star"></i>
    </button>
    <div class="postBox">
      <div class="titlePrice">
        <div class="postTitle"> ${listing.year} ${listing.make} ${listing.model}</div>
        <div class="postPrice">$${listing.price}</div>
      </div>
      <div class='messageButtonContainer'>
        <div class="postInfo">
          <div>
            <b>Color:</b> ${listing.color}
          </div>
          <div>
            <b>Transmission:</b> ${listing.transmission ? 'M/T' : 'A/T'}
          </div>
          <div>
            ${listing.city}, ${listing.province} ${listing.country}
          </div>
        </div>
        <button class='messageButton ${listing.id}' data-id='${listing.id}' type='button'>
        <i class="fa-solid fa-message"></i>
        </button>
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
  listings.forEach(listing => {
    console.log(listing);
    $('.listings').prepend(createListingElement(listing));
    if (listing.sold) {
      $('.postBox').prepend(`
      <div class='sold'>
      SOLD
      </div>
      `);
    }
  });


  //arrays that designate each button of the injected listings
  const listingMessage = [...document.querySelectorAll('.messageButton')];
  const listingSold = [...document.querySelectorAll('.submitListingSold')];
  const listingDelete = [...document.querySelectorAll('.submitListingDelete')];
  const listingFavorite = [...document.querySelectorAll('.starButton')];


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
      $(`.${listingID}`).toggleClass('favoriteTrue');

      if ($(`.${listingID}`).hasClass('favoriteTrue')) {

        $.ajax({
          url: `/listing/favoritesTrue/${listingID}`,
          method: 'POST',
          data: $('.listings').serialize()
        }).then(() => $('.sold').css('display', 'none'));

      } else {

        $.ajax({
          url: `/listing/favoritesFalse/${listingID}`,
          method: 'POST',
          data: $('.favorites').serialize()
        }).then(() => $('.sold').css('display', 'none'));

      }
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
      console.log('AAAA');

      $.ajax({
        method: 'POST',
        url: `/api/messages/new/${listingID}`
      }).then(() => {

        $.ajax({
          method: 'GET',
          url: '/api/messages'
        }).then(data => {
          $('.inbox').empty();
          renderMails(data);
          $('.inbox').fadeIn('slow');
        }).catch(err => console.error(err.message));
      });
    });
  });
};

// function that loads listings to the front page (REMOVED FOR CLEANER FRONT UI)
const loadListings = () => {
  $.ajax({
    method: 'GET',
    url: '/listing'
  }).then(data => {
    $('.listingDelete').css('display', 'none');
    renderListing(data);
  });
};

$(() => {
  // loadListings(); (keeping in case we decide to have listings on load)


  // BROWSE/SEARCH and Filter buttons
  $('#carSearch').on('submit', function(event) {
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
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: '/listing/favorited',
      data: $('.listings').serialize()
    }).then(listings => {
      $('.listings').empty();
      renderListing(listings);
      $('.messageButton').css('color', 'black');
      $('.listingDelete').css('display', 'none');
      $('.listingSold').css('display', 'none');
      $('.starButton').css('color', 'red');
    });
  });

  // My Sold nav button
  $('#sold').click(event => {
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: '/listing/soldlisting',
      data: $('.listings').serialize()
    }).then(listings => {
      $('.listings').empty();
      renderListing(listings);
      $('.messageButton').css('display', 'none');
      $('.listingDelete').css('display', 'flex');
    });
  });
});
