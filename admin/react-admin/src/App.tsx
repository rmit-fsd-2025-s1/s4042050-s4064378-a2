import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";
import MainPage from "./pages/MainPage";

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
console.log("BASE_URL", BASE_URL)
const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<MainPage />} />
        </Routes>

      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
