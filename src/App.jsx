import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return;
  <BrowserRouter>
    <div>
      <Toaster position="top-right" />
      <Routes path="/*">
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  </BrowserRouter>;
}

export default App;
