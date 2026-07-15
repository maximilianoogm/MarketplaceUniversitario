import { useEffect } from 'react';


const ChatwootWidget = ({ vendedorId, productoId, productoTitulo }) => {

    const identificarVendedor = () => {
        if (window.$chatwoot) {
            if (vendedorId) {
                window.$chatwoot.setConversationCustomAttributes({
                    vendedorId: String(vendedorId),
                    productoId: String(productoId ?? ""),
                    producto: productoTitulo ?? "",
                    contextoChat: "CompraVenta"
                });
            } else {
                window.$chatwoot.setConversationCustomAttributes({
                    vendedorId: "Soporte",
                    productoId: "General",
                    producto: "Ninguno",
                    contextoChat: "SoporteGeneral"
                });
            }
        }
    };

    useEffect(() => {
        window.chatwootSettings = {
            hideMessageBubble: false,
            position: 'right',
            locale: 'es',
            type: 'expanded',
            darkMode: 'auto',
            theme: 'neon',
            launcherTitle: vendedorId ? 'Preguntar al vendedor' : 'Soporte UniMarket',
        };

        if (window.chatwootSDK) {
            identificarVendedor();
            return;
        }

        (function (d, t) {
            var BASE_URL = "https://app.chatwoot.com";
            var g = d.createElement(t);
            g.src = BASE_URL + "/packs/js/sdk.js";
            g.async = true;
            
            d.body.appendChild(g);

            g.onload = function () {
                window.chatwootSDK.run({
                    websiteToken: 'E8rcDiac5UiQ5DKqHgzEgro1',
                    baseUrl: BASE_URL
                });
            }
        })(document, "script");

        window.addEventListener("chatwoot:ready", identificarVendedor);

        return () => {
            window.removeEventListener("chatwoot:ready", identificarVendedor);
            
            if (window.$chatwoot) {
                window.$chatwoot.setConversationCustomAttributes({
                    vendedorId: "Desconectado",
                    productoId: "",
                    producto: ""
                });
            }
        };
    }, [vendedorId, productoId, productoTitulo]);

    return null;
};

export default ChatwootWidget;