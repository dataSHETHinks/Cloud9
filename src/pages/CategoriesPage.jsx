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
  return (
    <>
    <AddCategory />
    <ListCategory />
  </>
  );
};

export default CategoriesPage;