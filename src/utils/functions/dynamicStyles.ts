const dynamicStyle = (currentRoute: string, route: string) => {
  const dynamicStyles = `${
    currentRoute === route ? "icon--block--active" : "icon--block"
  }`;
  return dynamicStyles;
};
export default dynamicStyle;
