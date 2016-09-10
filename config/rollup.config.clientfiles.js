/* eslint import/no-extraneous-dependencies:0 */
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';

const currentEnvironment = process.env.NODE_ENV || 'development';

export default (pageName, externals) => ({
  entry: `src/js/${pageName}.js`,
  format: 'iife',
  plugins: [
    json(),
    replace({
      ENV: JSON.stringify(currentEnvironment),
    }),
    babel(),
    commonjs(),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
      preferBuiltins: true,
    }),
    uglify(),
    filesize(),
  ],
  external: externals,
  sourceMap: (currentEnvironment !== 'production'),
  moduleId: pageName,
  moduleName: pageName,
  dest: `dist/js/${pageName}.js`,
});
