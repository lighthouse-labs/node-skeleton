// Client facing scripts here
$(() => {

  // Search filter dropdown
  $('.filter').click(() => {
    $('.filterOptions').slideToggle('slow');
    $('.filterOptions').css('display', 'flex');
    $('.newForm').slideUp('slow');
    $('.inbox').slideUp('slow');
  });

  // New listing drop down
  $('.newPost').click(() => {
    $('.newForm').slideToggle('slow');
    $('.newForm').css('display', 'flex');
    $('.filterOptions').slideUp('slow');
    $('.inbox').slideUp('slow');
  });

  // New listing cancel button
  $('#cancel').click(() => {
    $('.newForm').slideToggle('slow');
    $('.filterOptions').slideUp('slow');
    $('.inbox').slideUp('slow');
  });

  // Nav Buttons disappear on page scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY < 100) {
      $('.navBottom').fadeIn('slow');
      $('#arrow-up').fadeOut('slow');
    } else {
      $('.navBottom').fadeOut('slow');
      $('#arrow-up').fadeIn('slow');
    }
  });

  document.querySelector('#arrow-up').addEventListener('click', () => {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    $('#arrow-up').fadeOut();
  });

});
