// AddRoleForm.jsx

import React, { useState } from "react";
import api from "../../apiConfig";
import "../../css/RolesComponentsCss/AddRoleFormCss.css";

const AddRoleForm = ({ onRoleAdded, onClose }) => {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState({
    canModifyModule: false,
    canModifyCategory: false,
    canModifyUser: false,
    canModifyRoles: false,
    canModifyFiles: false,
  });

  const handleRoleNameChange = (event) => {
    setRoleName(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));
  };

  const handleAddRole = async () => {
    // try {
    //   // Call your API to add the role
    //   const response = await api("POST", "/user/add_role/", {
    //     name: roleName,
    //     permissions,
    //   });

    //   // Assuming the API returns the newly added role data
    //   const newRole = response.data;

    //   // Notify the parent component about the added role
    //   onRoleAdded(newRole);

    //   // Clear the input field and close the modal
    //   setRoleName("");
    //   setPermissions({
    //     canModifyModule: false,
    //     canModifyCategory: false,
    //     canModifyUser: false,
    //     canModifyRoles: false,
    //     canModifyFiles: false,
    //   });
    //   onClose();
    // } catch (error) {
    //   console.error("Error adding role:", error);
    //   // Handle error appropriately (e.g., show a toast message)
    // }
  };

  return (
    <div className="add-role-form">
      <label htmlFor="roleName">Role Name:</label>
      <input
        type="text"
        id="roleName"
        value={roleName}
        onChange={handleRoleNameChange}
        placeholder="Enter role name"
      />
      <div>
        <label>
          <input
            type="checkbox"
            name="canModifyModule"
            checked={permissions.canModifyModule}
            onChange={handleCheckboxChange}
          />
          Can Modify Module
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="canModifyCategory"
            checked={permissions.canModifyCategory}
            onChange={handleCheckboxChange}
          />
          Can Modify Category
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="canModifyUser"
            checked={permissions.canModifyUser}
            onChange={handleCheckboxChange}
          />
          Can Modify User
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="canModifyRoles"
            checked={permissions.canModifyRoles}
            onChange={handleCheckboxChange}
          />
          Can Modify Roles
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="canModifyFiles"
            checked={permissions.canModifyFiles}
            onChange={handleCheckboxChange}
          />
          Can Modify Files
        </label>
      </div>
      <button onClick={handleAddRole}>Add Role</button>
    </div>
  );
};

export default AddRoleForm;
