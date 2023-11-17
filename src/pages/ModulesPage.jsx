import "../css/ModulesComponentsCss/ModulePageCss.css";
import ListModules from "../components/ModuleComponents/ListModules";
import AddModule from "../components/ModuleComponents/AddModule";

const ModulesPage = (params) => {
  return (
    <>
      <AddModule />
      <ListModules />
    </>
  );
};

export default ModulesPage;
