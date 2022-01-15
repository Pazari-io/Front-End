import { useState, useLayoutEffect } from 'react';

export default function useQueryLoader(data, isFetching, error) {
  let obj = { loaded: false, data: null, error: null };
  const [finalForm, SetFinalForm] = useState(obj);

  useLayoutEffect(() => {
    if (error) {
      let obj = { loaded: true, data: null, error: error };
      SetFinalForm(obj);
      return;
    }

    if (isFetching) {
      let obj = { loaded: false, data: null, error: error };
      SetFinalForm(obj);
      return;
    }

    if (!isFetching && data.length === 0) {
      let obj = { loaded: true, data: null, error: error };
      SetFinalForm(obj);
      return;
    }

    if (!isFetching && data.length > 0) {
      let obj = { loaded: true, data: data, error: error };
      SetFinalForm(obj);
      return;
    }
  }, [isFetching, data, error]);

  console.log(finalForm);
  return finalForm;
}
