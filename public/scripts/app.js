// Client facing scripts here
$(() => {


  // Search filter dropdown
  $('.filter').click(() => {
    $('.filterOptions').slideToggle('fast');
    $('.filterOptions').css('display', 'flex');
    $('.newForm').slideUp('fast');
    $('.inbox').slideUp('fast');
  });

  // New listing drop down
  $('.newPost').click(() => {
    $('.newForm').slideToggle('fast');
    $('.newForm').css('display', 'flex');
    $('.filterOptions').slideUp('fast');
    $('.inbox').slideUp('fast');
  });

  // New listing cancel button
  $('#cancel').click(() => {
    $('.newForm').slideToggle('fast');
    $('.filterOptions').slideUp('fast');
    $('.inbox').slideUp('fast');
  });


  // Favorites button
  $('#favorites').click(() => {

  });

});
