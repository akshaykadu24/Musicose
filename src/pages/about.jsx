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
        <h3 className="musicoseAbout">Musicose is an Indian Electronic manufacturing company we specializes in audio equipment. we offer an extensive product catalog that includes headphones, earphones, speakers, earbuds and Watches . Musicose is India's fastest-growing audio and wearables brand. we offer a wide range of high-quality wireless earphones, earbuds, headphones, smartwatches, and home audio products.</h3>
        <h3 className="musicoseAbout"> We have done a partnership with the smartwatch brand of owner tony, now on our website smartwatches are also available in premium and affordable price range </h3>
        <ul className="nameList">
          <li >Akshay Kadu (Team Lead)</li>
          <li>Preeti Bildani</li>
          <li>Revati Junghare</li>
          <li>Aakarsh Patel</li>
        </ul>
      </div>
    </Box>
  );
}

export default About;