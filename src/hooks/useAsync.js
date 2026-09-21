import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Runs an async function and tracks { data, loading, error }. Re-runs when `deps` change and
 * ignores results from stale calls. Swap in React Query/SWR later without touching pages.
 */
export function useAsync(fn, deps = []) {
  const [state, setState] = useState({ data: undefined, loading: true, error: null });
  const callId = useRef(0);

  const run = useCallback(() => {
    const id = ++callId.current;
    setState((s) => ({ ...s, loading: true, error: null }));
    Promise.resolve()
      .then(fn)
      .then(
        (data) => id === callId.current && setState({ data, loading: false, error: null }),
        (error) => id === callId.current && setState({ data: undefined, loading: false, error }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { ...state, reload: run };
}
