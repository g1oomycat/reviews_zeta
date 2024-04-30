import React, { useEffect, useState } from "react";
import "./styles/main.scss";
import Worker from "./pages/worker/Worker";
import Authorization from "./pages/authorization/Authorization";
import Error from "./pages/error/Error";
import Protected from "./components/protected/Protected";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./pages/main/Main";
import { AnimatePresence } from "framer-motion";
import Gratitude from "./pages/gratitude/Gratitude";
import AddEmployee from "./pages/adminPanel/addEmployee/AddEmployee";
import Header from "./components/adminPanel/header/Header";
import Burger from "./components/adminPanel/burger/Burger";
import Analytics from "./pages/adminPanel/analytics/Analytics";
import Reviws from "./pages/adminPanel/reviws/Reviws";
import Employees from "./pages/adminPanel/employees/Employees";
import Places from "./pages/adminPanel/places/Places";

function App() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith("/admin_panel")) {
      document.documentElement.style.setProperty("--body-color", "black");
    }
  }, [location]);

  return (
    <main className="main">
      <AnimatePresence mode="wait">
        {location.pathname.startsWith("/admin_panel") && (
          <>
            <Header />
            <Burger />
          </>
        )}
        <Routes location={location} key={location.pathname}>
          <Route index element={<Main />} />
          <Route path="/reviw" element={<Error />} />
          <Route path="/reviw/:id" element={<Worker />} />
          <Route
            path="/reviw/gratitude/:grade/:place"
            element={<Gratitude />}
          />
          <Route path="/sign_in" element={<Authorization />} />
          <Route path="/admin_panel" element={<Protected />}>
            <Route path="/admin_panel/reviws" element={<Reviws />} />
            <Route path="/admin_panel/analytics" element={<Analytics />} />
            <Route path="/admin_panel/add-employee" element={<AddEmployee />} />
            <Route path="/admin_panel/employees" element={<Employees />} />
            <Route path="/admin_panel/places" element={<Places />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </AnimatePresence>
    </main>
  );
}

export default App;
