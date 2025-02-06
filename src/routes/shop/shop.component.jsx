import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategoriesStart } from "../../store/categories/categories.action";

function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":categoryTitle" element={<Category />} />
    </Routes>
  );
}
export default Shop;
