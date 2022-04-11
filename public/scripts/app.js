// Client facing scripts here
$(document).ready(function () {

  $('#carMake').change(function () {
    const make = $(this).val();
    $('#carModel option').each(function () {
      if ($(this).data('tag') !== make) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });

  // Search filter dropdown
  $('.filter').click(function () {
    $('.filterOptions').slideToggle('fast');
    $('.filterOptions').css('display', 'flex');
    $('.newForm').slideUp('fast');
    $('.inbox').slideUp('fast');
  });

  // New listing drop down
  $('.newPost').click(function () {
    $('.newForm').slideToggle('fast');
    $('.newForm').css('display', 'flex');
    $('.filterOptions').slideUp('fast');
    $('.inbox').slideUp('fast');
  });

  // Messages inbox dropdown
  $('#messages').click(function () {
    $('.inbox').slideToggle('fast');
    $('.inbox').css('display', 'flex');
  });

});
