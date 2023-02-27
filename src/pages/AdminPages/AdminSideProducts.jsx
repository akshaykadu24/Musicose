import { useEffect, useState } from "react";
import "../AdminStyles/AdminSideProducts.css";

import loadingImg from "../AdminAssets/adminloading.gif"
import errorImg from "../AdminAssets/serverError.gif";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/adminReducer/admin.action";
import { Box, Heading, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import AdminMapProductBox from "./AdminMapProductBox";

const AdminSideProducts = () => {
  const dispatch = useDispatch();
  let [count,setCount] = useState(0)
  const {products,Loading,Error} = useSelector((store) => store.adminManager);
  
  useEffect(() => {
    // if (products.length === 0) {
      dispatch(getProducts());
    // }
  },[count]);

// console.log("1")
  useEffect(()=>{
    // console.log("2")

    dispatch(getProducts())
    // console.log("3")

  },[])
  
  console.log(products,"4")

  if(Loading){
    return(
      <div
            style={{
              display: "flex",
              justifyContent: "center",
              // position: "absolute",
              // zIndex: "10",
              width: "100%",
            }}
          >
        
      <div>
         <div style={{marginTop:"70px"}}>
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
      </div>
    )
  }
  if(Error){
    return(
      <div
            style={{
              display: "flex",
              justifyContent: "center",
              // border:"1px solid black",
              // position: "absolute",
              // zIndex: "10",
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
    )
  }


  return (
    <div>
      <Box  p={["20px","0px","2px","10px"]}  background={"#B2DAF1"} >
        <Heading >Musicose Product Items</Heading>
      </Box>
      <div >

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
                                  <AdminMapProductBox setCount={setCount}  key={el._id}  el={el}  />
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
