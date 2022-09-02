import get from "lodash/get";
import { reach } from "yup";

const getValidatorFromSchema = (name, schema) => (value, allValues, meta) => {
  return reach(schema, name)
    .validate(value, { context: { allValues, meta } })
    .then(() => {
      return Promise.resolve(undefined);
    })
    .catch((err) => {
      return Promise.resolve(get(err, "errors[0]"));
    });
};

export default getValidatorFromSchema;
