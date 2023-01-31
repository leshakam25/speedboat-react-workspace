import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { store } from "store";

dayjs.extend(relativeTime);

const container = document.getElementById("root");
// eslint-disable-next-line
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <React.Suspense fallback="loading">
        <App />
      </React.Suspense>
    </Provider>
  </React.StrictMode>
);
