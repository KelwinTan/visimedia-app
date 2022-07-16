import isObject from "../utils/isObject";

export default function transformError(error) {
  if (isObject(error)) {
    return Object.entries(error).reduce((curr, [key, value]) => {
      if (Array.isArray(value)) {
        curr[key] = value.at(0);
      } else {
        curr[key] = value;
      }
      return curr;
    }, {});
  }

  return error;
}
