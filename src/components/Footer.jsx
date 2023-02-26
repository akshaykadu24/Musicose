import React from "react";
import "./footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
// import logo from "./logo.gif";

const Footer = () => {
  return (
    <div style={{ marginTop: "15px" }}>
      <div className="disclaimer">
        <p className="disclaimerText">
          India's fastest growing audio & wearables brand. The most incredible
          range of wireless earphones, earbuds, headphones, smart watches, and
          home audio. From workouts to adventures, boAt will get you sailing!
        </p>
      </div>
      <div className="footer">
        <div className="flex firstFooterDiv">
          <div className="sendEmailBox">
            <div className="footerLogo">
              <img
                w="200px"
                height="70px"
                src={"musicose.png"}
                alt="musicose"
                borderRadius={10}
              />
            </div>
            <p className="subscribeText">
              Subscribe to email alerts. We promise not to spam your inbox.
            </p>
            <div className="footerInputDiv">
              <input
                type="text"
                className="footerInput"
                placeholder="Email Address*"
              />
              <button className="footerBtn">SUBSCRIBE</button>
            </div>
          </div>
          <div className="footerLinks">
            <div className="footerCol">
              <p className="linksHeader">SHOP</p>
              <div className="hideLinks">
                <p>True Wireless Earbuds</p>
                <p>Wireless Headphones</p>
                <p>Wired Headphones</p>
                <p>Wireless Speakers</p>
                <p>Home Audio</p>
                <p>Mobile Accessories</p>
                <p>Smart Watches</p>
              </div>
              <div></div>
            </div>
            <div className="footerCol">
              <p className="linksHeader">HELP</p>
              <div className="hideLinks">
                <p>Track Your Order</p>
                <p>Warranty & Support</p>
                <p>Return Policy</p>
                <p>Service Centers</p>
                <p>Bulk Orders</p>
                <p>FAQs</p>
                <p>Why Buy Direct</p>
              </div>
            </div>
            <div className="footerCol">
              <p className="linksHeader">COMPANY</p>
              <div className="hideLinks">
                <p>About boAt</p>
                <p>News</p>
                <p>Read Our Blog </p>
                <p>Careers</p>
                <p>Security</p>
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
                <p>Investor Relations</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="mediaLinks">
          <div className="fb">
            <FaFacebookF />
          </div>
          <div className="twi">
            <FaTwitter />
          </div>
          <div className="insta">
            <FaInstagram />
          </div>
          <div className="Yt">
            <FaYoutube />
          </div>
          <div className="LdIn">
            <FaLinkedinIn />
          </div>
        </div>
        <hr />
        <div className="midFooter">
          <div className="linksToStores">
            <h4 className="download">Download The App</h4>
            <img
              src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/google-play.png?v=1608620293"
              alt=""
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/app-store.png?v=1608620293"
              alt=""
            />
          </div>
          <div className="paymentsImages">
            <h4 className="download">We Accept</h4>
            <img
              className="imageSize"
              src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Fotter_payment_icn_2_900x_aff68517-98f4-4a82-9aee-2405cea66251_350x.png?v=1650262054"
              alt=""
            />
          </div>
        </div>
        <hr />
        <div className="copyright">
          <p>© 2022 Imagine Marketing Limited. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
