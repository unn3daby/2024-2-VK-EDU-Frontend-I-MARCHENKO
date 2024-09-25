import '@/style/index.scss';

function init() {
  const form = document.querySelector('.form');
  const textarea = document.querySelector('.form-textarea');

  textarea.addEventListener('input', function () {
    console.log(this.scrollHeight);
  });
}

init();
