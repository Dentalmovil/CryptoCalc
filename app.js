// app.js
const amountInput = document.getElementById('amount');
const cryptoSelect = document.getElementById('cryptoSelect');
const resultDisplay = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');

async function calculateCrypto() {
  const crypto = cryptoSelect.value; // ej: 'bitcoin'
  const amount = amountInput.value;

  try {
    // 1. Llamada a la API
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
    const data = await response.json();

    // 2. Extraer el precio
    const price = data[crypto].usd;

    // 3. Calcular y mostrar
    const total = (amount * price).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    resultDisplay.innerText = total;

  } catch (error) {
    console.error("Error al obtener el precio", error);
    resultDisplay.innerText = "Error de conexión";
  }
}

// Eventos
convertBtn.addEventListener('click', calculateCrypto);
