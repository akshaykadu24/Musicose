import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Select,

} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../AdminStyles/AdminSideAddProducts.css";
import { AdminSideNavbar } from "./AdminSideNavbar";
import { addProduct } from "../../redux/adminReducer/admin.action";


const AdminSideAddProducts = () => {

  const [val, setVal] = useState({})

  const dispatch = useDispatch()
  let handleChange = (e)=>{
    const {name,value} = e.target

    setVal({...val,[name]:value})
  }
  console.log(val)
  
  const handleSubmit =()=>{
    dispatch(addProduct(val))

    document.getElementById("product_item_meta__title").value = ""
    document.getElementById("product_item__primary_image").value = ""
    document.getElementById("product_item__secondary_image").value = ""
    document.getElementById("category").value = ""
    document.getElementById("price").value = ""
    document.getElementById("price2").value = ""
    document.getElementById("feature").value = ""
    document.getElementById("feature2").value = ""
    document.getElementById("feature3").value = ""
    alert("Product is added")
  }
 

  return (
    <div className="AdminSideProductAddContainer">
      <div className="admin_side_update_form_heading">
         Add Product 
      </div>
      <div className="admin_side_form_box">
        <div>
          {/* <AdminSideNavbar /> */}
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

              <div className="productAddBox1">
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Enter Product Name"
                  type="text"
                  name="product_item_meta__title"
                  id="product_item_meta__title"
                  onChange={(e) =>
                  handleChange(e)
                  }
                />

                <FormLabel>Image</FormLabel>
                <Input
                  placeholder="Enter image 1 "
                  type="text"
                  name="product_item__primary_image"
                  id="product_item__primary_image"
                  onChange={(e) =>
                  handleChange(e)
                  }
                />
                <FormLabel>Image2</FormLabel>
                <Input
                  placeholder="Enter image 2"
                  type="text"
                  name="product_item__secondary_image"
                  id="product_item__secondary_image"
                  onChange={(e) =>
                  handleChange(e)
                  }
                />

               

                <FormLabel>Price</FormLabel>
                <Input
                  placeholder="Enter Offer Price"
                  type="text"
                  name="price"
                  id="price"
                  onChange={(e) =>
                  handleChange(e)
                    
                  }
                />

                <FormLabel>Price</FormLabel>
                <Input
                  placeholder="Enter MRP"
                  type="text"
                  name="price2"
                  id="price2"
                  onChange={(e) =>
                  handleChange(e)
                    
                  }
                />

                <FormLabel>Features</FormLabel>
                <Input
                  placeholder="Enter Features 1"
                  type="text"
                  name="feature"
                  id="feature"
                  onChange={(e) =>
                  handleChange(e)
                  }
                />
                 <FormLabel>Features2</FormLabel>
                <Input
                  placeholder="Enter Features 2"
                  type="text"
                  name="feature2"
                  id="feature2"
                  onChange={(e) =>
                  handleChange(e)
                  }
                />
                <FormLabel>Features3</FormLabel>
                <Input
                  placeholder="Enter Features 3"
                  type="text"
                  name="feature3"
                  id="feature3"
                  onChange={(e) =>
                  handleChange(e)
                  }
                />
 
              </div>

              <div className="productAddBox2">
               
              
                <FormLabel>Available or not</FormLabel>
              

               

                <FormLabel>Category</FormLabel>
                <Select
                  placeholder="Select option"
                  name="category"
                  id="category"
                  onChange={(e) =>
                  handleChange(e)
                    
                  }
                >
                  <option value="earbuds">Earbud</option>
                  <option value="earphone">Earphone</option>
                  <option value="speaker">Speaker</option>
                  <option value="bluetoothHeadphone">Bluetooth Headphone</option>
                  <option value="watches">Watches</option>
                  {/* <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option> */}
                </Select>

               

                <Button
                  style={{ margin: "1%", marginTop: "5%" }}
                  colorScheme="pink"
                  onClick={handleSubmit}
                >
                  Add Product
                </Button>
                <Link to="#">
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
