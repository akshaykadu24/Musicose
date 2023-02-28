import React from "react";
import Carousel from "../components/Carousel";
import { Dailydeals } from "../components/Dailydeals";
import Footer from "../components/Footer";
import Gifcarousel from "../components/Gifcarousel";
import Gifs from "../components/Gifs";
import Landingcarousel from "../components/Landingcarousel";
// import Carousal1 from "../components/Carousal1";

// import { Dailydeals } from "../components/Dailydeals";
// import Header from "../components/Header";
// import { Dailydeals } from "../components/Dailydeals";

import styles from "./Styles/warranty.module.css";

const Home = () => {
  return (
    <div>
      {/* <Header />; */}
      <div className={styles.main}>
        <div className={styles.subMain}>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/promise_icon_2_small.png?v=1663586590"
            alt="promise"
            className={styles.warranty}
          />
          <h4 className={styles.year}>
            1 YEAR <br /> WARRANTY
          </h4>
        </div>
        <div className={styles.subMain}>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/promise_icon_3_small.png?v=1663586612"
            alt="promise"
            className={styles.warranty}
          />
          <h4 className={styles.year}>
            FREE 7 DAYS <br /> REPLACEMENT
          </h4>
        </div>
        <div className={styles.subMain}>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/promise_icon_1_small.png?v=1663586576"
            alt="promise"
            className={styles.warranty}
          />
          <h4 className={styles.year}>
            FREE <br /> SHIPPING
          </h4>
        </div>
        <div className={styles.subMain}>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/promise_icon_4_small.png?v=1663586627"
            alt="promise"
            className={styles.warranty}
          />
          <h4 className={styles.year}>
            SECURE <br /> CHECKOUT
          </h4>
        </div>
        <div className={styles.subMain}>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/icon-black-v1_small.png?v=1661245767"
            alt="promise"
            className={styles.warranty}
          />
          <h4 className={styles.year}>
            GST <br /> BILLING
          </h4>
        </div>
      </div>
      <Carousel />

      {/* <Dailydeals /> */}
      <Dailydeals />
      <Landingcarousel />
      <div className={styles.shopByCategory}>
        <h3 className={styles.shop}>Shop By Category</h3>
        <div className={styles.sub_div}>
          <div className={styles.wireless}>
            <p>Wireless Earphones</p>
            <img
              src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Airdopes_06c1d467-6060-4e4d-9116-edf9ce9155a7_small.png?v=1674041615"
              alt="wireless"
              className={styles.wire}
            />
          </div>
          <div className={styles.wireless}>
            <p>Neckbands</p>
            <img
              src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Neckbands_06214c1a-5e30-48ea-ac14-4a6bff679f48_small.png?v=1674126581"
              alt="wireless"
              className={styles.wire}
            />
          </div>
          <div className={styles.wireless}>
            <p>Smart Watches</p>
            <img
              src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Smartwatch_96457e1e-dfc6-4818-b6f1-a9a7130d018c_small.png?v=1674127383"
              alt="wireless"
              className={styles.wire}
            />
          </div>
          <div className={styles.wireless}>
            <p>Wireless Headphones</p>
            <img
              src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Rockerz_6c017fdd-66fd-4d00-a1c9-5fd3f8536ee1_small.png?v=1674041615"
              alt="wireless"
              className={styles.wire}
            />
          </div>
          <div className={styles.wireless}>
            <p>Wireless Speaker</p>
            <img
              src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Stone_1321db16-d197-40bd-be00-d165868168eb_small.png?v=1674126200"
              alt="wireless"
              className={styles.wire}
            />
          </div>
          <div className={styles.wireless}>
            <p>Wired Headphones</p>
            <img
              src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Airdopes_06c1d467-6060-4e4d-9116-edf9ce9155a7_small.png?v=1674041615"
              alt="wireless"
              className={styles.wire}
            />
          </div>
          <div className={styles.wireless}>
            <p>Wired Earphones</p>
            <img
              src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Airdopes_06c1d467-6060-4e4d-9116-edf9ce9155a7_small.png?v=1674041615"
              alt="wireless"
              className={styles.wire}
            />
          </div>
        </div>
        <div className={styles.sub_div}>
        <div className={styles.wireless}>
          <p>Soundbars</p>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/aavante-bar_small.png?v=1674041615"
            alt="wireless"
            className={styles.wire}
          />
        </div>
        <div className={styles.wireless}>
          <p>Gaming Headphones</p>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Immortals_dbb4a363-0799-44e3-8b67-a275b092c501_small.png?v=1674041615"
            alt="wireless"
            className={styles.wire}
          />
        </div>
        
        <div className={styles.wireless}>
          <p>Party Speakers</p>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/sound_bar_4f111a6a-2482-41c8-87f2-db7e0ee19e69_small.webp?v=1674041615"
            alt="wireless"
            className={styles.wire}
          />
        </div>
        <div className={styles.wireless}>
          <p>Trimmers</p>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/misfit_3b8fc3eb-52d6-4519-824f-22873770f747_small.png?v=1674041616"
            alt="wireless"
            className={styles.wire}
          />
        </div>
        <div className={styles.wireless}>
          <p>Chargers</p>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Charger_small.png?v=1674041615"
            alt="wireless"
            className={styles.wire}
          />
        </div>
        <div className={styles.wireless}>
          <p>Powerbanks</p>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/powerbank_small.png?v=1674126228"
            alt="wireless"
            className={styles.wire}
          />
        </div>
        <div className={styles.wireless}>
          <p>Cables</p>
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/cables_cd468fe0-9b41-4eef-b686-0785c6478534_small.png?v=1674041615"
            alt="wireless"
            className={styles.wire}
          />
        </div>
      </div>
      <div className={styles.sub_div}>
      <div className={styles.wireless}>
        <p>Car Accessories</p>
        <img
          src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Car-accessories_07e4e533-2b59-4597-aa3f-110552541f0f_small.png?v=1674041615"
          alt="wireless"
          className={styles.wire}
        />
      </div>
      <div className={styles.wireless}>
        <p>TRebel Range</p>
        <img
          src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Trebel_small.png?v=1674126241"
          alt="wireless"
          className={styles.wire}
        />
      </div>
      
      <div className={styles.wireless}>
        <p>Limited Editions</p>
        <img
          src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/limited-edition_small.png?v=1674126214"
          alt="wireless"
          className={styles.wire}
        />
      </div>
      <div className={styles.wireless}>
        <p>View All </p>
        <img
          src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/logo123_171ada23-0c67-477b-84d1-21fe1bad3909_small.png?v=1674022741"
          alt="wireless"
          className={styles.wire}
        />
      </div>
      
    </div>
      </div>
      <Gifcarousel />
      <Gifs />
      <Dailydeals />
    </div>
  );
};

export default Home;
