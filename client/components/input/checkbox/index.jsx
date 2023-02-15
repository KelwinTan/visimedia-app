import cn from "classnames";
import { Field } from 'react-final-form';

export default function Checkbox({
  type = "checkbox",
  placeholder = "",
  name,
  label,
  helpText = null,
}) {
  return (
    <Field type={type} name={name} placeholder={placeholder}>
      {({ input, meta }) => (
        <div className="form-group">
          <div className="form-check">
            <label className="form-check-label">
              <input
                type={type}
                className={cn("form-check-input", {
                  "is-invalid": meta.error,
                })}
                {...input}
              />
              {label}
            </label>
          </div>
          {helpText && (
            <small id={name} className="form-text text-muted">
              {helpText}
            </small>
          )}
          {meta.error && <div className="invalid-feedback">{meta.error}</div>}
        </div>
      )}
    </Field>
  );
}
