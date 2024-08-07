export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("fil-PH", {
    notation: "standard",
    compactDisplay: "short",
  }).format(value);
};
