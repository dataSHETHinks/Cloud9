import profileImage from "../assets/profile.webp";
import BaseNav from "../components/base_nav";
import DashBoardHeader from "../components/DashBoardHeader";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/CategoriesComponentsCss/CategoryPageCss.css";

import api from '../apiConfig';
import { Input, Button, Table } from 'antd';

const CategoriesPage = (params) => {
  const [allCategory, setAllCategory] = useState([]);
  const navigate = useNavigate();
  const [newCategoryName, setNewCategoryName] = useState(""); // Step 1

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNewCategoryChange = (e) => {
    setNewCategoryName(e.target.value); // Step 3
  };

  const addNewCategory = () => {
    api("POST", "/data/add_new_category/", { name: newCategoryName })
      .then((response) => {
        console.log("New category added:", response.data);
        // setAllCategory((prevCategories) => [...prevCategories, response.data]); // Step 6
        getFileCategories();
        setNewCategoryName(""); // Clear the input field
      })
      .catch((error) => {
        console.error("Error adding new category:", error);
      });
  };


  const getFileCategories = () =>{
    api("GET", "/data/get_file_categories/", {})
    .then((response) => {
      setAllCategory(response.data.data);
    })
    .catch((error) => {
      console.error("GET Request Error:",error);
    });
  };
  useEffect(() => {
    getFileCategories();
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
              <div>
                <input
                  type="text"
                  placeholder="New Category Name"
                  value={newCategoryName}
                  onChange={handleNewCategoryChange}
                />
                <button onClick={addNewCategory}>Add Category</button>
              </div>
            </div>
    <div className="child-2">
     {/* <div
      className="table-responsive"
      style={{ maxHeight: "85%", overflowY: "auto" }}
    >
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            {/* <th>Name</th> */}
          {/* </tr>
        </thead>
        <tbody>
          {allCategory.map((category, index) => (
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */} */}
    <Table
            dataSource={allCategory}
            columns={[{ title: 'Category Name', dataIndex: 'name', key: 'name' }]}
            rowKey="id"
          />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoriesPage;
