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
const btn = document.querySelector('button'); // El botón "Actualizar Precio"

btn.onclick = async () => {
    const cantidad = document.querySelector('input').value;
    const crypto = document.querySelector('select').value;
    const display = document.querySelector('span'); // Donde dice 0.00

    try {
        const resp = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        const data = await resp.json();
        const precio = data[crypto].usd;
        
        display.innerText = (cantidad * precio).toLocaleString('en-US');
    } catch (error) {
        alert("Error al conectar con la API. Intenta en un minuto.");
    }
};

const btn = document.querySelector('button'); // El botón "Actualizar Precio"

btn.onclick = async () => {
    const cantidad = document.querySelector('input').value;
    const crypto = document.querySelector('select').value;
    const display = document.querySelector('span'); // Donde dice 0.00

    try {
        const resp = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        const data = await resp.json();
        const precio = data[crypto].usd;
        
        display.innerText = (cantidad * precio).toLocaleString('en-US');
    } catch (error) {
        alert("Error al conectar con la API. Intenta en un minuto.");
    }
};

const amountInput = document.getElementById('amount');
const cryptoSelect = document.getElementById('cryptoSelect');
const resultDisplay = document.getElementById('result');
const convertBtn = document.querySelector('button');

async function calculate() {
    const amount = amountInput.value;
    const crypto = cryptoSelect.value;

    // Validación para no enviar valores vacíos
    if (amount <= 0) {
        resultDisplay.innerText = "0.00";
        return;
    }

    try {
        // Llamada directa a la API (Sin depender del .env)
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        const data = await response.json();
        
        // Extraemos el precio
        const price = data[crypto].usd;
        
        // Calculamos el total
        const total = (amount * price).toLocaleString('en-US', { minimumFractionDigits: 2 });
        
        // Mostramos el resultado
        resultDisplay.innerText = total;
        
    } catch (error) {
        console.error("Error:", error);
        resultDisplay.innerText = "Error API";
    }
}

// Escuchar el clic del botón
convertBtn.addEventListener('click', calculate);

const amountInput = document.getElementById('amount');
const cryptoSelect = document.getElementById('crypto-select');
const resultDisplay = document.getElementById('crypto-result');
const convertBtn = document.getElementById('btn-convert');

async function convertCurrency() {
    const amount = amountInput.value;
    const crypto = cryptoSelect.value;

    // Cambiamos el estado del botón mientras esperamos la API
    convertBtn.innerText = "Cargando...";
    convertBtn.style.opacity = "0.7";

    try {
        // Consultamos la API de CoinGecko directamente
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        const data = await response.json();

        // Obtenemos el precio y calculamos
        const priceInUsd = data[crypto].usd;
        const total = (amount * priceInUsd).toLocaleString('en-US', { minimumFractionDigits: 2 });

        // Mostramos el resultado
        resultDisplay.innerText = total;

    } catch (error) {
        console.error("Error al obtener datos:", error);
        resultDisplay.innerText = "Error";
        resultDisplay.style.color = "#f87171";
    } finally {
        // Restauramos el botón
        convertBtn.innerText = "Calcular Conversión";
        convertBtn.style.opacity = "1";
    }
}

// Escuchar el evento del botón
convertBtn.addEventListener('click', convertCurrency);

async function convertCurrency() {
    const amount = amountInput.value;
    const crypto = cryptoSelect.value;

    // Resetear el estilo por si hubo error previo
    resultDisplay.style.color = "#4ade80";
    
    // Quitar la clase de animación para poder reiniciarla
    resultDisplay.classList.remove('animate-result');

    convertBtn.innerText = "Cargando...";
    convertBtn.disabled = true;

    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        const data = await response.json();

        const priceInUsd = data[crypto].usd;
        const total = (amount * priceInUsd).toLocaleString('en-US', { minimumFractionDigits: 2 });

        // Insertar el resultado
        resultDisplay.innerText = total;

        // Forzar un "reflujo" para que el navegador note que quitamos la clase y la vuelva a poner
        void resultDisplay.offsetWidth; 
        
        // Agregar la clase de animación
        resultDisplay.classList.add('animate-result');

    } catch (error) {
        resultDisplay.innerText = "Error";
        resultDisplay.style.color = "#f87171";
    } finally {
        convertBtn.innerText = "Actualizar Precio";
        convertBtn.disabled = false;
    }
}

const convertBtn = document.getElementById('convertBtn');
const resultDisplay = document.getElementById('result');

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const crypto = document.getElementById('cryptoSelect').value;

    // 1. Obtener la URL base desde el .env
    // Si usas Vite es: import.meta.env.VITE_API_URL
    // Si usas Next.js o similar es: process.env.NEXT_PUBLIC_API_URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL; 

    try {
        // 2. Construir la consulta completa
        const response = await fetch(`${baseUrl}/simple/price?ids=${crypto}&vs_currencies=usd`);
        const data = await response.json();

        // 3. Extraer precio y calcular
        const price = data[crypto].usd;
        const total = (amount * price).toFixed(2);

        // 4. Mostrar con la animación que planeamos
        resultDisplay.innerText = total;
        resultDisplay.classList.add('animate-result');

    } catch (error) {
        console.error("Error al conectar:", error);
        resultDisplay.innerText = "Error API";
    }
}

convertBtn.addEventListener('click', convertCurrency);
