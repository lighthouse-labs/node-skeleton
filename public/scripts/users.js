$(() => {

  $('.formCancel').click(() => {
    $('.loginForm').slideUp('slow');
    $('.registerForm').slideUp('slow');
  })

  $('#login').click(() => {
    $('.inbox').slideUp('slow');
    $('.filterOptions').slideUp('slow');
    $('.registerForm').slideUp('slow');
    setTimeout(() => {
      $('.loginForm').slideToggle('slow');
      $('.loginForm').css('display', 'flex');
    }, 200);
  });

  $('#signup').click(() => {
    $('.inbox').slideUp('slow');
    $('.filterOptions').slideUp('slow');
    $('.loginForm').slideUp('slow');
    setTimeout(() => {
      $('.registerForm').slideToggle('slow');
      $('.registerForm').css('display', 'flex');
    }, 200);
  });
});
