export class Form {
  constructor(formSelector, textareaSelector, chat, chatRenderer) {
    this.form = document.querySelector(formSelector);
    this.textarea = document.querySelector(textareaSelector);
    this.chat = chat;
    this.chatRenderer = chatRenderer;
    this.chatWrapper = document.querySelector('.chat__body');
    this.form.addEventListener('submit', this.sendMessage.bind(this));
    this.form.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  sendMessage(e) {
    e.preventDefault();

    const chatList = JSON.parse(localStorage.getItem('chatList'));

    const message = {
      message: this.textarea.value,
      username: 'you',
      sent: true,
    };

    this.chat.currentChat.chatLink.chat.push(message);
    this.textarea.value = null;

    this.chatRenderer.renderMessage(message);

    chatList[this.chat.currentChat.chatLink.id] = {
      ...chatList[this.chat.currentChat.chatLink.id],
      chat: this.chat.currentChat.chatLink.chat,
      timestamp: Date.now(),
    };

    this.chatWrapper.innerHTML = '';
    this.chatRenderer.renderItemsList(chatList, this.chatWrapper);

    document
      .querySelector(`[id='${this.chat.currentChat.chatLink.id}']`)
      .classList.add('active');

    this.chat.updateEventListeners(this.chatWrapper.children);

    localStorage.setItem('chatList', JSON.stringify(chatList));
  }

  handleKeyUp(e) {
    e.preventDefault();

    if (e.key === 'Enter' && !e.shiftKey) {
      this.sendMessage(e);
    }
  }
}
