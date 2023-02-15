import { Field } from 'react-final-form';
import cn from 'classnames';
import { css } from '@emotion/css';

export default function InputFile({
  name,
  accept = '*/*',
  label = null,
  helpText = null
}) {
  return (
    <Field name={name}>
      {({ input: { onChange, value, ...input }, meta }) => {
        return (
          <div className={css({ display: 'flex', flexDirection: 'column' })}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
              {...input}
              id={name}
              type="file"
              accept={accept}
              className={cn('form-control-file', {
                'is-invalid': meta.error && meta.touched
              })}
              onChange={({ target }) => {
                onChange(target.files);
              }}
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
        );
      }}
    </Field>
  );
}
