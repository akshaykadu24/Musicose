import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login/Login";
// import About from "./About";
// import Contact from "./Contact";
import Home from "./Home";
// import Login from "./Login";
// import Signup from "./Signup";
// import SingleUser from "./SingleUser";
// import Users from "./Users";

const Mainroute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/contact" element={<Contact />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/users/:users_id" element={<SingleUser />}></Route> */}
      </Routes>
    </div>
  );
};

export default Mainroute;
