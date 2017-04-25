import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'

const isProduction = process.env[ 'NODE_ENV' ] === 'production'
const plugins = [ babel(), resolve({ jsnext: true, modulesOnly: true }) ]

if (isProduction) {
  plugins.push(uglify())
}

export default {
  plugins: plugins,
  sourceMap: !isProduction,
  format: 'iife'
}
