export const chatBody = document.querySelector('.chat__body');

export const chatItems = document.querySelectorAll('.chat__item');

export const chatItemString = (username, lastMessage, date, id) => {
  const parcedDate = new Date(date).toLocaleDateString();
  const parcedDateTime = `${new Date(date).getHours()}:${new Date(date).getMinutes()}`;

  return `
  <div class="chat__item" id="${id}">
    <div class="chat__avatar"></div>
    <div class="chat__text">
      <div class="chat__username">${username}</div>
      <div class="chat__message">${lastMessage}</div>
    </div>
    <div class="chat__date">${parcedDate}, ${parcedDateTime}</div>
  </div>
`;
};
