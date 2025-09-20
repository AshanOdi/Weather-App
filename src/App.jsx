import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import LoginButton from "./components/loginButton";
import LogoutButton from "./components/logoutButton";

function App() {
  return (
    // <BrowserRouter>
    //   <div>
    //     <Toaster position="top-right" />
    //     <Routes path="/*">
    //       <Route path="/" element={<HomePage />} />
    //       <Route path="/login" element={<LoginPage />} />
    //     </Routes>
    //   </div>
    // </BrowserRouter>

    <main className="column">
      <h1>Auth Login</h1>
      <LoginButton />
      <LogoutButton />
    </main>
  );
}

export default App;
