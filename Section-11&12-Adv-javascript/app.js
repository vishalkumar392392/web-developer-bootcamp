let textElement = document.querySelector('input');
let num = document.getElementById('counter');
let spanElement = document.getElementById('number-style');

function count (event) {
  console.log(textElement.value)
  num.textContent = 60 - textElement.value.length
  if(Number(num.textContent) < 10){
    num.classList.add('warning');
    textElement.classList.add('warning');
  }
  if(Number(num.textContent) > 10){
    num.classList.remove('warning');
    textElement.classList.remove('warning');
  }
}
textElement.addEventListener('input', count);