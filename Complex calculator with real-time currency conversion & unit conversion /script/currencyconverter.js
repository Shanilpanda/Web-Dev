import { request } from "../api.js";
import { popAlert, spinner } from "./utils.js";

//HTML Elements
const fromCurr = document.getElementById("currency-from");
const toCurr = document.getElementById("currency-to");
const fromAmount = document.getElementById("input-currency");
const toAmount = document.getElementById("output-currency");
const exchangeButton = document.getElementById("exchange-button");
const swapButton = document.getElementById("currency-swap-button");
let currencies = {}; //currency code and name storage, using it for labels


//attach event listeners
exchangeButton.addEventListener("click",convertCurrency);
fromCurr.addEventListener("change", setCurrencyName);
toCurr.addEventListener("change", setCurrencyName);
swapButton.addEventListener("click",() => {
  [fromCurr.value,toCurr.value] = [toCurr.value,fromCurr.value]
});


//the currency conversion api request
async function getExchangeRate(from, to, amount) {
  let url = `https://api.apilayer.com/exchangerates_data/convert?to=${from}&from=${to}&amount=${amount}`;
  let response = await request(url);
  return response;
}


//gets all available currencies and invokes a function which appends them to the select input
export async function getAllCurrencies() {
  let url = "https://api.apilayer.com/currency_data/list";
  let response;
  spinner(true, null);
  try {
    response = await request(url);
  } catch (err) {
    spinner(false, null);
    popAlert("Something went wrong!", "red");
    return;
  }
  appendSelectOptions(response.currencies);
  spinner(false, null);
}


function appendSelectOptions(data) {
  Object.entries(data).forEach(([code, country]) => {
    fromCurr.appendChild(createOption(code));
    toCurr.appendChild(createOption(code));
    currencies[code] = country;
  });
  fromCurr.value = "USD";
  toCurr.value = "EUR";
}

//option creater
function createOption(code) {
  const optionEl = document.createElement("option");
  optionEl.value = code;
  optionEl.textContent = code;
  return optionEl;
}


//currency conversion controls
export async function convertCurrency() {
  let from = fromCurr.value;
  let to = toCurr.value;
  let amount = fromAmount.value;
  if (amount > 0) {
    spinner(true, exchangeButton);
    let getExchangedRate;

    try {
      getExchangedRate = await getExchangeRate(from, to, amount);
    } catch (err) {
      spinner(false, exchangeButton);
      popAlert("Something went wrong!", "red");
      return;
    }

    spinner(false, e.target);
    toAmount.value = getExchangedRate.result.toFixed(2);
  } else {
    popAlert("Incorrect amount!", "red");
  }
}


//sets the label name on change
function setCurrencyName(e) {
  const label = e.target.previousElementSibling;
  label.textContent = currencies[e.target.value];
}
