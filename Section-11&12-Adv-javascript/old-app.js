// document.body.children[1].children[0].href = 'https://google.com'

const anchorElement = document.getElementById('external-link');
anchorElement.href = "https://google.com"
anchorElement.textContent = "changed link";

// creating elements
const newElement = document.createElement('a');
newElement.href = "https://google.com";
newElement.textContent = "This leads to google";

const firstParagraph  = document.querySelector('p');
firstParagraph.append(newElement);

// removing elements
let element = document.querySelector('a');
element.remove();

// moving elements
firstParagraph.parentElement.append(firstParagraph);
firstParagraph.innerHTML = "Hi <strong>vishal</strong>"