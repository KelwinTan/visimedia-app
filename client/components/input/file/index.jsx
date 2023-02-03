import { Field } from "react-final-form";
import cn from "classnames";

export default function InputFile({
  type = "file",
  name,
  accept = "*/*",
  label = null,
  helpText = null,
}) {
  return (
    <Field type={type} name={name}>
      {({ input : {onChange , ...input}, meta }) => {
        return (
          <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <input
              type={"file"}
              className={cn("form-control-file", {
                "is-invalid": meta.error && meta.touched,
              })}
              accept={accept}
              {...input}
              onChange={({target: {files}}) => onChange(files)}
            />
            {helpText && (
              <small id={name} className="form-text text-muted">
                {helpText}
              </small>
            )}
            {meta.error && meta.touched && <div className="invalid-feedback">{meta.error}</div>}
          </div>
        );
      }}
    </Field>
  );
}
