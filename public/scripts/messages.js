$(() => {

  // Generates messages in inbox
  const createMessages = (message) => {
    let $message = $(`
    <div id='${message.sender_id}' class="message">${message.name}</div>
    `);
    return $message;
  };

  // Renders messsages into the inbox
  const renderMessages = () => {
    $.get('/api/messages').then(data => {
      $('.inbox').empty();
      data.forEach(message => {
        $('.inbox').prepend(createMessages(message));
      });
    });
  };


  // Messages inbox dropdown
  $('#messages').click((event) => {
    $('.inbox').slideToggle('fast');
    $('.inbox').css('display', 'flex');
    event.preventDefault();

    $.ajax({
      type: 'GET',
      url: '/api/messages',
      data: $('#messages').serialize()
    }).then((data) => renderMessages(data))
      .catch((err) => console.log(err.message));
  });

  const createChat = () => {
    let $chat = $(`
    <div class="{senderMessage}">
    <div class="senderID">{sender_id:}</div>
    <div class="messageID">
      {messagetext}
    </div>
  </div >
    <div class="{recieverMessage}">
      <div class="messageID">
        {responsemessage}
      </div>
    </div>
  `);
    return $chat;
  };

  const renderChat = () => {
    $.get('/api/messages').then(data => {
      $('.chatBox').empty();
      data.forEach(chat => {
        $('.inbox').append(createChat(chat));
      });
    });
  };


  $('.message').click(function (event) {
    console.log('event:', event);
    $('.chatBox').slideToggle('fast');
    $('.chatBox').css('display', 'block');
    event.preventDefault();

    $.ajax({
      type: 'GET',
      url: '/api/messages',
      data: $('.messages').serialize()
    }).then((data) => createChat(data))
      .catch((err) => console.log(err.message));

  });


});