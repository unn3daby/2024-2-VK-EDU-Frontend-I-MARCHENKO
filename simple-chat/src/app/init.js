import '@mdi/font/css/materialdesignicons.css';
import '@/style/index.scss';

import { ChatPageRenderer } from './chatPageRenderer.js';
import { initAnims } from './anims.js';
import { Chat } from './chatList.js';
import { Form } from './form.js';

function init() {
  const chatRenderer = new ChatPageRenderer(
    '.dialog__inner',
    '.dialog__textarea',
  );

  const chat = new Chat('.chat__body', '.button__add', chatRenderer);

  new Form('.dialog', '#chat__input', chat, chatRenderer);

  initAnims('.burger', '.chat');
}

document.addEventListener('DOMContentLoaded', init);
