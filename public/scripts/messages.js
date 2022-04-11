$(() => {

  // Generates messages in inbox
  const createMessages = (message) => {
    
    let $message = $(`
    <div class="message">${message.user_id}</div>
    `);
    return $message;
  };

  // Renders messsages into the inbox
  const renderMessages = () => {
    $.get('/').then(data => {
      $('.inbox').empty();

      data.forEach(message => {
        $('.inbox').prepend(createMessages(message));
      });
    });
  };

  renderMessages();

  // Messages inbox dropdown
  $('#messages').click(() => {
    $('.inbox').slideToggle('fast');
    $('.inbox').css('display', 'flex');
  });

});