import { useState } from 'react';

export function useScoring() {
  const [rules, setRules] = useState([]);
  return { rules, setRules };
}
