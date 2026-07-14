import { useEffect } from 'react';

// Recibe los datos del producto/vendedor actual para enlazar la conversación
// con el vendedor exacto de ese anuncio (se distingue por vendedorId).
const ChatwootWidget = ({ vendedorId, productoId, productoTitulo }) => {

    // Le dice a Chatwoot con quién y sobre qué producto es la conversación
    const identificarVendedor = () => {
        if (window.$chatwoot) {
            window.$chatwoot.setConversationCustomAttributes({
                vendedorId: String(vendedorId ?? ""),
                productoId: String(productoId ?? ""),
                producto: productoTitulo ?? "",
            });
        }
    };

    useEffect(() => {
        // Si el script de Chatwoot ya fue cargado antes (el usuario navegó
        // de un producto a otro), solo actualizamos los datos del vendedor.
        if (window.chatwootSDK) {
            identificarVendedor();
            return;
        }

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
            }
        })(document, "script");

        // Chatwoot dispara este evento cuando el widget ya terminó de cargar
        window.addEventListener("chatwoot:ready", identificarVendedor);

        return () => window.removeEventListener("chatwoot:ready", identificarVendedor);
    }, [vendedorId, productoId, productoTitulo]);

    return null;
};

export default ChatwootWidget;