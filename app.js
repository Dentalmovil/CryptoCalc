const amountInput = document.getElementById('amount');
const cryptoSelect = document.getElementById('cryptoSelect');
const cryptoSearch = document.getElementById('cryptoSearch');
const resultDisplay = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');
let firstCalc = true;

// 1. Sonido de Caja Registradora
function playSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
}

// 2. Buscador de Monedas
cryptoSearch.addEventListener('input', () => {
    const filter = cryptoSearch.value.toLowerCase();
    Array.from(cryptoSelect.options).forEach(opt => {
        opt.style.display = opt.text.toLowerCase().includes(filter) ? '' : 'none';
    });
});

// 3. Cambio de Color de Fondo
cryptoSelect.addEventListener('change', () => {
    document.body.className = cryptoSelect.value;
});

// 4. Conversión Real
async function convert() {
    const crypto = cryptoSelect.value;
    const amount = amountInput.value;
    if (!amount) return;

    convertBtn.innerText = "Calculando...";
    try {
        const resp = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        const data = await resp.json();
        const total = (amount * data[crypto].usd).toLocaleString('en-US', {minimumFractionDigits: 2});
        
        resultDisplay.innerText = total;
        playSound();

        if (firstCalc) {
            setTimeout(() => { document.getElementById('referralModal').style.display = 'block'; }, 1000);
            firstCalc = false;
        }
    } catch (e) {
        resultDisplay.innerText = "Error";
    } finally {
        convertBtn.innerText = "Actualizar Precio";
    }
}

convertBtn.addEventListener('click', convert);
document.querySelector('.close-btn').onclick = () => document.getElementById('referralModal').style.display = 'none';



