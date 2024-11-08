export function errorMiddleware(err, req, res, next)
{
    res.status(500).json({ message: 'An internal server error occurred' })
}