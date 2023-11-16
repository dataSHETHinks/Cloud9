// import profileImage from "../assets/profile.webp";
// import BaseNav from "../components/base_nav";
// import DashBoardHeader from "../components/DashBoardHeader";

// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "../css/ModulesComponentsCss/ModulePageCss.css";

// const ModulesPage = (params) => {
//   const navigate = useNavigate();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return <p>Modules Page</p>;
// };

// export default ModulesPage;

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
      <p>Modules</p>
      <ListModules />
    </>
  );
};

export default ModulesPage;


//   // State for the list of modules and new module name
//   const [modules, setModules] = useState([]);
//   const [newModuleName, setNewModuleName] = useState("");

//   // Event handler for adding a new module
//   const addNewModule = () => {
//     // Logic to add the new module
//     // For now, simply adding it to the state
//     setModules([...modules, { name: newModuleName }]);
//     setNewModuleName(""); // Clear the input after adding
//   };

//   // Columns for the Ant Design Table
//   const columns = [
//     { title: 'Module Name', dataIndex: 'name', key: 'name' },
//   ];

//   return (
//     <div className="dashboard-container">
//       <BaseNav isSidebarOpen={isSidebarOpen} />
//       <main className="content">
//         <DashBoardHeader
//           isSidebarOpen={isSidebarOpen}
//           toggleSidebar={toggleSidebar}
//           profileImage={profileImage}
//           navigate={navigate}
//         />
//         <div className="module-page-div">
//           <div style={{ marginBottom: 16 }}>
//             <Input
//               placeholder="Module Name"
//               value={newModuleName}
//               onChange={(e) => setNewModuleName(e.target.value)}
//             />
//             <Button 
//               type="primary" 
//               onClick={addNewModule} 
//               style={{ marginLeft: 8 }}
//             >
//               Add New Module
//             </Button>
//           </div>
//           <Table dataSource={modules} columns={columns} rowKey="name" />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ModulesPage;
