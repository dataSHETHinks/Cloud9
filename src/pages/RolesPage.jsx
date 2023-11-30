import "../css/RolesComponentsCss/RolesPageCss.css";
import ListRoles from "../components/RoleComponents/ListRoles";
import AddRole from "../components/RoleComponents/AddRole";

const RolesPage = (params) => {
  return (
    <>
      <div className="row" style={{ display: "flex" }}>
        <AddRole />
      </div>
      <ListRoles />
    </>
  );
};

export default RolesPage;
