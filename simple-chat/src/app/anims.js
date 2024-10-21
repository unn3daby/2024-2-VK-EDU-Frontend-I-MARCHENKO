export const initAnims = (selector, wrapperSelector) => {
  const btn = document.querySelector(selector);
  const chatWraper = document.querySelector(wrapperSelector);

  btn.addEventListener('click', () => {
    btn.classList.toggle('close');
    chatWraper.classList.toggle('active');
  });
};
