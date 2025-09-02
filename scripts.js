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

// Objeto para armazenar as taxas de câmbio
let currencies = {};

// Função para buscar as taxas de câmbio da API
async function fetchExchangeRates() {
  try {
    // Aqui você insere sua chave de API
    const response = await fetch(
      `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL`
    );
    const data = await response.json();

    // Atualiza o objeto currencies com as taxas recebidas
    currencies = {
      real: {
        rate: 1,
        name: "Real",
        img: "./assets/real.png",
        format: "pt-BR",
        currency: "BRL",
      },
      dolar: {
        rate: data.USDBRL.high, // Ajuste aqui
        name: "US Dolar",
        img: "./assets/dolar.png",
        format: "en-US",
        currency: "USD",
      },
      euro: {
        rate: data.EURBRL.high, // Ajuste aqui
        name: "Euro",
        img: "./assets/euro.png",
        format: "de-DE",
        currency: "EUR",
      },
      libra: {
        rate: data.GBPBRL.high, // Ajuste aqui
        name: "Libra",
        img: "./assets/libra.png",
        format: "en-GB",
        currency: "GBP",
      },
      bitcoin: {
        rate: data.BTCBRL.high, // Ajuste aqui
        name: "Bitcoin",
        img: "./assets/bitcoin.png",
        format: "en-US",
        currency: "BTC", // Ajuste aqui
      },
    };
  } catch (error) {
    console.error("Erro ao buscar as taxas de câmbio:", error);
  }
}

// Chama a função para buscar as taxas de câmbio ao carregar a página
fetchExchangeRates();

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
