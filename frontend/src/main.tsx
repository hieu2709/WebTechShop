import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "@/store";
import "antd/dist/antd.less";
import { ConfigProvider } from "antd";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            {/*<ConfigProvider autoInsertSpaceInButton={false}>*/}
            <App />
            {/*</ConfigProvider>*/}
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
