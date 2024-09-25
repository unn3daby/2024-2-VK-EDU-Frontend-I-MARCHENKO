export function createChatItem(message, isSent, username, timestamp) {
  const chatItem = document.createElement('div');

  chatItem.classList.add('chat-item');

  const itemWrapper = document.createElement('div');

  chatItem.appendChild(itemWrapper);

  itemWrapper.classList.add('chat-item-wrapper');

  const chatItemInner = document.createElement('div');

  const usernameBlock = document.createElement('div');

  usernameBlock.innerText = username;
  usernameBlock.classList.add('chat-item-username');

  itemWrapper.appendChild(usernameBlock);

  chatItemInner.classList.add('chat-item-inner');

  if (isSent) {
    itemWrapper.classList.add('sent');
  }

  const footer = document.createElement('div');

  footer.classList.add('chat-item-footer');

  const textBlock = document.createElement('div');

  textBlock.innerText = message;

  const timestampElement = document.createElement('div');

  timestampElement.classList.add('chat-timestamp');
  timestampElement.textContent = timestamp;

  footer.appendChild(timestampElement);

  itemWrapper.appendChild(chatItemInner);
  chatItemInner.appendChild(textBlock);
  chatItemInner.appendChild(footer);

  return chatItem;
}
