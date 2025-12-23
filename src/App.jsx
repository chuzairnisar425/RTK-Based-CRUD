// src/App.jsx
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./App/store/store";
import AppRoutes from "./routes/Routes";
import ThemeProvider from "./components/ThemeProvider";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
