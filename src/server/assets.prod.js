/*
 * Assets (production)
 *
 * Simply lists all files found in dist
 */
import glob from 'glob'
import * as paths from '../../build/paths'

// read all assets files on load and remember
const assets = {
  styles: [
    ...glob.sync(paths.webDistDir + '/app.*.css').map(paths.resolveWeb)
  ],
  scripts: [
    ...glob.sync(paths.webDistDir + '/vendors.*.js').map(paths.resolveWeb),
    ...glob.sync(paths.webDistDir + '/app.*.js').map(paths.resolveWeb)
  ]
}

const list = () => assets

export default list
export {
  list
}
