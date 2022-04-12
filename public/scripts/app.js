// Client facing scripts here
$(() => {


  // Search filter dropdown
  $('.filter').click(() => {
    $('.filterOptions').slideToggle('fast');
    $('.filterOptions').css('display', 'flex');
    $('.newForm').slideUp('fast');
    $('.inbox').slideUp('fast');
  });

  // $('#carMake').select2({ closeOnSelect: false });
  // $('#carTransmission').select2();

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

  $('#priceSlider').slider({
    range: true,
    min: 0,
    max: 150000,
    values: [3000, 50000],
    slide: function(event, ui) {
      $('#minPrice').val('$' + ui.values[0]);
      $('#maxPrice').val('$' + ui.values[1]);
    }
  });

  $('#yearSlider').slider({
    range: true,
    min: 1886,
    max: 2022,
    values: [2000, 2022],
    slide: function(event, ui) {
      $('#minYear').val(ui.values[0]);
      $('#maxYear').val(ui.values[1]);
    }
  });


});
