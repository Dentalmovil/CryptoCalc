const amountInput = document.getElementById('amount');
const cryptoSelect = document.getElementById('cryptoSelect');
const cryptoSearch = document.getElementById('cryptoSearch');
const resultDisplay = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');
let myChart = null;
let hasShownModal = false;

// 1. Buscador
cryptoSearch.addEventListener('input', () => {
    const filter = cryptoSearch.value.toLowerCase();
    Array.from(cryptoSelect.options).forEach(opt => {
        opt.style.display = opt.text.toLowerCase().includes(filter) ? '' : 'none';
    });
});

// 2. Cambio de tema
cryptoSelect.addEventListener('change', () => {
    document.body.className = cryptoSelect.value;
});

// 3. Sonido "Ding"
function playSound() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 800;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start(); osc.stop(ctx.currentTime + 0.5);
}

// 4. Gráfica de 7 días
async function loadChart(id) {
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`);
        const data = await res.json();
        const prices = data.prices.map(p => p[1]);
        const labels = data.prices.map(p => new Date(p[0]).toLocaleDateString('es-ES', {weekday: 'short'}));

        // Color según tendencia
        const color = prices[prices.length - 1] >= prices[0] ? '#02c076' : '#f84960';

        if (myChart) myChart.destroy();
        const ctx = document.getElementById('priceChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: prices,
                    borderColor: color,
                    borderWidth: 3,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: color + '22',
                    tension: 0.4
                }]
            },
            options: { 
                plugins: { legend: { display: false } },
                scales: { x: { display: false }, y: { display: false } },
                responsive: true, maintainAspectRatio: false
            }
        });
    } catch (e) { console.error(e); }
}

// 5. Conversión y Actualización
async function main() {
    const id = cryptoSelect.value;
    const amount = amountInput.value;
    
    convertBtn.innerText = "Sincronizando...";
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`);
        const data = await res.json();
        resultDisplay.innerText = (amount * data[id].usd).toLocaleString('en-US', {minimumFractionDigits: 2});
        
        playSound();
        await loadChart(id);

        if (!hasShownModal) {
            setTimeout(() => { document.getElementById('referralModal').style.display = 'block'; }, 1500);
            hasShownModal = true;
        }
    } catch (e) { resultDisplay.innerText = "Error"; }
    finally { convertBtn.innerText = "Actualizar y Ver Gráfica"; }
}

convertBtn.addEventListener('click', main);
document.querySelector('.close-btn').onclick = () => document.getElementById('referralModal').style.display = 'none';




