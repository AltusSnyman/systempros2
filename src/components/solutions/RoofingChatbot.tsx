import React, { useEffect } from 'react';

const RoofingChatbot: React.FC = () => {
    useEffect(() => {
        // Cleanup function specific to roofing widget
        const cleanupRoofingWidget = () => {
            const script = document.getElementById('chatbot-widget-roofing');
            if (script) script.remove();

            const widgetElements = document.querySelectorAll('[id*="chatbot-widget-roofing"], [widget-id="68f820377cda2872e1511834"]');
            widgetElements.forEach(el => el.remove());

            const iframes = document.querySelectorAll('iframe[src*="leadconnectorhq.com"]');
            iframes.forEach(iframe => {
                if (iframe.getAttribute('src')?.includes('68f820377cda2872e1511834')) {
                    iframe.remove();
                }
            });
        };

        // Initial cleanup
        cleanupRoofingWidget();

        // Small delay before loading new widget
        const timer = setTimeout(() => {
            const existingScript = document.getElementById('chatbot-widget-roofing');

            if (!existingScript) {
                const script = document.createElement('script');
                script.src = "https://beta.leadconnectorhq.com/loader.js";
                script.setAttribute('data-resources-url', 'https://beta.leadconnectorhq.com/chat-widget/loader.js');
                script.setAttribute('data-widget-id', '68f820377cda2872e1511834');
                script.id = 'chatbot-widget-roofing';
                document.body.appendChild(script);
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            cleanupRoofingWidget();
        };
    }, []);

    return null;
};

export default RoofingChatbot;
