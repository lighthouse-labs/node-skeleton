$(() => {

  $('.formCancel').click(() => {
    $('.loginForm').slideUp('fast');
    $('.registerForm').slideUp('fast');
  })

  $('#login').click(() => {
    $('.inbox').slideUp('fast');
    $('.filterOptions').slideUp('fast');
    $('.registerForm').slideUp('fast');
    setTimeout(() => {
      $('.loginForm').slideToggle('fast');
      $('.loginForm').css('display', 'flex');
    }, 200);
  });

  $('#signup').click(() => {
    $('.inbox').slideUp('fast');
    $('.filterOptions').slideUp('fast');
    $('.loginForm').slideUp('fast');
    setTimeout(() => {
      $('.registerForm').slideToggle('fast');
      $('.registerForm').css('display', 'flex');
    }, 200);
  });
});
