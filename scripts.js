// Mapeia os elementos da página
const convertButton = document.querySelector(".convert-button");
const currencySelectInput = document.querySelector(".currency-select-input");
const currencySelectOutput = document.querySelector(".currency-select-output");
const currencyValueToConvert = document.querySelector(
  ".currency-value-to-convert"
);
const currencyValueConverted = document.querySelector(".currency-value");
const currencyNameInput = document.querySelector(".currency");
const imgInput = document.querySelector(".img-input");
const currencyNameOutput = document.querySelector(".currency-name");
const imgOutput = document.querySelector(".img-output");

// Dados das moedas em um objeto
const currencies = {
  real: {
    rate: 1,
    name: "Real",
    img: "./assets/real.png",
    format: "pt-BR",
    currency: "BRL",
  },
  dolar: {
    rate: 5.56,
    name: "US Dolar",
    img: "./assets/dolar.png",
    format: "en-US",
    currency: "USD",
  },
  euro: {
    rate: 6.54,
    name: "Euro",
    img: "./assets/euro.png",
    format: "de-DE",
    currency: "EUR",
  },
  libra: {
    rate: 7.53,
    name: "Libra",
    img: "./assets/libra.png",
    format: "en-GB",
    currency: "GBP",
  },
  bitcoin: {
    rate: 654139.18,
    name: "Bitcoin",
    img: "./assets/bitcoin.png",
    format: "en-US",
    currency: "XBT",
  },
};

// Função para formatar o valor
function formatCurrency(value, currency) {
  return new Intl.NumberFormat(currencies[currency].format, {
    style: "currency",
    currency: currencies[currency].currency,
  }).format(value);
}

// Atualiza a interface com a moeda selecionada
function updateCurrencyDisplay(selectElement, nameElement, imgElement) {
  const selectedValue = selectElement.value;
  nameElement.innerHTML = currencies[selectedValue].name;
  imgElement.src = currencies[selectedValue].img;
  convertValues(); // Atualiza a conversão ao trocar a moeda
}

// Função para lidar com a conversão
function convertValues() {
  const inputValue = parseFloat(
    document.querySelector(".input-currency").value
  );

  if (isNaN(inputValue) || inputValue <= 0) {
    alert("The value to convert is empty or invalid");
    return;
  }

  const inputCurrency = currencySelectInput.value;
  const outputCurrency = currencySelectOutput.value;

  currencyValueToConvert.innerHTML = formatCurrency(inputValue, inputCurrency);
  const convertedValue =
    inputValue *
    (currencies[inputCurrency].rate / currencies[outputCurrency].rate);
  currencyValueConverted.innerHTML = formatCurrency(
    convertedValue,
    outputCurrency
  );
}

// Adiciona os eventos
currencySelectInput.addEventListener("change", () =>
  updateCurrencyDisplay(currencySelectInput, currencyNameInput, imgInput)
);
currencySelectOutput.addEventListener("change", () =>
  updateCurrencyDisplay(currencySelectOutput, currencyNameOutput, imgOutput)
);
convertButton.addEventListener("click", convertValues);
