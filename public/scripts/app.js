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

});
