$(() => {

  const createListingElement = function(listing) {

    // Favorites Button
    let isLiked = false;
    const userString = document.cookie;
    const userID = userString.split('=')[1];
    $('.starButton').click(function() {
      if (!isLiked) {
        $(this).children().css({ "color": "red" });
        const listingID = $(this).parent()[0].id;
        console.log(listingID);
        // console.log($(this).parent()[0].id);
        $.ajax({
          type: 'POST',
          url: `/listing/users/${userID}/listings/${listingID}/favorite`,
          // data: 'api/listings/5',
          success: console.log('success')
        }).then((data) => {
          console.log(data);
        })
          .catch((err) => console.log(err.message));
        isLiked = true;
      } else {
        $(this).children().css({ "color": "grey" });
        isLiked = false;
      }
    });


  // Message Seller Button
  $('.messageButton').click(() => {
    console.log('message seller button clicked');
  });


  let $listing = `
  <div id='listing${listing.id}' class="posts">
    <img src='${listing.imageurl}' class="carPhoto" />
    <button class="starButton" type="button">
      <i class="star fa-solid fa-star"></i>
    </button>
  <div class="postBox">
    <div class="titlePrice">
      <div class="postTitle">${listing.make}, ${listing.model}</div>
      <div class="postPrice">$${listing.price}</div>
    </div>
    <div class='messageButtonContainer'>
      <div class='messageButton'>
        message_seller
      </div>
    </div>
    <div class="description">
    <div>
      <div>${listing.transmission ? 'M/T' : 'A/T'}, ${listing.color}
      </div>
      <div>${listing.descriptions}
      </div>
      </div>


      <form class='listingDelete' action='/listing/delete/${listing.id}' method='POST'> 
      <button class='${listing.id} submitListingDelete' data-id='${listing.id}' type='button'>
      Remove X</button>
    </form>
   
      </div>
      </div>
</div>`;

  return $listing;
};

const renderListing = function (listings) {
  listings.forEach(function (listing) {
    $('.listings').prepend(createListingElement(listing));
    if (listing.sold) {
      $('.messageButtonContainer').prepend(`
      <div class='sold'>
      SOLD
      </div>
      `);
    }
  });

 
 
  const items = document.querySelectorAll('.submitListingDelete');
  const listingDelete = [...document.querySelectorAll('.submitListingDelete')];
  listingDelete.forEach(listItem => {
    const listingID = listItem.dataset.id;
    listItem.addEventListener('click', (event) => {
      console.log('clicked listing:', listingID);
      event.preventDefault();

      $.ajax({
        method: 'POST',
        url: `/listing/delete/${listingID}`,
        data: $('.listings').serialize()
      }).then((listings) => {
        console.log('AFTER AJAX');
        $('.listings').empty();
        renderListing(listings);
        $('.messageButton').css('display', 'none');
        $('.listingDelete').css('display', 'flex');
      });
    });
  });
};


const loadListings = function () {
  $.ajax({ method: 'GET', url: '/listing' }).then(function (data) {
    $('.listingDelete').css('display', 'none');
    renderListing(data);


  });
};


$(() => {


  loadListings();

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
      $('.messageButton').css('display', 'none');
      renderListing(listings);
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

