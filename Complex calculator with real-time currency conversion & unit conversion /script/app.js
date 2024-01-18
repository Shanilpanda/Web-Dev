import { triggerKeyboard } from "./logic/calculator.js";
import { getAllCurrencies } from "./logic/currency-converter.js";
import { navButtons as unitButtons } from "./logic/unit-converter.js";

//nav elements
const viewContainer = document.getElementById("slider-cont");
const mainMarker = document.querySelector("#main-nav .marker");
const mainButtons = document.querySelectorAll("#main-nav button");
const unitMarker = document.querySelector("#units-converter .marker");


function navMovement(buttons,marker,container) {
  buttons[0].classList.add("active");
  console.log(buttons[0]);
  console.log(marker)
  marker.style.transform = `translate(${buttons[0].offsetLeft}px)`;
  marker.style.width = `${buttons[0].offsetWidth + 5}px`;
  marker.style.height = `${buttons[0].offsetHeight + 5}px`;

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      buttons.forEach((current) => current.classList.remove("active"));
      button.classList.add("active");
      const buttonOffset = button.offsetLeft;
      
      marker.style.transform = `translateX(${buttonOffset}px)`;
      marker.style.width = `${button.offsetWidth +5}px`;
      marker.style.height = `${button.offsetHeight +5}px`;

      if(container){
        button !== buttons[0] ? triggerKeyboard(false) : null;
        const containerMovement = viewContainer.offsetWidth / 3;
        container.style.transform = `translateX(-${containerMovement * index}px)`;
      }
    });
  });
}

navMovement(mainButtons, mainMarker, viewContainer);
navMovement(unitButtons, unitMarker);
getAllCurrencies();
