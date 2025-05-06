export const validateCourseCode = (code: string): boolean => {
  // Course code must follow the format COSCxxxx where xxxx is a number between 0-9
  const regex = /^COSC[0-9]{4}$/;
  return regex.test(code);
};

export const capitalizeName = (name: string): string => {
  // Ensure the first letter is capitalized
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

// src/utils/validation.ts
export const validateField = (
  value: string,
  fieldName: string,
  required: boolean = true
): { valid: boolean; error: string } => {
  // Basic required field validation
  if (required && !value.trim()) {
    return {
      valid: false,
      error: `${fieldName} is required`,
    };
  }

  // Specific validations based on field type
  switch (fieldName.toLowerCase()) {
    case "course code":
      if (!validateCourseCode(value)) {
        return {
          valid: false,
          error: "Course code must follow the format COSCxxxx",
        };
      }
      break;
    case "year":
      const year = parseInt(value, 10);
      if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
        return {
          valid: false,
          error: "Please enter a valid year",
        };
      }
      break;
  }

  return { valid: true, error: "" };
};
