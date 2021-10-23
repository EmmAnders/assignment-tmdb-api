import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ContextProvider from "./contexts/Context";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryParamProvider } from "use-query-params";

import "./index.css";
import App from "./App";
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <ContextProvider>
            <App />
          </ContextProvider>
        </QueryParamProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
