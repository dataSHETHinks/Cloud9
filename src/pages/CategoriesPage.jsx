import profileImage from "../assets/profile.webp";
import BaseNav from "../components/base_nav";
import DashBoardHeader from "../components/DashBoardHeader";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/CategoriesComponentsCss/CategoryPageCss.css";

import api from "../../apiConfig";

const CategoriesPage = (params) => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const get_file_categories = () =>{
    api("GET", "/data/get_file_categories/", {})
    .then((response) => {
      setAllFiles(response.data.data);
    })
    .catch((error) => {
      console.error("GET Request Error:",error);
    });
  };
  useEffect(() => {
    get_file_categories();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <BaseNav isSidebarOpen={isSidebarOpen} />
        <main className="content">
          <DashBoardHeader
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            profileImage={profileImage}
            navigate={navigate}
          />
          <div className="category-page-div">
            <div className="child-1">
              <h1>This is Categories Page.</h1>
            </div>
            <div className="child-2">
            <div
      className="table-responsive"
      style={{ maxHeight: "85%", overflowY: "auto" }}
    >
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {allCategory.map((category, index) => (
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td>{category.title}</td>
              <td>{category.category_name}</td>
              <td>{category.uploaded_by_username}</td>
              <td>{category.modified_at}</td>
              <td>{category.module_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoriesPage;
