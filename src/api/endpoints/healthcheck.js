/**
 * Simple health check endpoint that returns HTTP 201.
 *
 * @param  {Request}  req Request.
 * @param  {Response} res Response.
 */
export default function (req, res) {
  res.status(201).end()
}
