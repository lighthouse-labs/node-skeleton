// Client facing scripts here
$(() => {


  // Search filter dropdown
  $('.filter').click(() => {
    $('.filterOptions').slideToggle('fast');
    $('.filterOptions').css('display', 'flex');
    $('.newForm').slideUp('fast');
    $('.inbox').slideUp('fast');
  });

  $('#carMake').select2({ closeOnSelect: false });

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

  // Messages inbox dropdown

  // Favorites button
  $('#favorites').click(() => {

  });

  $('#carMake').select2({ closeOnSelect: false });


  $('#make').change(function () {
    const make = $(this).val();
    $('#model option').each(function () {
      if ($(this).data('tag') !== make) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });


});
