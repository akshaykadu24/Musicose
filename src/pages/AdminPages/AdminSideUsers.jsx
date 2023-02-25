import "../AdminStyles/AdminSideHomePage.css";
import { AdminSideNavbar } from "./AdminSideNavbar";
import { AdminSideSingleUser } from "./AdminSideSingleUser";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/adminReducer/action";
import { useEffect } from "react";
import loading from "../AdminAssets/adminloading.gif";
import error from "../AdminAssets/serverError.gif";

const AdminSideUsers = () => {
  //  const dispatch = useDispatch();
   const users = useSelector((store) => store.adminReducer.users);
   const Loading = useSelector((store) => store.adminReducer.isLoading);
   const IsError = useSelector((store) => store.adminReducer.isError);

  // useEffect(() => {
  //   if (users.length === 0) {
  //     dispatch(getUsers());
  //   }
  // }, [users.length, dispatch]);

  return (
    <>
      <div>
        <div className="admin_heading">Musicose Users</div>
      </div>
      <div className="adminHomeContainer">
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
              paddingTop: "5%",
            }}
          >
            <div>
              <img
                style={{
                  width: "50%",
                  margin: "auto",
                  marginBottom: "5%",
                }}
                src={loading}
                alt="loading..."
              />
              <h1
                style={{
                  fontWeight: "bold",
                  fontSize: "100%",
                  color: "blue",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "120%",
                }}
              >
                Please wait loading...
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

        <div className="admin_grid_container">
          {users.length &&
            users.map((item) => {
              return (
                <AdminSideSingleUser
                  id={item._id}
                  username={item.username}
                  email={item.email}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export { AdminSideUsers };
