import profileImage from "../assets/profile.webp";
import BaseNav from "../components/base_nav";
import DashBoardHeader from "../components/DashBoardHeader";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/CategoriesComponentsCss/CategoryPageCss.css";

import api from '../apiConfig';

import AddCategory from "../components/CategoryComponent/AddCategory";
import ListCategory from "../components/CategoryComponent/ListCategory";



const CategoriesPage = (params) => {
  const [allCategory, setAllCategory] = useState([]);
  const navigate = useNavigate();
  const [newCategoryName, setNewCategoryName] = useState(""); // Step 1

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  ;

  const handleNewCategoryChange = (e) => {
    setNewCategoryName(e.target.value); // Step 3
  };

  const addNewCategory = () => {
    api("POST", "/data/add_new_category/", { name: newCategoryName })
      .then((response) => {
        console.log("New category added:", response.data);
      
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
    <AddCategory />
    <p>Category</p>
    <ListCategory />
  </>
  );
};

export default CategoriesPage;