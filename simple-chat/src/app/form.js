import { filterChatlist } from './utils.js';

export class Form {
  constructor(formSelector, textareaSelector, chat, chatRenderer, username) {
    this.form = document.querySelector(formSelector);
    this.textarea = document.querySelector(textareaSelector);
    this.chat = chat;
    this.chatRenderer = chatRenderer;
    this.username = username;
    this.chatWrapper = document.querySelector('.chat__body');
    this.form.addEventListener('submit', this.sendMessage.bind(this));
    this.form.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  sendMessage(e) {
    e.preventDefault();

    let chatList = JSON.parse(localStorage.getItem('chatMap'));

    const message = {
      message: this.textarea.value,
      username: this.username,
    };

    this.chat.currentChat.chatLink.chat.push(message);

    this.textarea.value = null;

    this.chatRenderer.renderMessage(message, true);

    chatList[this.chat.currentChat.chatLink.id] = {
      ...chatList[this.chat.currentChat.chatLink.id],
      chat: this.chat.currentChat.chatLink.chat,
      timestamp: Date.now(),
    };

    chatList = filterChatlist(chatList, this.username);

    this.chatWrapper.innerHTML = '';
    this.chatRenderer.renderItemsList(chatList, this.chatWrapper);

    document
      .querySelector(`[id='${this.chat.currentChat.chatLink.id}']`)
      .classList.add('active');

    this.chat.updateEventListeners(this.chatWrapper.children);

    localStorage.setItem('chatMap', JSON.stringify(chatList));
  }

  handleKeyUp(e) {
    e.preventDefault();

    if (e.key === 'Enter' && !e.shiftKey) {
      this.sendMessage(e);
    }
  }
}
