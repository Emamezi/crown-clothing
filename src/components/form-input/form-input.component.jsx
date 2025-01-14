import { FormInputLabel, Input, Group } from "../form-input/form-input.styles";

function FormInput({ label, inputOptions }) {
  return (
    <Group>
      <Input {...inputOptions} required />
      {label && (
        <FormInputLabel $shrink={inputOptions.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
}
export default FormInput;
