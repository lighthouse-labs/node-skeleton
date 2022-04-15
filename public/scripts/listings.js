const createListingElement = function(listing) {

  let $listing = `
  <div id='listing${listing.id}' class="posts">
    <img src='${listing.imageurl}' class="carPhoto" />
    <button class="starButton ${listing.id}" data-id='${listing.id}' type="button">
      <i class="star fa-solid fa-star"></i>
    </button>
  <div class="postBox">
    <div class="titlePrice">
      <div class="postTitle">${listing.make}, ${listing.model}</div>
      <div class="postPrice">$${listing.price}</div>
    </div>
    <div class='messageButtonContainer'>
      <button class='messageButton ${listing.id}' data-id='${listing.id}'
      type='button'
      >
        message_seller
      </button>
    </div>
    <div class="description">
    <div>
      <div>${listing.transmission ? 'M/T' : 'A/T'}, ${listing.color}
      </div>
      </div>
      <div>${listing.descriptions}
      </div>
 </div>
      <form class='listingSold' action='/listing/sold/${listing.id}' method='POST'>
      <button class='${listing.id} submitListingSold' data-id='${listing.id}' type='button'>
      SOLD</button>
    </form>

    <form class='listingDelete' action='/listing/delete/${listing.id}' method='POST'>
    <button class='${listing.id} submitListingDelete' data-id='${listing.id}' type='button'>
    Remove</button>
  </form>
    </div>

</div>`;

  return $listing;
};

const renderListing = function(listings) {
  listings.forEach(listing => {
    $('.listings').prepend(createListingElement(listing));
    if (listing.sold) {
      $('.postBox').prepend(`
      <div class='sold'>
      SOLD
      </div>
      `);
    }
  });



  const listingMessage = [...document.querySelectorAll('.messageButton')];
  const listingSold = [...document.querySelectorAll('.submitListingSold')];
  const listingDelete = [...document.querySelectorAll('.submitListingDelete')];
  const listingFavorite = [...document.querySelectorAll('.starButton')];

  listingDelete.forEach(listItem => {
    const listingID = listItem.dataset.id;
    listItem.addEventListener('click', (event) => {
      event.preventDefault();

      $.ajax({
        method: 'POST',
        url: `/listing/delete/${listingID}`,
        data: $('.listings').serialize()
      }).then((listings) => {
        $('.listings').empty();
        renderListing(listings);
        $('.messageButton').css('display', 'none');
        $('.listingDelete').css('display', 'flex');
      });
    });
  });


  listingFavorite.forEach(listItem => {
    const listingID = listItem.dataset.id;
    listItem.addEventListener('click', (event) => {
      event.preventDefault();
      $(`.${listingID}`).toggleClass('favoriteTrue');
      if ($(`.${listingID}`).hasClass('favoriteTrue')) {
        console.log('inside the true if statement');
        $.ajax({
          url: `/listing/favoritesTrue/${listingID}`,
          method: 'POST',
          data: $('.listings').serialize()
        }).then(() => {
          $('.sold').css('display', 'none');
        });
      } else {
        console.log('inside the false if statement');
        $.ajax({
          url: `/listing/favoritesFalse/${listingID}`,
          method: 'POST',
          data: $('.favorites').serialize()
        }).then(() => {
          $('.sold').css('display', 'none');
        });
      }
    });
  });

  listingSold.forEach(listItem => {
    const listingID = listItem.dataset.id;
    listItem.addEventListener('click', (event) => {
      $.ajax({
        method: 'POST',
        url: `/listing/sold/${listingID}`,
        data: $('.listings').serialize()
      }).then((listings) => {
        $('.listings').empty();
        renderListing(listings);
        $('.messageButton').css('display', 'none');
        $('.listingDelete').css('display', 'none');
        $('.listingSold').css('display', 'flex');
      });
    });
  });


  listingMessage.forEach(listItem => {
    const listingID = listItem.dataset.id;
    listItem.addEventListener('click', (event) => {
      // const mailId = (chatSend[0]).dataset.id;
      event.preventDefault();
      console.log('message click', listingID);
      $.ajax({
        method: 'POST',
        url: `/api/messages/new/${listingID}`,
        // data: $('.listings').serialize()
      })
        .then(() => {
          console.log('test from after then click from listing', listingID);
          //   $('.chatBox').empty();
          //   $('.chatBox').prepend(createChatBox(mailId));
          //   renderChat(listings);
          //   $('.chatText').focus();
        });
    });
  });

};

const loadListings = function() {
  $.ajax({ method: 'GET', url: '/listing' }).then(function(data) {
    $('.listingDelete').css('display', 'none');
    renderListing(data);


  });
};


$(() => {


  // loadListings();

  // BROWSE/SEARCH and Filter

  $('#carSearch').on('submit', function(event) {
    $('.listingDelete').css('display', 'none');
    const data = $(this).serialize();
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: '/listing/browse',
      data: data
    }).then((listings) => {
      $('.listings').empty();
      renderListing(listings);
    });
  });

  // My Listings

  $('#listings').click((event) => {
    $('.listingDelete').css('display', 'none');

    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: '/listing/mylisting',
      data: $('.listings').serialize()
    }).then((listings) => {
      $('.listings').empty();
      renderListing(listings);
      $('.messageButton').css('display', 'none');
      $('.listingSold').css('display', 'flex');
    });
  });


  $('#favorites').click((event,) => {
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: '/listing/favorited',
      data: $('.listings').serialize()
    }).then((listings) => {
      $('.listings').empty();
      renderListing(listings);
      $('.messageButton').css('color', 'black');
      $('.listingDelete').css('display', 'none');
      $('.listingSold').css('display', 'none');
      $('.starButton').css('color', 'red');
    });
  });

  $('#sold').click((event) => {
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: '/listing/soldlisting',
      data: $('.listings').serialize()
    }).then((listings) => {
      $('.listings').empty();
      renderListing(listings);
      $('.messageButton').css('display', 'none');
      $('.listingDelete').css('display', 'flex');
    });
  });
});

