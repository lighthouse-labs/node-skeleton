$(() => {

  $('#carMake').select2({ closeOnSelect: false });
  $('#carTransmission').select2();

  const minMaxPrice = () => {
    $.ajax({
      url: '/api/price',
      method: 'GET'
    }).then((priceRange) => {
      $('#priceSlider').slider({
        range: true,
        min: priceRange[0].minprice,
        max: priceRange[0].maxprice,
        values: [priceRange[0].minprice, 50000],
        slide: function(event, ui) {
          $('#minPrice').val('$' + ui.values[0]);
          $('#maxPrice').val('$' + ui.values[1]);
        }
      });
    }).catch((e) => console.error(e));
  };

const minMaxYear = () => {
  $.ajax({
    url: '/api/year',
    method: 'GET'
  }).then((yearRange) => {
    $('#yearSlider').slider({
      range: true,
      min: yearRange[0].minyear,
      max: yearRange[0].maxyear,
      values: [2000, yearRange[0].maxyear],
      slide: function(event, ui) {
        $('#minYear').val(ui.values[0]);
        $('#maxYear').val(ui.values[1]);
      }
    });
  }).catch((e) => {console.error(e)});
}

  const createSearchMakeOptions = (makes) => {
    const make = makes.make;
    const $option = $(`<option name=${make} value=${make}>`);
    $option.text(make);
    return $option;
  };

  const renderSearchMakeOptions = (makes) => {
    for (const make of makes) {
      $('#carMake').append(createSearchMakeOptions(make));
    }
  };

  const loadSearchMakeOptions = () => {
    $.ajax({
      url: '/api/make',
      method: 'GET'
    }).done((makes) => {
      const $default = $('<option name="" value="">').text('Select Make');
      $('#carMake').empty();
      $('#carMake').append($default);
      renderSearchMakeOptions(makes);
    });
  };

  loadSearchMakeOptions();
  minMaxPrice();
  minMaxYear();

});
