import { popAlert } from "./utils.js";
import { weight, area, volume, temp, time, length } from "./unit-convert-calc.js";

const converters = { weight, area, volume, temp, time, length };
let chosenUnits = converters.length;  //length stands for the "length units convert function", not to be mistaken with the regular property

//HTML elements
export const navButtons = document.querySelectorAll(".unit-buttons button");
const inputField = document.getElementById("unit-from");
const outputField = document.getElementById("unit-to");
const convertButton = document.getElementById("convert-button");
const swapUnitsButton = document.getElementById("swap-button");
const flipCards = document.querySelectorAll(".unit-card-inner");
let frontUnitBoxFrom = document.querySelector("#select-unit-from .front");
let frontUnitBoxTo = document.querySelector("#select-unit-to .front");
let backUnitBoxFrom = document.querySelector("#select-unit-from .back");
let backUnitBoxTo = document.querySelector("#select-unit-to .back");

let inputUnits;
let outputUnits;
let revertCardSpin = false;
let activeNavButton = navButtons[0];


convertButton.addEventListener("click",convertUnits);
swapUnitsButton.addEventListener("click",swapUnits);
addRadioListeners();

navButtons.forEach(button => {
  button.addEventListener("click",(e) => {
    if(e.target !== activeNavButton){
      const currentButtonIndex = Array.from(navButtons).indexOf(e.target);
      const navBarWidth = e.target.parentElement.offsetWidth;
      chosenUnits = converters[e.target.value];
      fillNewCards();
      flipCard();
      activeNavButton = e.target;
      setTimeout(() => {
        e.target.parentElement.scrollLeft = currentButtonIndex >= 2 ? 
        navBarWidth : 0;
      },100);
    }
  })
})


function addRadioListeners() {
  let inputUnitDivs = frontUnitBoxFrom.querySelectorAll("div");
  let outputUnitDivs = frontUnitBoxTo.querySelectorAll("div");

  inputUnitDivs.forEach((div) => {
    div.addEventListener("click", (e) => {
      const radio = e.target.querySelector("input");
      radio.checked = true;
      inputUnits = radio.value;
    });
  });
  outputUnitDivs.forEach((div) => {
    div.addEventListener("click", (e) => {
      const radio = e.target.querySelector("input");
      radio.checked = true;
      outputUnits = radio.value;
    });
  });
}

// conversion controller
export function convertUnits(){
  if(!inputUnits || !outputUnits || !inputField.value){
    return popAlert("Please, fill all input fields!","red");
  }
  const baseUnitConversion = chosenUnits(Number(inputField.value), true)[inputUnits];
  const converted = chosenUnits(baseUnitConversion)[outputUnits];
  outputField.value = converted;
}

//flip card updater
function fillNewCards(){
  Object.keys(chosenUnits()).forEach((key) => {
    backUnitBoxFrom.appendChild(createUnitInputBox("from",key));
    backUnitBoxTo.appendChild(createUnitInputBox("to",key));
  });
  
  [frontUnitBoxFrom,frontUnitBoxTo,backUnitBoxFrom,backUnitBoxTo] =
  [backUnitBoxFrom,backUnitBoxTo,frontUnitBoxFrom,frontUnitBoxTo]
  clearInputFields();
  setTimeout(() => {
    addRadioListeners();
    backUnitBoxFrom.textContent = "";
    backUnitBoxTo.textContent = "";
  },300);
}

//card flipper
function flipCard(){
  flipCards[0].style.transform = `rotateY(${revertCardSpin ? 0:180}deg)`;
  flipCards[1].style.transform = `rotateY(${revertCardSpin ? 0:180}deg)`;
  revertCardSpin = !revertCardSpin;
}

function createUnitInputBox(direction, unitValue){
  const div = document.createElement("div");
  const input = document.createElement("input");
  const label = document.createElement("label");
  input.type = "radio";
  input.name = `unit-${direction}`;
  input.value = unitValue;
  label.textContent = unitValue;

  div.append(input,label);
  return div;
}

function clearInputFields(){
  inputField.value = "";
  outputField.value = "";
  inputUnits = "";
  outputUnits = "";
}

function swapUnits(){
  if(inputUnits && outputUnits){
    frontUnitBoxFrom.querySelector(`[value="${outputUnits}"]`).checked = true;
    frontUnitBoxTo.querySelector(`[value="${inputUnits}"]`).checked = true;
    [inputUnits, outputUnits] = [outputUnits,inputUnits];
  }
}
