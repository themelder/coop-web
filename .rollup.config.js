import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'

const isRelease = process.env[ 'BUILD_MODE' ] === 'release'
const plugins = [ babel(), resolve({ jsnext: true, modulesOnly: true }) ]

if (isRelease) {
  plugins.push(uglify())
}

export default {
  plugins: plugins,
  sourceMap: !isRelease,
  format: 'iife'
}
