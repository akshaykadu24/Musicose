import React from 'react';
import { Box } from "@chakra-ui/react";
import "./Styles/payment.css";

function About() {
  return (
    <Box>
      <div className="header">
        <h1 className="checkoutHead">Musicose</h1>
      </div>
      <div className="content">
        <h3 className="musicoseAbout">Musicose is an Indian Electronic manufacturing company we specializes in audio equipment. we offer an extensive product catalog that includes headphones, earphones, speakers, travel chargers, premium cables and Watches . Imagine Marketing Services Private Limited, operating under the name Musicose, is India's fastest-growing audio and wearables brand. we offer a wide range of high-quality wireless earphones, earbuds, headphones, smartwatches, and home audio products.</h3>
        <ul className="nameList">
          <li>Akshay Kadu (Team Lead)</li>
          <li>Preeti Bildani</li>
          <li>Revati Junghare</li>
          <li>Aakarsh Patel</li>
        </ul>
      </div>
    </Box>
  );
}

export default About;