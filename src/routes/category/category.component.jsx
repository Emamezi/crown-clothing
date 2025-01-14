import { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

import "./category.styles.jsx";
import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";

function Category() {
  const { categories } = useContext(CategoriesContext);
  const { categoryTitle } = useParams();
  const [products, setProducts] = useState([]);
  //using a useffect to rerender anytime the dynamic category route changes or the categoriesMap changes
  //alternative would be--> const products=categories[categoryTiitle] but it would instantiate everytinme the component renenders leading to performace issues
  useEffect(() => {
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
