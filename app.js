const statusEl = document.querySelector('#status');
const outputEl = document.querySelector('#output');
const btn = document.querySelector('#summarizeBtn');

const worker = new Worker('worker.js', {
    type: 'module'
});

statusEl.textContent = 'در حال بارگذاری مدل... ⏳';

worker.postMessage({
    type: 'load'
});

worker.onmessage = (event) => {

    if (event.data.type === 'ready') {
        statusEl.textContent = 'مدل آماده است ✅';
        btn.disabled = false;
    }

    if (event.data.type === 'result') {
        outputEl.textContent = event.data.text;
        statusEl.textContent = 'خلاصه آماده شد ✅';
        btn.disabled = false;
    }

    if (event.data.type === 'error') {
        statusEl.textContent = 'خطا: ' + event.data.message;
        btn.disabled = false;
    }
};

btn.disabled = true;

btn.addEventListener('click', () => {

    const text = document.querySelector('#input').value.trim();

    if (!text) {
        statusEl.textContent = 'لطفاً یک متن وارد کن!';
        return;
    }

    statusEl.textContent = 'در حال خلاصه‌سازی... ⏳';
    outputEl.textContent = '';

    btn.disabled = true;

    worker.postMessage({
        type: 'summarize',
        text: text
    });
});