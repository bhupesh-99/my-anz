export function isCustomElement(element) {
  const tagName = element.tagName.toLowerCase();
  return customElements.get(tagName) !== undefined;
}

// Recursive function to remove empty elements, including nested ones
export function removeEmptyElements(element) {
  // First, recursively check for empty children
  for (let i = element.children.length - 1; i >= 0; i--) {
    removeEmptyElements(element.children[i]); // Recursively check child elements
  }
  // After all child elements are checked, check if the parent element is empty
  if (!element.innerHTML.trim() && !isCustomElement(element) && element.children.length === 0) {
    element.remove(); // Remove the empty element (if no content or children)
  }
}

export function waitForElementDefinition(tagName) {
  return new Promise((resolve, reject) => {
    // If the element is already defined, resolve immediately
    if (customElements.get(tagName)) {
      resolve();
      return;
    }

    // Use customElements.whenDefined for more reliable waiting
    customElements.whenDefined(tagName).then(() => {
      resolve(); // Resolve once the custom element is defined
    }).catch(() => {
      reject(new Error(`The ${tagName} was not defined!`));
    });
  });
}
