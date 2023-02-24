import { useEffect } from "react";
import "../AdminStyles/AdminSideProducts.css";
import { AdminSideNavbar } from "../AdminPages/AdminSideNavbar";
import { AdminSideSingleProductPage } from "./AdminSideSingleProductPage";

import loadingImg from "../AdminAssets/adminloading.gif"
import errorImg from "../AdminAssets/serverError.gif";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/adminReducer/admin.action";

const AdminSideProducts = () => {
  const dispatch = useDispatch();
  const {products,Loading,Error} = useSelector((store) => store.adminManager);

//   useEffect(() => {
//     if (products.length === 0) {
//       dispatch(getProducts());
//     }
//   }, [products.length, dispatch]);

  useEffect(()=>{
    dispatch(getProducts())

  },[])
  console.log(products)

  return (
    <div>
      <div>
        <div className="product_heading">Musicose Product Items</div>
      </div>
      <div className="adminProductContainer">
        <div>
          {/* <AdminSideNavbar /> */}
        </div>
        {Loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              zIndex: "10",
              width: "100%",
            }}
          >
            <div>
              <img
                style={{
                  width: "50%",
                  margin: "auto",
                }}
                src={loadingImg}
                alt="loading..."
              />
              <h1
                style={{
                  fontWeight: "bold",
                  fontSize: "100%",
                  color: "blue",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "150%",
                }}
              >
                Please wait products are loading...
              </h1>
            </div>
          </div>
        ) : (
          <></>
        )}

        {Error ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              // border:"1px solid black",
              position: "absolute",
              zIndex: "10",
              width: "100%",
            }}
          >
            <div>
              <img
                style={{
                  width: "50%",
                  margin: "auto",
                }}
                src={errorImg}
                alt="Server error...!"
              />
              <h1
                style={{
                  fontWeight: "bold",
                  fontSize: "100%",
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "150%",
                }}
              >
                Server Error! 503
              </h1>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="admin_products_grid_container">
          {products.length ? (
            products.map((item) => {
              return (
                <AdminSideSingleProductPage
                  id={item._id}
                  title={item.product_item_meta__title}
                  Image={item.product_item__primary_image}
                  Image2={item.product_item__secondary_image}
                  price={item.price}
                  price2={item.price2}
                  category={item.category}
                  offers={item.offers}
                  mrp={item.mrp}
                  feature={item.feature}
                  feature2={item.feature2}
                  feature3={item.feature3}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export  default AdminSideProducts ;
