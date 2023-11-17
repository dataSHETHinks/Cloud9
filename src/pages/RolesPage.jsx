import "../css/RolesComponentsCss/RolesPageCss.css";
import ListRoles from "../components/RoleComponents/ListRoles";
import AddRole from "../components/RoleComponents/AddRole";
import AssignedChangeUserRole from "../components/RoleComponents/AssignedChangeUserRole";

const RolesPage = (params) => {
  return (
    <>
      <div className="row" style={{ display: "flex" }}>
        <AddRole />
        <AssignedChangeUserRole />
      </div>
      <ListRoles />
    </>
  );
};

export default RolesPage;
