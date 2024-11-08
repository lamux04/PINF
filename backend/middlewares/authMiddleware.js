import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next)
{
    const token = req.headers['authorization']          // El token esta en la cabecera authorization

    if (!token) return res.status(403).json({ message: 'Token no provisto' })
    
    try
    {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error)
    {
        return res.status(401).json({ message: 'Token invalido'})
    }
}