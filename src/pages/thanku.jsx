import { Button } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';
import "./Styles/payment.css"

function Thanking() {
  return (
    <div className="thanks">
      <h1 className='msg'>Thank you for your order!</h1>
      <p className='par'>We have received your message and will send item as soon as possible.</p>
      <Link to={"/"}><Button fontWeight={"bold"} marginTop={"30px"} bg={"#e0a82e"}  color={"#181830"}>Continue</Button></Link>
    
    </div>
    
  );
  
}

export default Thanking