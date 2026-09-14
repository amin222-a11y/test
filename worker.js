import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.5.1/dist/transformers.min.js';

let summarizer = null;

self.onmessage = async (event) => {
    try {

        // بارگذاری مدل
        if (event.data.type === 'load') {

            summarizer = await pipeline(
                'summarization',
                'Xenova/distilbart-cnn-6-6'
            );

            self.postMessage({
                type: 'ready'
            });

            return;
        }

        // خلاصه کردن متن
        if (event.data.type === 'summarize') {

            if (!summarizer) {
                throw new Error('مدل هنوز آماده نشده است.');
            }

            const result = await summarizer(
                event.data.text,
                {
                    max_new_tokens: 60
                }
            );

            self.postMessage({
                type: 'result',
                text: result[0].summary_text
            });

            return;
        }

    } catch (error) {

        self.postMessage({
            type: 'error',
            message: error.message
        });

    }
};