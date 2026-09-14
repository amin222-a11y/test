const statusEl = document.querySelector('#status');
const outputEl = document.querySelector('#output');
const btn = document.querySelector('#summarizeBtn');

const worker = new Worker('worker.js', { type: 'module' });
worker.postMessage({ type: 'load' });

worker.onmessage = (event) => {
    if (event.data.type === 'ready') statusEl.textContent = 'مدل آماده‌ست! ✅';
    if (event.data.type === 'result') outputEl.textContent = event.data.text;
};

btn.addEventListener('click', () => {
    const text = document.querySelector('#input').value.trim();
    if (!text) return;
    statusEl.textContent = 'در حال خلاصه‌سازی...';
    worker.postMessage({ type: 'summarize', text });
});