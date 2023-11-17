import "../css/CategoriesComponentsCss/CategoryPageCss.css";

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
