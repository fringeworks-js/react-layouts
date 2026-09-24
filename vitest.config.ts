import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    coverage: { enabled: true },
    typecheck: {
      // `*.test-d.tsx`の型アサーションをテストとして実行する
      enabled: true,
      tsconfig: './tsconfig.json',
    },
  },
});
