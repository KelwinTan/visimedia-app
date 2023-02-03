import cn from "classnames";
import { useField } from "react-final-form";

export default function Select({
  type = "select",
  placeholder = "",
  name,
  label = null,
  helpText = null,
  data = [],
  change = null,
}) {
  const { input: field, meta } = useField(name);

  return (
    <>
      <style jsx>
        {`
          .klev-select {
            padding-left: 0.45rem;
            padding-right: 0.45rem;
          }
        `}
      </style>
      <div className="form-group">
        {label && <label htmlFor={name}>{label}</label>}
        <select
          className={cn("form-control", "klev-select", {
            "is-invalid": meta.error && meta.touched,
          })}
          {...field}
          onChange={(e) => {
            field.onChange(e);
            if (change) change(e.target.value);
          }}
        >
          <option>{placeholder}</option>
          {data.map(({ key, value }) => {
            return (
              <option value={key} key={key}>
                {value}
              </option>
            );
          })}
        </select>

        {helpText && (
          <small id={name} className="form-text text-muted">
            {helpText}
          </small>
        )}
        {meta.error && meta.touched && (
          <div className="invalid-feedback">{meta.error}</div>
        )}
      </div>
    </>
  );
}
