import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../AdminStyles/AdminSideHomePage.css";
import { getUsers } from "../../redux/adminReducer/action"
import { AdminSideSingleAdminPage } from "./AdminSideSingleAdminPage"
import { AdminSideNavbar } from "./AdminSideNavbar"
import loading from "../AdminAssets/adminloading.gif";
import error from "../AdminAssets/serverError.gif";

const AdminSideHomePage = () => {
  const dispatch = useDispatch();
  const admins = useSelector((store) => store.adminReducer.users);
  const Loading = useSelector((store) => store.adminReducer.isLoading);
  const IsError = useSelector((store) => store.adminReducer.isError);

  useEffect(() => {
    if (admins.length === 0) {
      dispatch(getUsers());
    }
  }, [admins.length, dispatch]);

  return (
    <>
      <div>
        <div className="admin_heading">Musicose Admins</div>
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
                  fontSize: "150%",
                  marginTop: "5%",
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
          {admins.length &&
            admins
              .filter((item) => item.adminID === "musicose")
              .map((item) => {
                return (
                  <AdminSideSingleAdminPage
                    key={item._id}
                    id={item._id}
                    username={item.username}
                    email={item.email}
                    adminID={item.adminID}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
};

export { AdminSideHomePage };


