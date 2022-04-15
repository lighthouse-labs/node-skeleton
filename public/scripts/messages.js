const createMails = mail => {
  let $mail = $('<div class="message">');
  let $message = $(`<form class="mail" action="/api/messages/${mail.id}" method="GET">`);
  let $button = $(`<button class="${mail.id} mailInbox" type="button" data-id="${mail.id}">Listing ${mail.listing_id}: ${mail.name}</button>`);

  return $mail.append($message.append($button));
};

const createChatBox = inbox => {

  const $chatBox = $(`
  <div>
    <div class='closeContainer'>
      <button class="${inbox} closeChatBox" type="button" data-id="${inbox}">
        Close
       </button>
    </div>
    <div class="chatFeed">
      <div>
        <div class="starterMessage">
          This is the Beginning of your Conversation
        </div>
      </div>
    </div>
  </div>
  <div class="chatInput">
    <form id="messageText" method:"POST" action="/api/messages/${inbox}">
      <div class='inputBox'>
        <textarea class="chatText" name="text" placeholder="Send a message...">
        </textarea>
      </div>
      <div class="sendButton">
        <button class="${inbox} chatSend" type="submit" data-id="${inbox}">
          Send
        </button>
      </div>
    </form>
  </div>
  `);
  return $chatBox;
};

const createChat = message => {
  let $message = $(`
  <div>
    <div class="sender">
      ${message.name}
    </div>
    <div class="message">
     ${message.messagetext}
    </div>
  </div>
`);
  return $message;
};


const renderMails = mails => {
  mails.forEach(mail => {
    $('.inbox').prepend((createMails(mail)));
  });

  const mailInbox = [...document.querySelectorAll('.mailInbox')];

  mailInbox.forEach(listingMail => {
    let mailId = listingMail.dataset.id;

    listingMail.addEventListener('click', event => {
      $('.chatBox').empty();
      $('.chatBox').prepend(createChatBox(mailId));
      event.preventDefault();

      $.ajax({
        method: 'GET',
        url: `/api/messages/${mailId}`,
        data: $('.chatFeed').serialize()
      }).then(messages => {
        $('.chatBox').css('display', 'flex');
        renderChat(messages);
        $('.inbox').slideUp('slow');
        $('.chatText').focus();
      }).catch(err => console.error(err));
    });
  });

};

const renderChat = inbox => {
  inbox.forEach(message => $('.chatFeed').append(createChat(message)));

  const chatSend = [...document.querySelectorAll('.chatSend')];
  const chatClose = [...document.querySelectorAll('.closeChatBox')];

  chatClose.forEach(closingChat =>
    closingChat.addEventListener('click', () =>
      $('.chatBox').hide()));


  $('#messageText').submit(event => {

    const mailId = (chatSend[0]).dataset.id;
    event.preventDefault();
    const data = $('#messageText').serialize();

    $.ajax({
      method: 'POST',
      url: `/api/messages/${mailId}`,
      data: data
    }).then(() => {
      $('.chatBox').empty();
      $('.chatBox').prepend(createChatBox(mailId));
      $.ajax({
        method: 'GET',
        url: `/api/messages/${mailId}`
      }).then(messages => {
        $('.chatFeed').empty();
        renderChat(messages);
        $('.chatText').focus();
      });
    });
  });

  $('.chatText').keydown((event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      $('#messageText').submit();
    }
  });

  $('.chatText').blur(event => {
    $('.chatBox').hide();
  })
};

// Messages inbox dropdown
const loadMessages = () => {
  $.ajax({
    method: 'GET',
    url: '/api/messages'
  }).then(data => {
    $('.inbox').empty();
    renderMails(data);
  }).catch((err) => console.error(err.message));
};


$(() => {

  $('#messages').click(event => {
    event.preventDefault();
    $('.inbox').fadeToggle('slow');
    $('.inbox').css('display', 'flex');
    loadMessages();
  });

  loadMessages();
});
