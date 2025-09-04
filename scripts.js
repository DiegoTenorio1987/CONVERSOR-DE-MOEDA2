// Mapeia os elementos da página
const convertButton = document.querySelector(".convert-button"); // Seleciona o botão de conversão
const currencySelectInput = document.querySelector(".currency-select-input"); // Seleciona o input para a moeda de entrada
const currencySelectOutput = document.querySelector(".currency-select-output"); // Seleciona o input para a moeda de saída
const currencyValueToConvert = document.querySelector(
  ".currency-value-to-convert"
); // Seleciona o elemento que mostrará o valor a ser convertido
const currencyValueConverted = document.querySelector(".currency-value"); // Seleciona o elemento que mostrará o valor convertido
const currencyNameInput = document.querySelector(".currency"); // Seleciona o elemento que mostrará o nome da moeda de entrada
const imgInput = document.querySelector(".img-input"); // Seleciona o elemento que mostrará a imagem da moeda de entrada
const currencyNameOutput = document.querySelector(".currency-name"); // Seleciona o elemento que mostrará o nome da moeda de saída
const imgOutput = document.querySelector(".img-output"); // Seleciona o elemento que mostrará a imagem da moeda de saída

// Objeto para armazenar as taxas de câmbio
let currencies = {}; // Inicializa um objeto vazio para armazenar as informações das moedas

// Função para buscar as taxas de câmbio da API
async function fetchExchangeRates() {
  try {
    const response = await fetch(
      `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL` // Faz uma requisição para a API que fornece as taxas de câmbio
    );
    const data = await response.json(); // Converte a resposta da API em um objeto JSON

    // Atualiza o objeto currencies com as taxas recebidas
    currencies = {
      real: {
        rate: 1, // A taxa do Real é 1, pois é a moeda base
        name: "Real", // Nome da moeda
        img: "./assets/real.png", // Caminho da imagem da moeda
        format: "pt-BR", // Formato de exibição do valor
        currency: "BRL", // Código da moeda
      },
      dolar: {
        rate: data.USDBRL.high, // Taxa do Dólar baseada na resposta da API
        name: "US Dolar", // Nome da moeda
        img: "./assets/dolar.png", // Caminho da imagem da moeda
        format: "en-US", // Formato de exibição do valor
        currency: "USD", // Código da moeda
      },
      euro: {
        rate: data.EURBRL.high, // Taxa do Euro baseada na resposta da API
        name: "Euro", // Nome da moeda
        img: "./assets/euro.png", // Caminho da imagem da moeda
        format: "de-DE", // Formato de exibição do valor
        currency: "EUR", // Código da moeda
      },
      libra: {
        rate: data.GBPBRL.high, // Taxa da Libra baseada na resposta da API
        name: "Libra", // Nome da moeda
        img: "./assets/libra.png", // Caminho da imagem da moeda
        format: "en-GB", // Formato de exibição do valor
        currency: "GBP", // Código da moeda
      },
      bitcoin: {
        rate: data.BTCBRL.high, // Taxa do Bitcoin baseada na resposta da API
        name: "Bitcoin", // Nome da moeda
        img: "./assets/bitcoin.png", // Caminho da imagem da moeda
        format: "en-US", // Formato de exibição do valor
        currency: "BTC", // Código da moeda
      },
    };
  } catch (error) {
    console.error("Erro ao buscar as taxas de câmbio:", error); // Exibe um erro no console em caso de falha na requisição
  }
}

// Chama a função para buscar as taxas de câmbio ao carregar a página
fetchExchangeRates(); // Executa a função para buscar as taxas de câmbio

// Função para formatar o valor
function formatCurrency(value, currency) {
  return new Intl.NumberFormat(currencies[currency].format, {
    // Formata o valor de acordo com o formato da moeda
    style: "currency", // Define o estilo como moeda
    currency: currencies[currency].currency, // Define o código da moeda para a formatação
  }).format(value); // Retorna o valor formatado
}

// Atualiza a interface com a moeda selecionada
function updateCurrencyDisplay(selectElement, nameElement, imgElement) {
  const selectedValue = selectElement.value; // Obtém o valor selecionado no elemento de seleção
  nameElement.innerHTML = currencies[selectedValue].name; // Atualiza o nome da moeda no elemento correspondente
  imgElement.src = currencies[selectedValue].img; // Atualiza a imagem da moeda no elemento correspondente
}

// Função para lidar com a conversão
function convertValues() {
  const inputValueElement = document.querySelector(".input-currency"); // Seleciona o elemento de entrada do valor
  const inputValue = inputValueElement
    ? parseFloat(inputValueElement.value) // Converte o valor de entrada para um número
    : 0; // Se não houver valor, define como 0

  // Verifica se o valor de entrada é válido
  if (isNaN(inputValue) || inputValue <= 0) {
    alert("O valor a ser convertido é vazio ou inválido"); // Exibe um alerta se o valor for inválido
    return; // Sai da função se o valor for inválido
  }

  const inputCurrency = currencySelectInput.value; // Obtém a moeda de entrada selecionada
  const outputCurrency = currencySelectOutput.value; // Obtém a moeda de saída selecionada

  currencyValueToConvert.innerHTML = formatCurrency(inputValue, inputCurrency); // Atualiza o valor a ser convertido na interface
  const convertedValue =
    inputValue *
    (currencies[inputCurrency].rate / currencies[outputCurrency].rate); // Calcula o valor convertido
  currencyValueConverted.innerHTML = formatCurrency(
    convertedValue,
    outputCurrency
  ); // Atualiza o valor convertido na interface
}

// Adiciona os eventos
currencySelectInput.addEventListener(
  "change",
  () =>
    // Adiciona um evento de mudança ao seletor de moeda de entrada
    updateCurrencyDisplay(currencySelectInput, currencyNameInput, imgInput) // Atualiza a exibição da moeda de entrada
);
currencySelectOutput.addEventListener(
  "change",
  () =>
    // Adiciona um evento de mudança ao seletor de moeda de saída
    updateCurrencyDisplay(currencySelectOutput, currencyNameOutput, imgOutput) // Atualiza a exibição da moeda de saída
);
convertButton.addEventListener("click", convertValues); // Adiciona um evento de clique ao botão de conversão que chama a função de conversão
