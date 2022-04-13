$(() => {

  const createListingElement = function(listing) {

    // Favorites Button
    let isLiked = false;
    $('.starButton').click(function() {
      if (!isLiked) {
        $(this).children().css({ "color": "red" });
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
    <div class="posts">
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

        <button class='listingDelete' type='button'>x</button>

    </div>
    </div>
  </div>`;

    return $listing;
  };

  const renderListing = function(listings) {
    listings.forEach(function(listing) {
      $('.listings').prepend(createListingElement(listing));
      if (listing.sold) {
        $('.messageButtonContainer').prepend(`
        <div class='sold'>
        SOLD
        </div>
        `);
      }
    });
  };

  const loadListings = function() {
    $.ajax({ method: 'GET', url: '/listing' }).then(function(data) {
      renderListing(data);
    });
  };
  loadListings();

  $('#carSearch').on('submit', function(event) {
    const data = $(this).serialize();
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: '/listing/browse',
      data: data
    }).then((listings) => {
      $('.listings').empty();
      renderListing(listings);
    })
  });

});
