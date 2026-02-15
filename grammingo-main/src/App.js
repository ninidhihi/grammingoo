import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import Login from "./pages/login";
import ForgetPassword from "./pages/ForgetPassword";
import AnimatedCursor from "react-animated-cursor";
import Feedback from "./pages/Feedback";
import Agent from "./components/Agent/Agent";
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: #7c2214;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

function App() {
  return (
    <Router>
        <ScrollToTop />
        <AppContainer>
          <Navbar />
          <AnimatedCursor
            innerSize={20}
            outerSize={20}
            color="104, 225, 239"
            outerAlpha={0.2}
            innerScale={0.7}
            outerScale={5}
          />
          <ToastContainer position="top-right" autoClose={3000} />
          <ContentContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/agent" element={<Agent />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/home" element={<Home />} />
              <Route path="/feedback" element={<Feedback />} />
            </Routes>
          </ContentContainer>
          <Footer />
        </AppContainer>
      </Router>
  );
}

export default App;
