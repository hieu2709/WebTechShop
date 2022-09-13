// @ts-ignore
import path from "path";
import { defineConfig, loadEnv, UserConfigExport } from "vite";
import react from "@vitejs/plugin-react";
import { AntdResolve, createStyleImportPlugin } from "vite-plugin-style-import";
import { visualizer } from "rollup-plugin-visualizer";
import svgr from "@honkhonk/vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const plugins: any[] = [react(), svgr()];
    const alias = {
        "@": path.resolve(__dirname, "./src"),
    };
    if (mode === "production") {
        plugins.push(
            createStyleImportPlugin({
                resolves: [AntdResolve()],
            })
        );
        plugins.push(visualizer());

        alias["antd/dist/antd.less"] = path.resolve(__dirname, "./src/styles/antd.less");
    }

    const config: UserConfigExport = {
        plugins: plugins,
        resolve: { alias },
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        "primary-color": "#0029FF",
                        "body-background": "#F9F9F9",
                        "font-family":
                            '"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        "border-radius-base": "8px",
                        "checkbox-border-radius": "2px",
                        "border-color-base": "#CCCCCC",
                        "height-base": "40px",
                        "height-lg": "48px",
                        "height-sm": "32px",
                        "table-border-color": "#EEEEEE",
                        "table-padding-vertical": "8px",
                        "table-padding-horizontal": "8px",
                        "table-header-color": "#666666",
                        "table-header-bg": "#f9f9f9",
                        "table-header-cell-split-color": "transparent",
                        "modal-header-padding": "16px",
                        "modal-header-title-line-height": "32px",
                        "modal-header-close-size": "64px",
                        "modal-header-border-width": 0,
                        "modal-body-padding": "16px",
                        "modal-footer-border-width": 0,
                        "form-item-margin-bottom": "16px",
                    },
                    javascriptEnabled: true,
                },
            },
        },
    };

    const env = loadEnv(mode, process.cwd(), "CONFIG_");
    if (env.CONFIG_USE_POLLING === "true") {
        config.server = {
            watch: {
                usePolling: true,
            },
        };
    }

    return config;
});
