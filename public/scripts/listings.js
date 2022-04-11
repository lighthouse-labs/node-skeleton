$(() => {


  // Favorites Button
  let i = 0;
  $('.star').click(function() {
    if (i === 0) {
      $(this).css({"color": "red"});
      return i = 1;
    } else {
      $(this).css({"color": "grey"});
      return i = 0;
    }
  });

  // Message Seller Button
  $('.messageButton').click(() => {
    console.log('message seller button clicked');
  });

});
