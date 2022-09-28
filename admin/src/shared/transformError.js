export default function transformError(error) {
  const errorResponse = error.response?.data?.errors || undefined;
  console.log({ errorResponse });
  if (typeof errorResponse === "string") {
    return errorResponse;
  }
  if (errorResponse) {
    const [_error] = Object.entries(errorResponse);
    return _error[1];
  }
  return "";
}
