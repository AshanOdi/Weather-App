import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoute";
import LoginPage from "./pages/loginPage";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgb(15 23 42 / 0.9)",
            color: "white",
            border: "1px solid rgb(255 255 255 / 0.15)",
            backdropFilter: "blur(12px)",
            borderRadius: "9999px",
            fontSize: "14px",
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
