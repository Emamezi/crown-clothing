import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles.jsx";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};
//getting the button style dynamically instead of passing in a buttonType string for felxibility and scalability
//pros: can add more styles to the button_type_classes object and relfects everywhere in code when used and eliminates errors
function getButton(buttonType = BUTTON_TYPE_CLASSES.base) {
  const useCaseButtonTypeObj = {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  };
  //dynamically select the button type value-->(button component) based on the value given
  return useCaseButtonTypeObj[buttonType];
}
function Button({ children, buttonType, onClick }) {
  const CustomButton = getButton(buttonType);
  return <CustomButton onClick={onClick}>{children}</CustomButton>;
}

export default Button;
