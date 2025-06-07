import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";
import MainPage from "./pages/MainPage";
import CandidatesByCourse from "./pages/reports/CandidatesByCourse";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<MainPage />} />
          <Route path="/reports/candidates-by-course" element={<CandidatesByCourse />} />
        </Routes>

      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
