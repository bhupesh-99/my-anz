import { removeEmptyElements } from '../../utils/utils.js';

function createCookiePolicyInfo(elm) {
  const topContentWrapper = document.createElement('div');
  topContentWrapper.classList.add('cookie-policy-info');
  const contentFragment = document.createDocumentFragment();
  elm.forEach((element) => contentFragment.appendChild(element));
  topContentWrapper.appendChild(contentFragment);
  return topContentWrapper;
}

function createCookiePolicyTypes(elm) {
  const bottomContentWrapper = document.createElement('div');
  bottomContentWrapper.classList.add('cookie-policy-types');
  const bottomContentFragment = document.createDocumentFragment();
  elm.forEach((element) => bottomContentFragment.appendChild(element));
  bottomContentWrapper.appendChild(bottomContentFragment);
  return bottomContentWrapper;
}

function createCookiePolicyButtons(elm) {
  const buttonEl = document.createElement('div');
  buttonEl.classList.add('cookie-policy-buttons');
  const buttonFragment = document.createDocumentFragment();
  Array.from(elm.children).forEach((element) => buttonFragment.appendChild(element));
  buttonEl.appendChild(buttonFragment);
  return buttonEl;
}

export default function decorate(block) {
  if (block.children) {
    const contentElWrapper = block.children[0];
    const buttonElWrapper = block.children[1];
    const contentEl = contentElWrapper.children[0];
    const elementsArray = Array.from(contentEl.children);
    const h2Index = elementsArray.findIndex((el) => el.tagName.toLowerCase() === 'h2');

    if (h2Index !== -1) {
      const topContent = elementsArray.slice(0, h2Index);
      const bottomContent = elementsArray.slice(h2Index, elementsArray.length);

      const cookiePolicyInfoEl = createCookiePolicyInfo(topContent);
      const cookiePolicyTypeEl = createCookiePolicyTypes(bottomContent);

      block.appendChild(cookiePolicyInfoEl);
      block.appendChild(cookiePolicyTypeEl);
    } else {
      console.log('element not found.');
    }

    const buttonEl = createCookiePolicyButtons(buttonElWrapper);
    block.appendChild(buttonEl);
    removeEmptyElements(block);
  }
}
