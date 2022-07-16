import { Input, Text } from "@nextui-org/react";
import { func, string } from "prop-types";
import { Field } from "react-final-form";
import noop from "shared/noop";

export default function FormInput(props) {
  const { name, validate, ...config } = props;

  return (
    <Field
      name={name}
      validate={validate}
      render={({ input, meta }) => {
        const { submitError, error } = meta;
        const errorText = error || submitError;
        const hasError = meta.touched && errorText;
        const colorStatus = hasError ? "error" : "default";

        return (
          <>
            <Input
              {...input}
              {...config}
              shadow={false}
              clearable
              color={colorStatus}
              helperColor={colorStatus}
              status={colorStatus}
            />
            {hasError && (
              <Text size={12} color="error">
                {errorText}
              </Text>
            )}
          </>
        );
      }}
    />
  );
}

FormInput.propTypes = {
  name: string.isRequired,
  validate: func,
  placeholder: string,
};

FormInput.defaultProps = {
  validate: noop,
  placeholder: "",
};
