import { v4 as uuidv4 } from 'uuid';

import { chatItemString } from './elements.js';

export class Chat {
  currentChat = { chatLink: null };
  chatList = {};

  constructor(wrapperSelector, addBtnSelector, chatDialogRenderer, username) {
    this.wrapper = document.querySelector(wrapperSelector);
    this.chatDialogRenderer = chatDialogRenderer;
    this.username = username;

    const localChatList = localStorage.getItem('chatList');

    if (localChatList) {
      const fullChatList = JSON.parse(localChatList);

      console.log(
        Object.entries(fullChatList)
          .filter(([_, item]) => item.users.includes(this.username))
          .reduce((acc, [id, item]) => {
            acc[id] = item;

            return acc;
          }, {}),
      );
      this.chatList = Object.entries(fullChatList)
        .filter(([_, item]) => item.users.includes(this.username))
        .reduce((acc, [id, item]) => {
          acc[id] = item;

          return acc;
        }, {});
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

      this.chatList[itemId] = {
        users: [newChatUserName, this.username],
        timestamp: Date.now(),
        chat: [],
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
        if (
          !this.chatList[i].username
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
      });
    });
  }
}
