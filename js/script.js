// js/script.js

function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  function changeBackgroundColor() {
    const randomColor = getRandomColor();
  
    document.body.style.backgroundColor = randomColor;
  }
  
  document.body.addEventListener('click', changeBackgroundColor);
  
