import { defineConfig } from 'tsup'

export default defineConfig([
  // Main entry point
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: false,
    treeshake: true,
    outDir: 'dist',
  },
  // Subpath exports
  {
    entry: {
      'catalogs/index': 'src/catalogs/index.ts',
      'documents/index': 'src/documents/index.ts',
      'taxes/index': 'src/taxes/index.ts',
      'utils/index': 'src/utils/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    minify: false,
    treeshake: true,
    outDir: 'dist',
  },
])
