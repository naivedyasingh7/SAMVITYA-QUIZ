import { useState } from 'react';

export function useTestingSuite() {
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  return { testResults, isRunning };
}
