import { useEffect } from "react";
import { Box, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/payment.css";
import { useState } from "react";

const OTPGenerator = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleOtp = () => {
    if (otp === "") {
      toast({
        title: `Please Enter Your OTP`,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else {
      toast({
        title: `Ordered Successfully`,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  useEffect(() => {
    const randomOtp = Math.floor(Math.random() * 90000) + 10000;
    setOtp(randomOtp.toString());
    toast({
      title: `Your OTP is ${randomOtp}`,
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  }, [toast]);

  return (
    <Box className="backgroundColorOtp">
      <Box className="checkoutDiv">
        <Box className="checkoutHeadDiv">
          <h2 className="checkoutHead">Enter OTP</h2>
        </Box>
        <input
          type="text"
          placeholder="Enter Your Otp here..."
          value={otp}
          id="otp"
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <Link to={"/"}>
        <button onClick={handleOtp} className="checkoutBtn">
          Submit
        </button>
        </Link>
      </Box>
    </Box>
  );
};

export default OTPGenerator;
