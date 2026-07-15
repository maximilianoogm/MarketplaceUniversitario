import { useEffect } from 'react';

// Recibe los datos del producto/vendedor actual para enlazar la conversación
// con el vendedor exacto de ese anuncio (se distingue por vendedorId).
const ChatwootWidget = ({ vendedorId, productoId, productoTitulo }) => {

    // Le dice a Chatwoot con quién y sobre qué producto es la conversación
    const identificarVendedor = () => {
        if (window.$chatwoot) {
            if (vendedorId) {
                // 1. Si estamos en la página de un producto, enviamos los datos del vendedor actual
                window.$chatwoot.setConversationCustomAttributes({
                    vendedorId: String(vendedorId),
                    productoId: String(productoId ?? ""),
                    producto: productoTitulo ?? "",
                    contextoChat: "CompraVenta"
                });
                console.log(`📡 Chatwoot configurado para el vendedor ID: ${vendedorId} (${productoTitulo})`);
            } else {
                // 2. Si salimos de la página de un producto, reseteamos los atributos para soporte general
                window.$chatwoot.setConversationCustomAttributes({
                    vendedorId: "Soporte",
                    productoId: "General",
                    producto: "Ninguno",
                    contextoChat: "SoporteGeneral"
                });
                console.log("📡 Chatwoot reconfigurado a modo Soporte General de UniMarket");
            }
        }
    };

    useEffect(() => {
        // Configuraciones dinámicas de interfaz según tengamos vendedorId o no
        window.chatwootSettings = {
            hideMessageBubble: false,
            position: 'right',
            locale: 'es',
            type: 'expanded',
            darkMode: 'auto',
            theme: 'neon',
            launcherTitle: vendedorId ? 'Preguntar al vendedor' : 'Soporte UniMarket',
        };

        // Si el script de Chatwoot ya fue cargado (el usuario navegó), solo actualizamos los datos
        if (window.chatwootSDK) {
            identificarVendedor();
            return;
        }

        // Carga segura del SDK insertando en el body
        (function (d, t) {
            var BASE_URL = "https://app.chatwoot.com";
            var g = d.createElement(t);
            g.src = BASE_URL + "/packs/js/sdk.js";
            g.async = true;
            
            // ── SOLUCIÓN AQUÍ: Insertamos directamente al final del <body> de forma 100% segura ──
            d.body.appendChild(g);

            g.onload = function () {
                window.chatwootSDK.run({
                    websiteToken: 'E8rcDiac5UiQ5DKqHgzEgro1',
                    baseUrl: BASE_URL
                });
            }
        })(document, "script");

        // Escucha cuando Chatwoot esté listo
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