import React, { useEffect } from 'react';

const IndependentLivingChatbot: React.FC = () => {
    useEffect(() => {
        // Cleanup function specific to independent living widget
        const cleanupWidget = () => {
            const script = document.getElementById('chatbot-widget-independent-living');
            if (script) script.remove();

            const widgetElements = document.querySelectorAll('[id*="chatbot-widget-independent-living"], [widget-id="68f8a324852364acc763d7ff"]');
            widgetElements.forEach(el => el.remove());

            const iframes = document.querySelectorAll('iframe[src*="leadconnectorhq.com"]');
            iframes.forEach(iframe => {
                if (iframe.getAttribute('src')?.includes('68f8a324852364acc763d7ff')) {
                    iframe.remove();
                }
            });
        };

        // Initial cleanup
        cleanupWidget();

        // Small delay before loading new widget
        const timer = setTimeout(() => {
            const existingScript = document.getElementById('chatbot-widget-independent-living');

            if (!existingScript) {
                const script = document.createElement('script');
                script.src = "https://beta.leadconnectorhq.com/loader.js";
                script.setAttribute('data-resources-url', 'https://beta.leadconnectorhq.com/chat-widget/loader.js');
                script.setAttribute('data-widget-id', '68f8a324852364acc763d7ff');
                script.id = 'chatbot-widget-independent-living';
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

export default IndependentLivingChatbot;
