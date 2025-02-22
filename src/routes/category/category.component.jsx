import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

import "./category.styles.jsx";
import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsloading,
  selectCategoriesMap,
} from "../../store/categories/categories.selector.js";
import Spinner from "../../components/spinner/spinner.component.jsx";

function Category() {
  const { categoryTitle } = useParams();
  const isLoading = useSelector(selectCategoriesIsloading);
  const categories = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState([]);
  //using a useffect to re-render anytime the dynamic category route changes or the categoriesMap changes
  //alternative would be--> const products=categories[categoryTiitle] but it would instantiate everytinme the component renenders leading to performace issues
  useEffect(() => {
    setProducts(categories[categoryTitle]);
  }, [categories, categoryTitle]);

  return (
    <>
      <CategoryTitle>{categoryTitle.toUpperCase()} </CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </CategoryContainer>
      )}
    </>
  );
}

export default Category;
