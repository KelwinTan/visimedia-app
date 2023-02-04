import { Field } from 'react-final-form';
import cn from 'classnames';
import { css } from '@emotion/css';

export default function InputFile({
  type = 'file',
  name,
  accept = '*/*',
  label = null,
  helpText = null
}) {
  return (
    <Field type={type} name={name}>
      {({ input: { onChange, ...input }, meta }) => {
        return (
          <div className={css({ display: 'flex', flexDirection: 'column' })}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
              id={name}
              type="file"
              className={cn('form-control-file', {
                'is-invalid': meta.error && meta.touched
              })}
              accept={accept}
              {...input}
              onChange={({ target: { files } }) => onChange(files)}
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
