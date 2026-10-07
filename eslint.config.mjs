// eslint-config-next 16 ships a flat config directly; FlatCompat is not needed.
import coreWebVitals from 'eslint-config-next/core-web-vitals';

export default [
  { ignores: ['legacy/**', 'tools/**', '.next/**', 'node_modules/**', 'next-env.d.ts'] },
  ...(Array.isArray(coreWebVitals) ? coreWebVitals : [coreWebVitals]),
];
