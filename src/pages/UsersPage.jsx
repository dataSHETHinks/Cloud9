import React from "react";
import '../css/UsersComponentsCss/UsersPageCss.css';
import ListUsers from "../components/UserComponents/UserList";
import AddUser from "../components/UserComponents/AddUser";

const UsersPage = () => {
  return (
    <>
      <div className="row" style={{ display: "flex" }}>
        <AddUser />
      </div>
      <ListUsers />
    </>
  );
};

export default UsersPage;
