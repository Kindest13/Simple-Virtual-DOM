export default (tagName, { attrs = {}, children = [] } = {}) => {
  const virtualElement = Object.create(null);
  Object.assign(virtualElement, {
    tagName,
    attrs,
    children,
  })
  return virtualElement;
};
