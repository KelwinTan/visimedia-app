import { css } from '@emotion/css';
import cn from 'classnames';
import { Field } from 'react-final-form';

export default function InputField({
  type = 'text',
  placeholder = '',
  name,
  label = null,
  helpText = null,
  disabled = false
}) {
  return (
    <Field type={type} name={name}>
      {({ meta }) => (
        <div className={css({ display: 'flex', flexDirection: 'column' })}>
          {label && <label htmlFor={name}>{label}</label>}
          <input
            id={name}
            type={type}
            className={cn('form-control', {
              'is-invalid': meta.error && meta.touched
            })}
            placeholder={placeholder}
            disabled={disabled}
          />
          {helpText && (
            <small id={name} className="form-text text-muted">
              {helpText}
            </small>
          )}
          {meta.error && meta.touched && (
            <div className="invalid-feedback">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
}
