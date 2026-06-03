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
                })

                if (window.$chatwoot && productoActual) {
                    window.$chatwoot.setCustomAttributes({
                        producto_interes: productoActual.titulo,
                        precio_producto: productoActual.precio,
                        id_vendedor: productoActual.vendedorId 
                    });
                }
            }
            })(document, "script");
    }, []);

    return null; 
};

export default ChatwootWidget;