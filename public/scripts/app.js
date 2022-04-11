// Client facing scripts here
$(document).ready(function () {

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
  $('#property-form__cancel').click(() => $('.newForm').slideUp('fast'));

  // Messages inbox dropdown
  $('#messages').click(() => {
    $('.inbox').slideToggle('fast');
    $('.inbox').css('display', 'flex');
  });

  $('#carMake').select2({closeOnSelect: false});
  $('#carTransmission').select2();


});
