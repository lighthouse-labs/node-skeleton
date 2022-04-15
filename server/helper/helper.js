const checkInbox = (messages, id) => {
  return messages.some((message) => {
    return (message.listing_id).toString() === id;
  });
}

module.exports = {
  checkInbox
}
