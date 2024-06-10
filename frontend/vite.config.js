import { defineConfig } from "vite";
import {resolve} from "path";

export default defineConfig({
    build:{
        rollupOptions:{
            input:{
                main: resolve(__dirname,"index.html"),
                login: resolve(__dirname,"login.html"),
                register: resolve(__dirname,"register.html"),
                shop: resolve(__dirname,"shop.html"),
                placeOrder: resolve(__dirname,"placeOrder.html"),
                addToCart: resolve(__dirname,"addToCart.html"),
            }
        }
    }
})