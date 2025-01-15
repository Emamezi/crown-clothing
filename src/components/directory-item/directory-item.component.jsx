import "./directory-item.styles.jsx";
import { Link, useNavigate } from "react-router-dom";
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles.jsx";

function DirectoryItem({ category }) {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  function directoryNavigateHandler() {
    navigate(route);
  }
  return (
    <DirectoryItemContainer onClick={directoryNavigateHandler}>
      <BackgroundImage $imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <Link to="/shop">Shop Now</Link>
      </Body>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;
