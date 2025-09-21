import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoute";
import LoginButtonn from "./components/loginButton";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<LoginButtonn />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
