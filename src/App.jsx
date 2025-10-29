import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import Routes from "./Routes";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Routes />
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </GoogleOAuthProvider>
  );
}

export default App;
