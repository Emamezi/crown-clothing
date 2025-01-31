import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

import "./category.styles.jsx";
import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector.js";

function Category() {
  const { categoryTitle } = useParams();
  console.log("rendering/rerending component");
  const categories = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState([]);
  //using a useffect to re-render anytime the dynamic category route changes or the categoriesMap changes
  //alternative would be--> const products=categories[categoryTiitle] but it would instantiate everytinme the component renenders leading to performace issues
  useEffect(() => {
    console.log("effect fired calling setProducts");
    setProducts(categories[categoryTitle]);
  }, [categories, categoryTitle]);

  return (
    <>
      <CategoryTitle>{categoryTitle.toUpperCase()} </CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </CategoryContainer>
    </>
  );
}

export default Category;
