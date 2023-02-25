import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./components/login";
import Signup from "./components/signup";
import LandingPage from "./components/landingPage";
import CreateRecipe from "./components/CreateRecipe";
import DetailsRecipe from "./components/DetailsRecipe";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/landingpage"
            element={
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/createrecipe"
            element={
              <ProtectedRoute>
                <CreateRecipe />
              </ProtectedRoute>
            }
          />
          <Route
            path="/detailsrecipe"
            element={
              <ProtectedRoute>
                <DetailsRecipe />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
