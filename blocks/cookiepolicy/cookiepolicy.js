import { removeEmptyElements, waitForElementDefinition } from '../../utils/utils.js';

function createCookiePolicyInfo(elm) {
  const topContentWrapper = document.createElement('div');
  topContentWrapper.classList.add('cookie-policy-info');
  const contentFragment = document.createDocumentFragment();
  elm.forEach((element) => contentFragment.appendChild(element));
  topContentWrapper.appendChild(contentFragment);
  return topContentWrapper;
}

async function createCookiePolicyTypes(elm) {
  const bottomContentWrapper = document.createElement('div');
  bottomContentWrapper.classList.add('cookie-policy-types');
  const bottomContentFragment = document.createDocumentFragment();
  await waitForElementDefinition('cookie-selector').catch((err) => console.error('Not FFound::: ', err));

  const groupedElements = elm.reduce((groupArr, el) => {
    const tag = el.tagName.toLowerCase();
    if (tag === 'h3') {
      groupArr.push([el]);
    } else if (tag === 'p' && groupArr.length > 0) {
      groupArr[groupArr.length - 1].push(el);
    }
    return groupArr;
  }, []);

  console.log(groupedElements);

  groupedElements.forEach((elements) => {
    const el = document.createElement('div');
    el.classList.add('cookie-list');
    const cookieSelector = document.createElement('cookie-selector');
    cookieSelector.setAttribute('checked', 'true');
    cookieSelector.setAttribute('disabled', 'false');
    cookieSelector.appendChild(elements[0]);
    cookieSelector.appendChild(elements[1]);
    el.appendChild(cookieSelector);
    bottomContentFragment.appendChild(el);
  });

  // const cookieListItems = [];
  // let el = null;
  // groupedElements.reduce((array, elements, index) => {
  //   const cookieSelector = document.createElement('cookie-selector');
  //   cookieSelector.setAttribute('checked', 'true');
  //   cookieSelector.setAttribute('disabled', 'false');
  //   cookieSelector.appendChild(elements[0]);
  //   cookieSelector.appendChild(elements[1]);

  //   if(index % 2 === 0) {
  //     el = document.createElement('div');
  //     el.classList.add('cookie-list');
  //     el.appendChild(cookieSelector);
  //     array.push(el);
  //   } else if(index % 2 !== 0 && el) {
  //     el.appendChild(cookieSelector);
  //   } else if(!el){
  //     el = document.createElement('div');
  //     el.classList.add('cookie-list');
  //     el.appendChild(cookieSelector);
  //     array.push(el);
  //     el = null;
  //   }
  //   return array;
  // }, cookieListItems);

  // cookieListItems.forEach(element => {
  //   bottomContentFragment.appendChild(element);
  // });

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

export default async function decorate(block) {
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
      const cookiePolicyTypeEl = await createCookiePolicyTypes(bottomContent);
      block.appendChild(cookiePolicyInfoEl);
      block.appendChild(cookiePolicyTypeEl);
    }

    const buttonEl = createCookiePolicyButtons(buttonElWrapper);
    block.appendChild(buttonEl);
    removeEmptyElements(block);
  }
}
