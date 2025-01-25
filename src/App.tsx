import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Books from "./pages/Books";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./config/firebase";
import Layout from "./components/Layout";
import LogIn from "./pages/Login";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        auth.currentUser
          ?.getIdToken()
          .then((token) => localStorage.setItem("token", token));
        setUser(user);
        return;
      }
      setUser(null);
      localStorage.removeItem("token");
    });
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route
            path="/books"
            element={
              <ProtectedRoute user={user}>
                <Books />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/book/:id" element={<></>}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
