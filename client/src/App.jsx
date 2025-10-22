import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
