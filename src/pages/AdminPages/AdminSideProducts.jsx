import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import "../AdminStyles/AdminSideProducts.css";
import { getProducts } from "../../redux/adminReducer/action";
import { AdminSideNavbar } from "../AdminPages/AdminSideNavbar";
import { AdminSideSingleProductPage } from "./AdminSideSingleProductPage";
import error from "../AdminAssets/serverError.gif";

const AdminSideProducts = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((store) => store.adminReducer.products);
//   const Loading = useSelector((store) => store.adminReducer.isLoading);
//   const IsError = useSelector((store) => store.adminReducer.isError);

//   useEffect(() => {
//     if (products.length === 0) {
//       dispatch(getProducts());
//     }
//   }, [products.length, dispatch]);

  return (
    <div>
      <div>
        <div className="product_heading">Musicose Product Items</div>
      </div>
      <div className="adminProductContainer">
        <div>
          <AdminSideNavbar />
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
                // src={loading}
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

        {IsError ? (
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
                src={error}
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

export { AdminSideProducts };
