import React, { useState } from "react";

const useFormState = action => {
  const [state, setState] = useState({ error: null, loading: false });

  const handleSubmit = async e => {
    e.preventDefault();
    setState({ error: null, loading: true });
    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await action({ formData, slug });
    if (result?.isError) {
      setError({ error: result, loading: false });
    } else {
      setError(prev => ({ ...prev, loading: false }));
      form.reset();
    }
  };
  return [state, handleSubmit];
};

export default useFormState;
