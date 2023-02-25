import { useEffect } from "react";
import "../AdminStyles/AdminSideProducts.css";

import loadingImg from "../AdminAssets/adminloading.gif"
import errorImg from "../AdminAssets/serverError.gif";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/adminReducer/admin.action";
import { Heading, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import AdminMapProductBox from "./AdminMapProductBox";

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
      <div >
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
        <div >
                <Table  >
                  <Thead>
                    <Tr>
                      <Th><Heading size={["xs","md"]}>Image</Heading></Th>
                      <Th><Heading size={["xs","md"]}>Title</Heading></Th>
                      <Th><Heading size={["xs","md"]}>Offer Price</Heading></Th>
                      <Th><Heading size={["xs","md"]}>MRP Price</Heading></Th>
                      <Th><Heading size={["xs","md"]}>Category</Heading></Th>
                      <Th><Heading size={["xs","md"]}>Feature</Heading></Th>
                      <Th><Heading size={["xs","md"]}  >UPDATE</Heading></Th>
                      <Th><Heading size={["xs","md"]}  >DELETE</Heading></Th>

                    </Tr>
                  </Thead>
                  <Tbody>
                      {products.length ? (
                        products.map((el) => {
                          return (
                                  <AdminMapProductBox  key={el._id}  el={el}  />
                          );
                        })) : (
                            <>No Data available</>
                        )}
                  </Tbody>
                  </Table>  
        </div>
      </div>
    </div>
  );
};

export  default AdminSideProducts ;
