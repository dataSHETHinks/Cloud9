import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/RolesComponentsCss/RolesPageCss.css";
import ListRoles from "../components/RoleComponents/ListRoles";
import AddRole from "../components/RoleComponents/AddRole";
import AssignedChangeUserRole from "../components/RoleComponents/AssignedChangeUserRole";

const RolesPage = (params) => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="row" style={{ display: 'flex' }}>
        <AddRole />
        <AssignedChangeUserRole />
      </div>
      <ListRoles />
    </>
  );
};

export default RolesPage;
