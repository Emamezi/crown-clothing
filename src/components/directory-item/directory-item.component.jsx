import "./directory-item.styles.jsx";
import { Link } from "react-router-dom";
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles.jsx";

function DirectoryItem({ category }) {
  const { imageUrl, title } = category;
  return (
    <DirectoryItemContainer>
      <BackgroundImage $imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <Link to="/shop">Shop Now</Link>
      </Body>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;
