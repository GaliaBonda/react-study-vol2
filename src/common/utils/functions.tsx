export function validateBoard(title: string): boolean {
  
    const validationRegex = /^[a-z0-9а-я\s._-]+$/i;
    // if (title && title.length > 0 && validationRegex.test(title)) {
    if (title && title.length > 0 && validationRegex.test(title)) {
      return true;
    } else {
      return false;
    }
    }