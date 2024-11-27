// Recursive function to remove empty elements, including nested ones
export function removeEmptyElements(element) {
  // First, recursively check for empty children
  for (let i = element.children.length - 1; i >= 0; i--) {
    removeEmptyElements(element.children[i]); // Recursively check child elements
  }

  // After all child elements are checked, check if the parent element is empty
  if (!element.innerHTML.trim() && element.children.length === 0) {
    element.remove(); // Remove the empty element (if no content or children)
  }
}
