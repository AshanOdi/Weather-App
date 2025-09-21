import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoute";
import LoginPage from "./pages/loginPage";

function App() {
  return (
    <BrowserRouter>
      <div className=" w-full bg-yellow-500 min-h-screen bg-fixed   bg-cover  bg-[url('/back.jpg')]  flex flex-col justify-center items-center">
        <Toaster position="top-right" />
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
      </div>
    </BrowserRouter>
  );
}

export default App;
