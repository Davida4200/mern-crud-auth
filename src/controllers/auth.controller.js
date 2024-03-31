import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";

// ... Registro de usuarios
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();

    const token = await createAccesToken({ id: userSaved._id });
    res.cookie("token", token);

    res.status(201).send({
      message: "Usuario registrado",
      data: {
        username: userSaved.username,
        email: userSaved.email,
        id: userSaved._id,
        creadAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al registrar el usuario",
      error,
    });
  }
};


// ... Inicio de sesión
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).send({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Contraseña incorrecta" });
    }

    const token = await createAccesToken({ id: userFound._id });

    res.cookie("token", token);

    res.status(201).send({
      message: "Inicio de sesión exitoso",
      data: {
        username: userFound.username,
        email: userFound.email,
        id: userFound._id,
        creadAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al registrar el usuario",
      error: error.message,
    });
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  return res.sendStatus(200).send({
    message: "Cierre de sesión exitoso"
  })
}

export const profile = async (req, res) => {

  const userFound = await User.findById(req.user.id)

  if (!userFound) {
    return res.status(400).send({ message: "Usuario no encontrado" });
  }

  return res.json({
    username: userFound.username,
    email: userFound.email,
    id: userFound._id,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  })
}