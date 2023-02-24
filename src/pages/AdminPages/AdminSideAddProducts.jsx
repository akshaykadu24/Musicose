import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Select,
  useToast,
  Box,
} from "@chakra-ui/react";
import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct, getProducts } from "../../redux/adminReducer/action";
import "../AdminStyles/AdminSideAddProducts.css";
import { AdminSideNavbar } from "./AdminSideNavbar";


const initialProductState = {
  product_item_meta__title: "",
  product_item__primary_image: "",
  product_item__secondary_image: "",
  price: 300,
  price2: 400,
  caterogy: "",
  feature: "",
  feature2: "",
  feature3: "",
  isavailable: true,
  quantity: 0,
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "product_item_meta__title":
      return {
        ...state,
        product_item_meta__title: action.payload,
      };

   
      case "product_item__primary_image":
        return {
          ...state,
          product_item__primary_image: action.payload,
        };
        case "product_item__secondary_image":
      return {
        ...state,
        product_item__secondary_image: action.payload,
      };
    case "price":
      return {
        ...state,
        price: Number(action.payload),
      };


  const dispatch = useDispatch()
  let handleChange = (e)=>{
    const {name,value} = e.target

    setVal({...val,[name]:value})
  }
  // console.log(val)
  
  const handleSubmit =()=>{
    dispatch(addProduct(val))
    
  }
};

const AdminSideAddProducts = () => {
  const [productState, setProductState] = useReducer(
    productReducer,
    initialProductState
  );
  const dispatch = useDispatch();
  const toast = useToast();

  const addProductHandler = () => {
    dispatch(addProduct(productState))
      .then(() => dispatch(getProducts()))
      .then(() =>
        toast({
          title: "Product Added!",
          description: "We've added your product.",
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
          render: () => (
            <Box border="2px solid green" textAlign="center" borderRadius="10px" fontWeight="bolder" color="white" p={3} bg="blue.500" boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px">
              {`Product Successfully Added !`}
            </Box>
          ),
        })
      )
      .catch((err) =>
        toast({
          title: "Error!",
          description: "Something went wrong.",
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        })
      );
  };

  return (
    <div className="AdminSideProductAddContainer">
      <div className="admin_side_update_form_heading">
        Musicose Add Product Page
      </div>
      <div className="admin_side_form_box">
        <div>
          <AdminSideNavbar />
        </div>
        <div>
          <div className="adminSideProductAddBox">
            <FormControl
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
                margin: "auto",
              }}
              className="parendFormBox"
            >
              {/* product_item_meta__title: {type:String},
        product_item__primary_image: {type:String},
        product_item__secondary_image: {type:String},
        caterogy:{type:String},
        price: {type:String},
        price2: {type:String},
        feature: {type:String},
        feature2: {type:String},
        feature3: {type:String} */}
              <div className="productAddBox1">
                <FormLabel>title</FormLabel>
                <Input
                  placeholder="Enter Title"
                  value={productState.product_item_meta__title}
                  type="text"
                  onChange={(e) =>
                    setProductState({ type: "product_item_meta__title", payload: e.target.value })
                  }
                />

                <FormLabel>Image</FormLabel>
                <Input
                  placeholder="Enter image url"
                  type={URL}
                  value={productState.product_item__primary_image}
                  onChange={(e) =>
                    setProductState({ type: "product_item__primary_image", payload: e.target.value })
                  }
                />
                <FormLabel>Image2</FormLabel>
                <Input
                  placeholder="Enter image url"
                  type={URL}
                  value={productState.product_item__secondary_image}
                  onChange={(e) =>
                    setProductState({ type: "product_item__secondary_image", payload: e.target.value })
                  }
                />

               

                <FormLabel>Price</FormLabel>
                <Input
                  placeholder="Enter price"
                  value={productState.price}
                  type={Number}
                  onChange={(e) =>
                    setProductState({
                      type: "price",
                      payload: Number(e.target.value),
                    })
                  }
                />

                <FormLabel>Price</FormLabel>
                <Input
                  placeholder="Enter MRP"
                  value={productState.price2}
                  type={Number}
                  onChange={(e) =>
                    setProductState({
                      type: "price2",
                      payload: Number(e.target.value),
                    })
                  }
                />

                <FormLabel>Features</FormLabel>
                <Input
                  placeholder="Enter Features"
                  value={productState.feature}
                  type="text"
                  onChange={(e) =>
                    setProductState({ type: "feature", payload: e.target.value })
                  }
                />
                 <FormLabel>Features2</FormLabel>
                <Input
                  placeholder="Enter Features2"
                  value={productState.feature2}
                  type="text"
                  onChange={(e) =>
                    setProductState({ type: "feature2", payload: e.target.value })
                  }
                />
                <FormLabel>Features3</FormLabel>
                <Input
                  placeholder="Enter Features3"
                  value={productState.feature3}
                  type="text"
                  onChange={(e) =>
                    setProductState({ type: "feature3", payload: e.target.value })
                  }
                />
 
              </div>

              <div className="productAddBox2">
               
              
                <FormLabel>Available or not</FormLabel>
                <Select
                  placeholder="Select option"
                  value={productState.isavailable}
                  onChange={(e) =>
                    setProductState({
                      type: "isavailable",
                      payload: e.target.value === "true" ? true : false,
                    })
                  }
                >
                  <option value={true}>Available</option>
                  <option value={false}>Not Available</option>
                </Select>

                <FormLabel>Quantity</FormLabel>
                <Select
                  placeholder="Select option"
                  value={productState.quantity}
                  type={Number}
                  onChange={(e) =>
                    setProductState({
                      type: "quantity",
                      payload: Number(e.target.value),
                    })
                  }
                >
                  <option value={0}>Zero</option>
                  <option value={1}>One</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                  <option value={4}>Four</option>
                  <option value={5}>Five</option>
                  <option value={6}>Six</option>
                  <option value={7}>Sevel</option>
                  <option value={8}>Eight</option>
                  <option value={9}>Nine</option>
                  <option value={10}>Ten</option>
                </Select>

                <FormLabel>Category</FormLabel>
                <Select
                  placeholder="Select option"
                  value={productState.category}
                  onChange={(e) =>
                    setProductState({
                      type: "category",
                      payload: e.target.value,
                    })
                  }
                >
                  <option value="earbuds">Earbud</option>
                  <option value="watches">Watches</option>
                  <option value="earphone">Earphone</option>
                  <option value="speaker">Speaker</option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                </Select>

               

                <Button
                  style={{ margin: "1%", marginTop: "5%" }}
                  colorScheme="pink"
                  onClick={addProductHandler}
                >
                  Add Product
                </Button>
                <Link to="/admin_side_products">
                  <Button
                    colorScheme="green"
                    style={{ margin: "1%", marginTop: "5%" }}
                  >
                    Back to Products
                  </Button>
                </Link>
              </div>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AdminSideAddProducts };
