$(() => {

  const createListingElement = function(listing) {
    let $listing = `
    <div class="posts">
    <div>
    <img src='${listing.imageURL}' class="carPhoto" />
        <button id="favoriteButton" class="favoriteButton">
          <i class="star fa-solid fa-star"></i>
        </button>
    </div>
    <div class="postBox">
      <div class="titlePrice">
        <div class="postTitle">${listing.make, listing.model}</div>
        <div class="postPrice">$${listing.price}</div>
      </div>
      <div class='messageButtonContainer'>
        <div class='messageButton'>
          message_seller
        </div>
      </div>
      <div class="description">
      <div>${listing.transmission}, ${listing.color}</div>
      <div>${listing.descriptions}</div>
    </div>
    </div>
  </div>`;

    return $listing;
  };

  const renderListing = function(listings) {
    listings.forEach((listing) => {
      $('.listings').prepend(createListingElement(listing));
    });
  };

  const loadListings = function() {
    $.ajax({ method: 'GET', url: '/api' }).then(function(data) {
      console.log(data);
      renderListing(data);
    });
  };

  loadListings();

  // Favorites Button
  let i = 0;
  $('.star').click(function() {
    if (i === 0) {
      $(this).css({ "color": "red" });
      return i = 1;
    } else {
      $(this).css({ "color": "grey" });
      return i = 0;
    }
  });

  // Message Seller Button
  $('.messageButton').click(() => {
    console.log('message seller button clicked');
  });

});
