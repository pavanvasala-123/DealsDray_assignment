import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateEmployee from "./Components/CreateEmployee/CreateEmployee";
import EmployeeList from "./Components/EmployeeList/EmployeeList";
import Navbar from "./Components/Navbar/Navbar";
import SignupForm from "./Components/Signup/SignUp";
import SignInForm from "./Components/SignIn/SignIn";
import ProtectedRoute from "./Components/protectRoutes";

function App() {
  return (
    <div className="App">
       <Navbar/>
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/signup" element={<SignupForm />} />

        <Route
          path="/employee-list"
          element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-employee"
          element={
            <ProtectedRoute>
              <CreateEmployee/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/edit-employee"
          element={
            <ProtectedRoute>
              <CreateEmployee/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
