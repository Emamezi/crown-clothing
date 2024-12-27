import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};
function Button({ children, buttonType }) {
  return (
    <div>
      <button
        className={`button-container  ${BUTTON_TYPE_CLASSES[buttonType]}`}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
