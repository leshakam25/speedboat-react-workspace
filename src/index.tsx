import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";
// import "i18n";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";

<<<<<<< HEAD
// dayjs.extend(relativeTime);
=======
import "i18n";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { store } from "store";

dayjs.extend(relativeTime);
>>>>>>> 0f040814afd9148d3562947f145ac67b18120b7a

const container = document.getElementById("root");
// eslint-disable-next-line
const root = createRoot(container!);
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <React.Suspense fallback="loading">
      <App />
    </React.Suspense>
=======
    <Provider store={store}>
      <React.Suspense fallback="loading">
        <App />
      </React.Suspense>
    </Provider>
>>>>>>> 0f040814afd9148d3562947f145ac67b18120b7a
  </React.StrictMode>
);
