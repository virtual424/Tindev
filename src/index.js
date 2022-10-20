import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      appId="0d92wvajPOZQPTtCqYCW29aIZcrfBZ4BbT0OrcpW"
      serverUrl="https://7ic1t1e5wwak.grandmoralis.com:2053/server"
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
