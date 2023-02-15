import cn from "classnames";
import { Field } from 'react-final-form';

export default function TextArea({ type = "textarea", placeholder = '', name, label = null, helpText = null }) {
  return (
    <Field type={type} name={name} placeholder={placeholder}>
      {({
        input,
        meta,
      }) => (
        <div className="form-group">
          {label && <label htmlFor={name}>{label}</label>}
          <textarea
            type={type}
            className={cn("form-control", {
              "is-invalid": meta.error && meta.touched,
            })}
            placeholder={placeholder}
            {...input}
          ></textarea>
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
