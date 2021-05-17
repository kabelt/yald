import { useState, useEffect } from 'react';

const useForm = (callback, validate, uploadSingle) => {
  const [values, setValues] = useState({
    title: '',
    author_name: '',
    track: '',
    artwork: '',
    description: ''
  });

    const [errors, setErrors] = useState({}); //{} empty object
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleChange = (event, index, setContributors) => {

    if (index == -1){
        const { name, value } = event.target;
        console.log(name)
        console.log(value)
        setValues({
          ...values,
          [name]: value
        });
        return
    }

    event.preventDefault();
    event.persist();
    setContributors((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }
        return {
          ...item,
          [event.target.name]: event.target.value,
        };
      });
    });
  };

  const handleSubmit = (event, contributors) => {
    event.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
    uploadSingle(values.title, values.author_name, values.description, contributors)
    window.alert("upload!");
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
