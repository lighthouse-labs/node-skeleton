$(() => {

  $('#make').select2();
  $('#model').select2();
  $('#transmission').select2();
  $('#year').select2();

  const createMakeOptions = (makes) => {
    const make = makes.make;
    const $option = $(`<option name=${make} value=${make}>`);
    $option.text(make);
    return $option;
  };

  const renderMakeOptions = (makes) => {
    for (const make of makes) {
      $('#make').append(createMakeOptions(make));
    }
  };

  const loadMakeOptions = () => {
    $.ajax({
      url: '/api/make',
      method: 'GET'
    }).done((makes) => {
      const $default = $('<option name="null" value-"null">').text('Select Make');
      $('#make').empty();
      $('#make').append($default);
      renderMakeOptions(makes);
    })
  };

  loadMakeOptions();

  const createModelOptions = (models) => {
    const make = models.make;
    const model = models.model;

    const $option = $(`<option name=${model} value=${model} data-tag=${make}>`)

    $option.text(model);
    return $option;
  };

  const renderModelOptions = (models) => {
    const selectedMake = $('#make').val();
    if (selectedMake === 'Select Make') {
      for (const model of models) {
        $('#model').append(createModelOptions(model));
      }
    } else {
      for(const model of models) {
        if (model.make === selectedMake) {
          console.log(model);
          $('#model').append(createModelOptions(model));
        }
      }
    }
  }

  const loadModelOptions = () => {
    $.ajax({
      url: '/api/model',
      method: 'GET'
    }).done((models) => {
      const $default = $('<option name="" value="">').text('Select Model');
      $('#model').empty();
      $('#model').append($default);
      renderModelOptions(models);
    })
  }

  loadModelOptions();

  $('#make').change(() => {
    loadModelOptions();
  })














});
