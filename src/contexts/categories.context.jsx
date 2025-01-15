import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocument } from "../utils/firebase/firebase.js";

export const CategoriesContext = createContext({
  categories: {},
  setCategories: () => {},
});

function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState({});
  useEffect(() => {
    async function getCategoriesMap() {
      const categoriesMap = await getCategoriesAndDocument();
      setCategories(categoriesMap);
    }
    getCategoriesMap();
  }, []);
  const value = { categories, setCategories };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

export default CategoriesProvider;
