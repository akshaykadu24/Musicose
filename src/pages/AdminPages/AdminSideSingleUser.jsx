import user from "../AdminAssets/user.png";
import "../AdminStyles/AdminSideSingleAdminPage.css";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { Box, useToast } from "@chakra-ui/react";
import { deleteUser, getUsers } from "../../redux/adminReducer/action";

const AdminSideSingleUser = ({ username, email, id }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
      .then(() =>
        toast({
          title: "User deleted !",
          description: "We've deleted user.",
          duration: 2000,
          position: "top",
          isClosable: true,
          status:"warning",
          render: () => (
            <Box border="2px solid red" textAlign="center" borderRadius="10px" fontWeight="bolder" color="white" p={3} bg="red.500" boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px">
              {`User successfully deleted !`}
            </Box>
          ),
        })
      )
      .then(() => dispatch(getUsers()));
  };

  return (
    <div className="single_admin_container">
      <div>
        <img src={user} />
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
            onClick={() => deleteUserHandler(id)}
            fontSize="130%"
            cursor="pointer"
          />
        </div>
      </div>
    </div>
  );
};

export { AdminSideSingleUser };
