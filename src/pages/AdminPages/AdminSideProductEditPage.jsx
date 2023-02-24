import {
    FormControl,
    FormLabel,
    Button,
    Input,
    Select,
    useToast,
    Box,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { Link, useParams } from "react-router-dom";
  import {
    getProductById,
    getProducts,
    updateProduct,
  } from "../../redux/adminReducer/action";
  import "../AdminStyles/AdminSideProductEditPage.css";
  import { AdminSideNavbar } from "./AdminSideNavbar";

  
  const AdminSideProductEditPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    console.log(id);
    const [product_item_meta__title, setproduct_item_meta__title] = useState("");
    const [product_item__primary_image, setproduct_item__primary_image] = useState("");
    const [ product_item__secondary_image, setproduct_item__secondary_image] = useState("");
    const [price, setPrice] = useState(0);
    const [ price2, setprice2] = useState(0);
    const [category, setCategory] = useState("");
    const [feature, setfeature] = useState("");
    const [feature2, setfeature2] = useState("");
    const [feature3, setfeature3] = useState("");
   
    const [isavailable, setIsavailable] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const productItem = useSelector((store) => store.adminReducer.productItem);
    const toast = useToast();
  
    const updateAdminSideProduct = () => {
      const newProductItem = {
        product_item_meta__title,
        product_item__primary_image,
        product_item__secondary_image,
        quantity,
        price2,
        price,
        feature,
        feature2,
        feature3,
        category,
        isavailable,
      };
  
      dispatch(updateProduct(id, newProductItem))
        .then(() =>
          toast({
            title: "Product updated!",
            description: "We've updated products for you.",
            status: "success",
            duration: 2000,
            position: "top",
            isClosable: true,
            render: () => (
              <Box border="2px solid green" textAlign="center" borderRadius="10px" fontWeight="bolder" color="white" p={3} bg="blue.500" boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px">
                {`Product Successfully Updated !`}
              </Box>
            ),
          })
        )
        .then(() => {
          dispatch(getProducts());
          console.log(newProductItem);
        });
    };
  
    useEffect(() => {
      if (productItem.length === 0) {
        dispatch(getProductById(id));
      }
      if (productItem) {
        setproduct_item_meta__title(productItem.product_item_meta__title);
        setCategory(productItem.category);
        setproduct_item__primary_image(productItem.product_item__primary_image);
        setIsavailable(productItem.isavailable);
        setproduct_item__secondary_image(productItem.product_item__secondary_image);
        setprice2(productItem.price2);
        setfeature(productItem.feature);
        setfeature2(productItem.feature2);
        setfeature3(productItem.feature3);
        setPrice(productItem.price);
        setQuantity(productItem.quantity);
       
      }
      productItem.length = 0;
    }, [id, productItem, productItem.length, dispatch]);
  
    return (
      <div className="AdminSideProductEditContainer">
        <div className="admin_side_update_form_heading">
          Musicose Product Edit Page
        </div>
        <div className="admin_side_form_box">
          <div>
            <AdminSideNavbar />
          </div>
          <div>
            <div className="adminSideProductEditBox">
              <FormControl
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                  margin: "auto",
                }}
                className="parendFormBox"
              >
               <div className="productEditBox1">
                  <FormLabel>Image</FormLabel>
                  <Input
                    placeholder="Enter image url"
                    type={URL}
                    value={  product_item__primary_image}
                    onChange={(e) => setproduct_item__primary_image(e.target.value)}
                  /> 
                
                  <FormLabel>Image</FormLabel>
                  <Input
                    placeholder="Enter image url"
                    type={URL}
                    value={ product_item__secondary_image}
                    onChange={(e) => setproduct_item__secondary_image(e.target.value)}
                  />
  
                 
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Enter name of the product"
                    value={product_item_meta__title}
                    type={Text}
                    onChange={(e) => setproduct_item_meta__title(e.target.value)}
                  />
  
                  
  
                  <FormLabel>Price</FormLabel>
                  <Input
                    placeholder="Enter price"
                    value={price}
                    type={Number}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
  
                  <FormLabel>Price2</FormLabel>
                  <Input
                    placeholder="Enter price"
                    value={price2}
                    type={Number}
                    onChange={(e) => setprice2(Number(e.target.value))}
                  />
  
                  <FormLabel>Feature</FormLabel>
                  <Input
                    placeholder="Enter feature"
                    value={feature}
                    type={Text}
                    onChange={(e) => setfeature(e.target.value)}
                  />
                    
                    
                  <FormLabel>Feature2</FormLabel>
                  <Input
                    placeholder="Enter feature"
                    value={feature2}
                    type={Text}
                    onChange={(e) => setfeature2(e.target.value)}
                  />
                  
                  <FormLabel>Feature3</FormLabel>
                  <Input
                    placeholder="Enter feature"
                    value={feature3}
                    type={Text}
                    onChange={(e) => setfeature3(e.target.value)}
                  />
                
                </div>
  
                <div className="productEditBox2">
                <FormLabel>Available or not</FormLabel>
                  <Select
                    placeholder="Select option"
                    value={isavailable}
                    type={Boolean}
                    onChange={(e) =>
                      setIsavailable(e.target.value === "true" ? true : false)
                    }
                  >
                    <option value={true}>Available</option>
                    <option value={false}>Not Available</option>
                  </Select>
  
                  <FormLabel>Quantity</FormLabel>
                  <Select
                    placeholder="Select option"
                    value={quantity}
                    type={Number}
                    onChange={(e) => setQuantity(Number(e.target.value))}
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
                    value={category}
                    type={Text}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value="">e</option>
                  </Select>
  
                 
  
                  <Button
                    colorScheme="blue"
                    style={{ margin: "1%", marginTop: "5%" }}
                    onClick={updateAdminSideProduct}
                  >
                    Update Product
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
  
  export { AdminSideProductEditPage };
  
