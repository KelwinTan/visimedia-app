import { Input, Text } from '@nextui-org/react';
import { func, string } from 'prop-types';
import { forwardRef } from 'react';
import { Field } from 'react-final-form';
import noop from 'shared/noop';

const FormInput = forwardRef((props, ref) => {
  const { name, validate, ...config } = props;

  return (
    <Field
      name={name}
      validate={validate}
      render={({ input, meta }) => {
        const { submitError, error } = meta;
        const errorText = error || submitError;
        const hasError = meta.touched && errorText;
        const colorStatus = hasError ? 'error' : 'default';

        return (
          <>
            <Input
              {...input}
              {...config}
              shadow={false}
              clearable
              ref={ref}
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
});

export default FormInput;

FormInput.propTypes = {
  name: string.isRequired,
  validate: func,
  placeholder: string
};

FormInput.defaultProps = {
  validate: noop,
  placeholder: ''
};
