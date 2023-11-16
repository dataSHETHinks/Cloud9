import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/ModulesComponentsCss/ModulePageCss.css";
import ListModules from "../components/ModuleComponents/ListModules";
import AddModule from "../components/ModuleComponents/AddModule";

const ModulesPage = (params) => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <AddModule />
      <ListModules />
    </>
  );
};

export default ModulesPage;
