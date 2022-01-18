import { useState, useEffect } from 'react';
import { useIsMount } from './useIsMount';
export default function useQueryLoader(data, isFetching, error) {
  let obj = { loaded: false, data: null, error: null };
  const [finalForm, SetFinalForm] = useState(obj);
  const isMount = useIsMount();

  useEffect(() => {
    if (isMount) {
      // console.log('First Render which cause issue');
      // we ignore this
      return;
    }

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

  //console.log(finalForm);
  return finalForm;
}
