// worker.js
import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.5.1/dist/transformers.min.js';

let summarizer = null;

self.onmessage = async (event) => {
    if (event.data.type === 'load') {
        summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6');
        self.postMessage({ type: 'ready' });
    }
    if (event.data.type === 'summarize') {
        const result = await summarizer(event.data.text, { max_new_tokens: 60 });
        self.postMessage({ type: 'result', text: result[0].summary_text });
    }
};