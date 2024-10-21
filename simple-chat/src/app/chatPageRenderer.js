import { chatItemString } from './elements.js';

export class ChatPageRenderer {
  constructor(displaySelector, textareaSelector, username) {
    this.displayElement = document.querySelector(displaySelector);
    this.textarea = document.querySelector(textareaSelector);
    this.username = username;
  }

  renderItemsList(chatItems, wrapper) {
    const chatItemsEntries = Object.entries(chatItems);

    chatItemsEntries.sort((a, b) => b[1].timestamp - a[1].timestamp);

    chatItemsEntries.forEach(([id, item]) => {
      const chatWithUserArray = item.users.filter(
        item => item !== this.username,
      );

      const chatItem = chatItemString(
        chatWithUserArray[0],
        item.chat.at(-1)?.message || '',
        item.timestamp,
        id,
      );

      wrapper.insertAdjacentHTML('beforeend', chatItem);
    });
  }

  renderMessage({ message }, sent) {
    const dialogItem = document.createElement('div');

    dialogItem.classList.add('dialog__item');

    if (sent) {
      dialogItem.classList.add('sent');
    }

    dialogItem.innerHTML = `
      <div class="dialog__message">${message}</div>
    `;

    this.displayElement.appendChild(dialogItem);
    this.displayElement.scrollTop = this.displayElement.scrollHeight;
  }

  renderChat(chat) {
    if (!chat) {
      return;
    }

    this.textarea.classList.remove('hide');
    this.displayElement.innerHTML = '';
    chat.chat.forEach(message => {
      this.renderMessage(message, this.username === message.username);
    });
  }
}
