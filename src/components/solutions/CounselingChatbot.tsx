import React, { useEffect } from 'react';

const CounselingChatbot: React.FC = () => {
    useEffect(() => {
        // Cleanup function specific to counseling widget
        const cleanupWidget = () => {
            const script = document.getElementById('chatbot-widget-counseling');
            if (script) script.remove();

            const widgetElements = document.querySelectorAll('[id*="chatbot-widget-counseling"], [widget-id="68f8b297f808964e89c78957"]');
            widgetElements.forEach(el => el.remove());

            const iframes = document.querySelectorAll('iframe[src*="leadconnectorhq.com"]');
            iframes.forEach(iframe => {
                if (iframe.getAttribute('src')?.includes('68f8b297f808964e89c78957')) {
                    iframe.remove();
                }
            });
        };

        // Initial cleanup
        cleanupWidget();

        // Small delay before loading new widget
        const timer = setTimeout(() => {
            const existingScript = document.getElementById('chatbot-widget-counseling');

            if (!existingScript) {
                const script = document.createElement('script');
                script.src = "https://beta.leadconnectorhq.com/loader.js";
                script.setAttribute('data-resources-url', 'https://beta.leadconnectorhq.com/chat-widget/loader.js');
                script.setAttribute('data-widget-id', '68f8b297f808964e89c78957');
                script.id = 'chatbot-widget-counseling';
                document.body.appendChild(script);
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            cleanupWidget();
        };
    }, []);

    return null;
};

export default CounselingChatbot;
