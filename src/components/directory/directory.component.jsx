import CategoryItem from "../directory-item/directory-item.component";
import "./directory.styles.jsx";
import { DirectoryContainer } from "./directory.styles.jsx";

function Directory({ categories }) {
  return (
    <DirectoryContainer>
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </DirectoryContainer>
  );
}

export default Directory;
