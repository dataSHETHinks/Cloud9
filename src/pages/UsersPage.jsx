import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import api from "../apiConfig";
import BaseNav from "../components/base_nav";
import '../css/UsersComponentsCss/UsersPageCss.css';
import ListUsers from "../components/UserComponents/UserList";
import AddUser from "../components/UserComponents/AddUser";
import AssignedChangeUserRole from "../components/RoleComponents/AssignedChangeUserRole";


const { Column } = Table;
const { confirm } = Modal;

const UsersPage = (params) => {
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
