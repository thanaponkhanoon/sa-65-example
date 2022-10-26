import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import Equipments from "./components/Equipments";
import Home from "./components/home";
import EquipmentCreate from "./components/EquipmentCreate";

export default function App() {
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  if (!token) {
    return <SignIn />;
  }

  return (

    <Router>

      <div>

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipment" element={<Equipments />} />
          <Route path="/equipment/create" element={<EquipmentCreate />} />
        </Routes>

      </div>

    </Router>

  );

}