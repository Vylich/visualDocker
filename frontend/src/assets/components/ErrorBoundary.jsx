import { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    window.addEventListener('error', () => {
      setHasError(true);
    });

    return () => {
      window.removeEventListener('error', () => {
        setHasError(true);
      });
    };
  }, []);

  if (hasError) {
    return <div>Произошла ошибка!</div>;
  }

  return children;
};
export default ErrorBoundary