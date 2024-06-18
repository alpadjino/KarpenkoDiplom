const userModel = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
    const { surname, name, email, password} = req.body;
    const candidate = await userModel.findOne({ email }).select("password");

    if (candidate) return res
      .status(400)
      .json({ message: "Такой пользователь уже существует" });

    const hashedPassword = await bcrypt.hash(password, 4);
    
    const user = await userModel.create({
        email: email,
        name: name,
        surname: surname,
        password: hashedPassword,
    });

    delete password;

    return res.status(200).json({
        message: "Регистрация прошла успешно"
    });
} 

module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    const candidate = await userModel.findOne({ email }).select("password");

    if (!candidate) return res.status(403).json({ message: "Неверный логин или пароль" });

    const passwordMatch = await bcrypt.compare(password, candidate.password);

    if (!passwordMatch) return res.status(403).json({ message: "Неверный логин или пароль" });
    
    const payload = {
        id: candidate._id.toString(),
        email: email,
        name: candidate.name,
        surname: candidate.surname,
    }
    
    const options = {
      expiresIn: "1d",
    };
    
    const token = jwt.sign(payload, process.env.SECRET_KEY, options);

    return res.send(token)
}

module.exports.getAllUsers = async (req, res) => {
    try{
        const users = await userModel.find({}, { password: 0 });
        
        if (!users) return res.status(404).json({ message: "Нет пользователей" })

        return res.status(200).json(users);
    } catch(err) {
        return res.status(500).json({
            message: `${err}`
        })
    }
}

module.exports.getMe = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const userData = jwt.verify(token, process.env.SECRET_KEY)

        const candidate = await userModel
          .findById(userData.id)

        if (!candidate) return res.status(404).json({
            message: "Пользователь не найден"
        });

        return res.status(200).json(candidate);
    } catch (error) {
        return res.status(500).json({
            message: `${error}`
        })
    }
}

module.exports.findUserById = async (req, res) => {
    try {
        const userId = req.headers.userid;

        const candidate = await userModel.findById(userId)
        
        if (!candidate) return res.status(404).json({ message: "Пользователь не найден" });
        
        return res.status(200).json(candidate);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.editUserData = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId).select("password");

    console.log(req.body)

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(403).json({ message: "Неверный логин или пароль" });
    }

    user.name = req.body.name;
    user.surname = req.body.surname;
    user.email = req.body.email;

    const hashedPassword = await bcrypt.hash(req.body.password, 4);
    user.password = hashedPassword;

    const updatedUser = await user.save();
 
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Ошибка сервера", error: error.message });
  }
};