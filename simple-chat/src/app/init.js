import '@/style/index.scss';
import '@mdi/font/css/materialdesignicons.css';

import { messageContainer, textarea, form } from './elements.js';
import { createChatItem } from './render-message.js';

function init() {
  let username;

  do {
    username = prompt('Введите имя пользователя');
  } while (!username);

  let textareaValue = '';

  let rawMessages = localStorage.getItem('messages');

  if (!rawMessages) {
    localStorage.setItem('messages', '[]');
    rawMessages = '[]';
  }

  const messages = JSON.parse(rawMessages);

  messages.forEach(({ username: messageUsername, text, time }) => {
    messageContainer.appendChild(
      createChatItem(text, messageUsername === username, messageUsername, time),
    );
  });

  textarea.addEventListener('input', function (e) {
    e.preventDefault();
    textareaValue = this.innerText;
  });

  textarea.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.dispatchEvent(new Event('submit'));
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const now = new Date();

    const newMessage = {
      time: `${now.getHours()}:${now.getMinutes()}`,
      text: textareaValue,
      username,
    };

    messages.push(newMessage);

    messageContainer.appendChild(
      createChatItem(newMessage.text, true, username, newMessage.time),
    );

    localStorage.setItem('messages', JSON.stringify(messages));

    textarea.innerText = '';

    messageContainer.scrollTo({ top: messageContainer.scrollHeight });
  });
}

document.addEventListener('DOMContentLoaded', init);
