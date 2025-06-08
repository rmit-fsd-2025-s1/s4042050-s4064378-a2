// Import required React and third-party libraries
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";
import MainPage from "./pages/MainPage";

// Define base URL from environment variables
const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
// Log base URL for debugging purposes
console.log("BASE_URL", BASE_URL);

// Initialize Apollo Client for GraphQL operations
const client = new ApolloClient({
  uri: BASE_URL, // Set GraphQL server endpoint
  cache: new InMemoryCache(), // Initialize in-memory cache
});

// Main App component
function App() {
  return (
    // Wrap application with Apollo Provider for GraphQL functionality
    <ApolloProvider client={client}>
      {/* Set up browser routing */}
      <BrowserRouter>
        {/* Define route configuration */}
        <Routes>
          {/* Route for login page (default route) */}
          <Route path="/" element={<LoginPage />} />
          {/* Route for main dashboard page */}
          <Route path="/dashboard" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

// Export App component as default
export default App;
