const transformValueToProp = value => {
  if (
    value &&
    typeof value === "object" &&
    typeof value.toJSON === "function"
  ) {
    return value.toJSON();
  }

  return value;
};

export default transformValueToProp;
