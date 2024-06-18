const jwt = require("jsonwebtoken")

module.exports.checkToken = async (req, res, next) => {
    const token = req.headers.token;

    console.log(token)

    try {
        if (!token) return res.status(401).json({ message: "Войдите в аккаунт" })

        const decryptToken = jwt.verify(token, process.env.SECRET_KEY);

        req.user = {
            name: decryptToken.name,
            surname: decryptToken.surname,
        }

        next();
    } catch(err) {
        return res.status(500).json({ message: `${ err }` })
    }
}