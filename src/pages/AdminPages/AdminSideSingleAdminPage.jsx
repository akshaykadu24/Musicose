import admin from "../AdminAssets/admin.jpg";
import "../AdminStyles/AdminSideSingleAdminPage.css";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { Box, useToast } from "@chakra-ui/react";
import { deleteUser, getUsers } from "../../redux/adminReducer/action";


const AdminSideSingleAdminPage = ({ username, email, id, adminID }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const deleteAdminHandler = (id) => {
    dispatch(deleteUser(id))
      .then(() =>
        toast({
          title: "Admin deleted !",
          description: "We've deleted admin.",
          status: "warning",
          duration: 2000,
          position: "top",
          isClosable: true,
          render: () => (
            <Box border="2px solid red" textAlign="center" borderRadius="10px" fontWeight="bolder" color="white" p={3} bg="red.500" boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px">
              {`Admin successfully deleted !`}
            </Box>
          ),
        })
      )
      .then(() => dispatch(getUsers()));
  };

  return (
    <div className="single_admin_container">
      <div>
        <img src={admin} alt={adminID}/>
      </div>
      <div>
        <p>
          <span>Name:</span> {username}
        </p>
        <p>
          <span>Email:</span> {email}
        </p>
      </div>
      <div className="admin_single_bottom_section">
        <div></div>
        <div className="color_red">
          <DeleteIcon
            onClick={() => deleteAdminHandler(id)}
            fontSize="130%"
            cursor="pointer"
          />
        </div>
      </div>
    </div>
  );
};

export { AdminSideSingleAdminPage };
