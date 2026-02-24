const amountInput = document.getElementById('amount');
const cryptoSelect = document.getElementById('cryptoSelect');
const resultDisplay = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');
const debugMsg = document.getElementById('debug-msg');

async function convertCurrency() {
    const amount = amountInput.value;
    const crypto = cryptoSelect.value;

    resultDisplay.innerText = "Cargando...";
    debugMsg.innerText = "Conectando con CoinGecko...";

    try {
        // Usamos la URL completa directamente para asegurar conexión
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }

        const data = await response.json();
        
        // Verificamos si la API devolvió el precio
        if (data[crypto] && data[crypto].usd) {
            const price = data[crypto].usd;
            const total = (amount * price).toLocaleString('en-US', { minimumFractionDigits: 2 });
            
            resultDisplay.innerText = total;
            debugMsg.innerText = "¡Éxito! Datos actualizados.";
            resultDisplay.style.color = "#4ade80";
        } else {
            resultDisplay.innerText = "Error";
            debugMsg.innerText = "La API no devolvió el precio de " + crypto;
        }

    } catch (error) {
        console.error(error);
        resultDisplay.innerText = "Fallo";
        debugMsg.innerText = "Error: " + error.message;
        resultDisplay.style.color = "#f87171";
    }
}

convertBtn.addEventListener('click', convertCurrency);

// Función para cambiar el color de fondo
function updateTheme() {
    const crypto = cryptoSelect.value;
    // Quitamos cualquier clase de moneda anterior
    document.body.className = ''; 
    // Añadimos la clase de la moneda actual
    document.body.classList.add(crypto);
}

// Escuchar cuando el usuario cambia la moneda en el selector
cryptoSelect.addEventListener('change', updateTheme);

// Llamarla una vez al inicio para que cargue el color de Bitcoin por defecto
updateTheme();


