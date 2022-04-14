$(() => {


  // Listings Button
  $('#listings').click(() => {
    console.log('listings button clicked');
  });

  // Favorites Button
  $('.starButton').click(function(event) {
    event.preventDefault();
    $.ajax({
      type: 'GET',
      url: '/api/favorites/req.cookies.user_id',
      data: 'data'
    }).then((data) => {
      res.render(data);
    })
      .catch((err) => console.log(err.message));
  });
});
