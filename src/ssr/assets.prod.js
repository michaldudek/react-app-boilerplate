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
    ...glob.sync(paths.dist + '/app.*.css').map(paths.resolveWeb)
  ],
  scripts: [
    ...glob.sync(paths.dist + '/vendors.*.js').map(paths.resolveWeb),
    ...glob.sync(paths.dist + '/app.*.js').map(paths.resolveWeb)
  ]
}

const list = () => assets

export default list
export {
  list
}
