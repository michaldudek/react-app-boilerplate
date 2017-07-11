import express from 'express'

import healthcheck from './endpoints/healthcheck'

/**
 * Register API middleware.
 *
 * @return {Express}
 */
export default function () {
  const router = express.Router()

  router.get('/healthcheck', healthcheck)

  return router
}
