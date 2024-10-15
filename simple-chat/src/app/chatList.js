import { v4 as uuidv4 } from 'uuid';

import { chatItemString } from './elements.js';

export class Chat {
  currentChat = { chatLink: null };
  chatList = {};

  constructor(wrapperSelector, addBtnSelector, chatDialogRenderer) {
    this.wrapper = document.querySelector(wrapperSelector);
    this.chatDialogRenderer = chatDialogRenderer;

    const localChatList = localStorage.getItem('chatList');

    if (localChatList) {
      this.chatList = JSON.parse(localChatList);
    }

    const wrapperChildren = this.wrapper.children;

    chatDialogRenderer.renderItemsList(this.chatList, this.wrapper);

    this.updateEventListeners(wrapperChildren);

    const button = document.querySelector(addBtnSelector);
    const search = document.querySelector('.chat__input');

    button.addEventListener('click', () => {
      const itemId = uuidv4();

      this.chatList[itemId] = {
        username: `Имя №${Object.keys(this.chatList).length + 1}`,
        chat: [{ message: 'Тестовое сообщение', username: '' }],
        timestamp: Date.now(),
      };

      const chatString = chatItemString(
        this.chatList[itemId].username,
        '',
        this.chatList[itemId].timestamp,
        itemId,
      );

      this.wrapper.insertAdjacentHTML('beforeend', chatString);
      this.updateEventListeners(wrapperChildren);

      localStorage.setItem('chatList', JSON.stringify(this.chatList));
    });

    search.addEventListener('input', e => {
      for (const i in this.chatList) {
        if (!this.chatList[i].username.toLowerCase().includes(e.target.value)) {
          document.getElementById(i).classList.add('hide');
        } else {
          document.getElementById(i).classList.remove('hide');
        }
      }
    });
  }

  toggleItem(chatItems, currentItem) {
    Array.from(chatItems).forEach(item => item.classList.remove('active'));
    currentItem.classList.add('active');

    const currentItemId = currentItem.getAttribute('id');

    this.currentChat.chatLink = {
      ...this.chatList[currentItemId],
      id: currentItemId,
    };

    this.chatDialogRenderer.renderChat(this.currentChat.chatLink);
  }

  updateEventListeners(wrapperChildren) {
    Array.from(wrapperChildren).forEach(item => {
      item.addEventListener('click', () => {
        this.toggleItem(wrapperChildren, item);
      });
    });
  }
}
