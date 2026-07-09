import { useEffect } from 'react';

const ChatwootWidget = () => {
    useEffect(() => {
        if (window.chatwootSettings) return;

        window.chatwootSettings = {
            hideMessageBubble: false,
            position: 'right', 
            locale: 'es',      
            type: 'expanded',  
            darkMode: 'auto',  
            theme: 'neon', 
            launcherTitle: 'Contactar al vendedor', 
        };

        (function (d, t) {
            var BASE_URL = "https://app.chatwoot.com";
            var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
            g.src = BASE_URL + "/packs/js/sdk.js";
            g.async = true;
            s.parentNode.insertBefore(g, s);
            g.onload = function () {
                window.chatwootSDK.run({
                    websiteToken: 'E8rcDiac5UiQ5DKqHgzEgro1', 
                    baseUrl: BASE_URL
                });

                // =======================================================
                // CORRECCIÓN P3: Eliminamos la referencia a productoActual
                // Esto evita el ReferenceError y permite que el chat inicie limpio
                // =======================================================
                if (window.$chatwoot) {
                    // Inicialización segura del SDK global sin romper la consola
                }
            }
        })(document, "script");
    }, []);

    return null; 
};

export default ChatwootWidget;