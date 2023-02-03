import cn from "classnames";
import { useState } from "preact/compat";
import { Field } from "react-final-form";

export default function InputPassword({
  placeholder = "",
  name,
  label = null,
  helpText = null,
  disabled = false,
}) {
  const [type, setType] = useState("password");
  const toggle = () => setType(type == "password" ? "text" : "password");

  return (
    <>
      <style jsx>
        {`
        .form-group {
          position: relative;
          
        }
          .form-group-append {
            position: absolute;
            right: 20px;
            top: 50%;
            transform:translateY(-50%);
          }

          .form-control.is-invalid + .form-group-append {
            right : 40px;
            top: 25%;
            transform:translateY(-25%);
          }
        `}
      </style>
      <Field type={type} name={name}>
        {({ input, meta }) => (
          <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                className={cn("form-control", {
                  "is-invalid": meta.error && meta.touched,
                })}
                placeholder={placeholder}
                disabled={disabled}
                {...input}
              />
              <div className="form-group-append">
                <span className="form-group-text bg-transparent">
                  {
                    type == "password" ? <i
                    className="fa fa-eye"
                    onClick={toggle}
                    aria-hidden="true"
                  ></i> : <i
                  className="fa fa-eye-slash"
                  onClick={toggle}
                  aria-hidden="true"
                ></i>
                  }
                </span>
              </div>
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
    </>
  );
}
