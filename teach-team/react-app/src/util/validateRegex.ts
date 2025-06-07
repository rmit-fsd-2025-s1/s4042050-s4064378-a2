export const validateRegex = (content: string, regex: RegExp): boolean => {
  return regex.test(content);
};
