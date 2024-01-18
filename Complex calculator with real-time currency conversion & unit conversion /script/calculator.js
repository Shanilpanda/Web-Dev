import { popAlert } from "./utils.js";

//HTML Elements
const display = document.getElementById("display");
const startRow = document.querySelector("#display .row");
const buttons = document.querySelectorAll("#calc-container .button");

//valid operators
const operators = ["+", "-", "/", "*"];

let currentRow = null;
let prevRow = null;
let kbdSwitch = false;

//attach event listeners
buttons.forEach((button) => {
  button.addEventListener("click",compute);
});
display.addEventListener("click",triggerKeyboard);


//calculator logic and dom manipulation
function compute(e) {
  currentRow = !currentRow ? startRow : currentRow;
  let content = currentRow.textContent;
  let last = currentRow.textContent.slice(-1);
  let value = e.target.dataset.value;
  displayScroller();

  switch (value) {
    case "+":
    case "/":
    case "*":
      if (operators.includes(last) || !content) {
        return;
      } else if (last == ".") {
        currentRow.textContent = `${currentRow.textContent.slice(0,-1)}${value}`;
      } else {
        currentRow.textContent += value;
      }
    break;
    case "-":
      if (last == "-") {
        currentRow.textContent = `${currentRow.textContent.slice(0, -1)}+`;
      } else if (last == "+" || last == ".") {
        currentRow.textContent = `${currentRow.textContent.slice(0, -1)}-`;
      } else {
        currentRow.textContent += value;
      }
    break;
    case ".":
      if(last == "."){
        return;
      } else {
      currentRow.textContent += value;
      }
    break;
    case "=":

    const operatorCheck = operators.some(operator => content.includes(operator));

    if (!content || !operatorCheck) {
      return;
    }

    operators.includes(last)? 
    (currentRow.textContent = `${currentRow.textContent.slice(0, -1)}`): null;
      
    let calculation;
    try{
      calculation = eval(currentRow.textContent);
    }catch(err){
      popAlert(err.message,"red");
      return;
    }

    if(isNaN(calculation)){
      currentRow.textContent = "Error";
    } else {
      currentRow.textContent += ` = ${calculation !== Math.round(calculation)?
      calculation.toFixed(2): calculation}`;
    }
    
    prevRow = currentRow;
    prevRow.classList.add("prev-row");
    currentRow = createNewRow();
    displayScroller();
    break;
    case "Delete":
      display.textContent = "";
      currentRow = createNewRow();
      displayScroller();
    break;
    case "Backspace":
      currentRow.textContent = currentRow.textContent.slice(0, -1);
    break;
    default:
      currentRow.textContent += value;
    break;
  }
}

//function that adds a scroller to the display if it gets crowded, removes it if the display is cleared
function displayScroller(){
  let height = 0;
  Array.from(display.children).forEach(row => {
    height += row.offsetHeight;
  });
  if(height >= (display.offsetHeight - 45)){
    display.classList.add("overflow-display");
    display.scrollTop = height;
  } else {
    display.scrollTop = 0;
    display.classList.remove("overflow-display");
  }
}

//create new row in the display
function createNewRow() {
  const row = document.createElement("div");
  row.classList.add("row");
  display.appendChild(row);
  return row;
}

//turns on/off the function for using the calculator via keyboard, changing the view to something different turns it off
export function triggerKeyboard(shutdown){
  if(!shutdown){
    document.body.removeEventListener("keydown",keyboardMode);
    display.classList.remove("keyboard-mode");
    kbdSwitch = false;
    return;
  }

  !kbdSwitch ? document.body.addEventListener("keydown",keyboardMode) :
  document.body.removeEventListener("keydown",keyboardMode);

  popAlert(`Keyboard mode ${!kbdSwitch ? "":"de"}activated.`);
  display.classList.toggle("keyboard-mode");
  kbdSwitch = !kbdSwitch;
}

function keyboardMode(e) {
  let currentButton = document.querySelector(`[data-value="${e.key}"]`);
  
    if(e.key == "Enter") {
      e.preventDefault();
      currentButton = document.querySelector(`[data-value="="]`);
    }
    
    currentButton?.classList.add("hover");
    currentButton?.click();
    setTimeout(() => {
      currentButton?.classList.remove("hover");
    }, 300);
}