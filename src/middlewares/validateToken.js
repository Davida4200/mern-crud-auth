import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).send({ message: "Acceso denegado, no existe token" });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).send({ message: "Acceso denegado, token inválido" });

    req.user = user;

    next();
  });

}