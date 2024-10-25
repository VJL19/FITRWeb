const replaceCharWithAsterisk = (text: string): string => {
  return text[0] + text[1] + "*".repeat(text.length - 2) + text.slice(-2);
};

export { replaceCharWithAsterisk };
