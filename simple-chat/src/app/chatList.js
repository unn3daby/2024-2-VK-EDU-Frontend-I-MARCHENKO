import { v4 as uuidv4 } from 'uuid';

import { chatItemString } from './elements.js';
import { filterChatlist } from './utils.js';

export class Chat {
  currentChat = { chatLink: null };
  chatList = {};

  constructor(wrapperSelector, addBtnSelector, chatDialogRenderer, username) {
    this.wrapper = document.querySelector(wrapperSelector);
    this.chatDialogRenderer = chatDialogRenderer;
    this.username = username;

    const localChatList = localStorage.getItem('chatMap');

    if (localChatList) {
      const fullChatList = JSON.parse(localChatList);

      this.chatList = filterChatlist(fullChatList, this.username);
    }

    const wrapperChildren = this.wrapper.children;

    chatDialogRenderer.renderItemsList(this.chatList, this.wrapper);

    this.updateEventListeners(wrapperChildren);

    const button = document.querySelector(addBtnSelector);
    const search = document.querySelector('.chat__input');

    button.addEventListener('click', () => {
      const itemId = uuidv4();
      const newChatUserName = prompt('Введие имя пользователя');

      if (!newChatUserName) {
        return;
      }

      if (newChatUserName === this.username) {
        alert('Имя чата не должно соответсвовать вашему');

        return;
      }

      this.chatList[itemId] = {
        users: [newChatUserName, this.username],
        timestamp: Date.now(),
        chat: [],
      };

      const chatWithUserArray = this.chatList[itemId].users.filter(
        item => item !== this.username,
      );

      const chatString = chatItemString(
        chatWithUserArray[0],
        '',
        this.chatList[itemId].timestamp,
        itemId,
      );

      this.wrapper.insertAdjacentHTML('beforeend', chatString);
      this.updateEventListeners(wrapperChildren);

      localStorage.setItem('chatMap', JSON.stringify(this.chatList));
    });

    search.addEventListener('input', e => {
      for (const i in this.chatList) {
        if (
          !this.chatList[i].username
            .filter(item => item !== this.username)
            .join('')
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
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

        const burger = document.querySelector('.burger');

        burger?.click();
      });
    });
  }
}
