import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategoriesAndDocument } from "../../utils/firebase/firebase";
import { setCategories } from "../../store/categories/categories.action";

function Shop() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getCategoriesMap() {
      const categoriesArray = await getCategoriesAndDocument();
      dispatch(setCategories(categoriesArray));
      // setCategories(categoriesMap);
    }
    getCategoriesMap();
  }, [dispatch]);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":categoryTitle" element={<Category />} />
    </Routes>
  );
}
export default Shop;
