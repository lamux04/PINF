import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next)
{
    const token = req.cookies.authToken          // El token esta en la cabecera authorization

    if (!token) return res.status(403).json({ message: 'Token no provisto', token: false })
    
    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error)
    {
        return res.status(401).json({ message: 'Token invalido', token: false})
    }
}