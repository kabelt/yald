//in case we need to validate info the user put into registration form
export default function validateInfo(values) {
    let errors = {};

    if (!values.author_name.trim()) {
      errors.author = 'Author\'s name is required';
    }

    if (!values.title) {
      errors.title = 'Music title is required';
    }
    if (!values.description) {
      errors.description = 'Description is required';
    }
    return errors;
  }