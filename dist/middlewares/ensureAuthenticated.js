import jwt from "jsonwebtoken";
export function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: "Token ausente" });
        return;
    }
    const [, token] = authHeader.split(" ");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
        };
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
}
