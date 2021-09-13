import babel from 'rollup-plugin-babel'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.cjs.js',
    format: 'cjs',
    name: 'bundleName',
    sourcemap: true 
  },
  plugin: [
    babel({ exclude: 'node_modules/**' })
  ]
}