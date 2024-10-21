import '@mdi/font/css/materialdesignicons.css';
import '@/style/index.scss';

import { ChatPageRenderer } from './chatPageRenderer.js';
import { initAnims } from './anims.js';
import { Chat } from './chatList.js';
import { Form } from './form.js';

function init() {
  let username;

  while (!username) {
    username = prompt('Введите имя пользователя');
  }

  const chatRenderer = new ChatPageRenderer(
    '.dialog__inner',
    '.dialog__textarea',
    username,
  );

  const chat = new Chat('.chat__body', '.button__add', chatRenderer, username);

  new Form('.dialog', '#chat__input', chat, chatRenderer);

  initAnims('.burger', '.chat');
}

document.addEventListener('DOMContentLoaded', init);
