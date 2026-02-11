import React, { useEffect } from 'react';

const ChatbotWidget: React.FC = () => {
    useEffect(() => {
        // Cleanup function to remove widget elements
        const cleanupWidget = () => {
            // Remove script
            const script = document.getElementById('chatbot-widget-default');
            if (script && script.parentNode) script.parentNode.removeChild(script);

            // Remove widget DOM elements
            const widgetElements = document.querySelectorAll('[id*="chatbot-widget-default"], .lc_text-widget, [widget-id="68f855979c559c95faa24533"]');
            widgetElements.forEach(el => el.remove());

            // Remove any related iframes
            const iframes = document.querySelectorAll('iframe[src*="leadconnectorhq.com"]');
            iframes.forEach(iframe => {
                if (iframe.getAttribute('src')?.includes('68f855979c559c95faa24533')) {
                    iframe.remove();
                }
            });
        };

        // Small delay to ensure cleanup completed
        const timer = setTimeout(() => {
            const existingScript = document.getElementById('chatbot-widget-default');

            if (!existingScript) {
                const script = document.createElement('script');
                script.src = "https://beta.leadconnectorhq.com/loader.js";
                script.setAttribute('data-resources-url', 'https://beta.leadconnectorhq.com/chat-widget/loader.js');
                script.setAttribute('data-widget-id', '68f855979c559c95faa24533');
                script.id = 'chatbot-widget-default';
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

export default ChatbotWidget;
