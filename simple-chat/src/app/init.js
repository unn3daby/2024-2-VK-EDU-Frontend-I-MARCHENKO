import '@/style/index.scss';

function init() {
  const form = document.querySelector('.form');

  document.querySelectorAll('textarea').forEach(textarea => {
    textarea.style.height = `${textarea.scrollHeight}px`;
    textarea.style.overflowY = 'auto';

    textarea.addEventListener('input', function () {
      if (this.scrollHeight > 200) {
        return;
      }

      this.style.height = 'auto';
      this.style.height = `${this.scrollHeight}px`;
    });
  });
}

init();
