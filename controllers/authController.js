
const validator = require('validator')
const authService = require("../services/authService")
const getErrorMessage = require("../utils/errorUtils")

const errorResponse = (res, template, erorr,status = 404) => {
    return res.status(status).render(template, getErrorMessage(erorr))
}

exports.getRegisterView = (req, res) => {
    res.render("auth/register")
}

exports.postRegister = async (req, res) => {
    const { username, email, password, repeatPassword } = req.body


    try {
        if(!username) {
            throw Error("Username is required")
        }

        if(!email) {
            throw Error("Email is required")
        }
        if(!password) {
            throw Error("Password is required")
        }
        if(!repeatPassword) {
            throw Error("Confirm password is required")
        }
        const validPass = validator.isStrongPassword(password)
        if (!validPass) {
            throw Error("Not enough strong password")
        }

        if (password !== repeatPassword) {
            throw Error("Passwords missmatch")
        }

        await authService.register(username, email, password)

        const token = await authService.login(req, res, email, password)
        res.cookie("auth", token)
        res.redirect("/")
    } catch (err) {
       errorResponse(res, "auth/register", err, 404);
    };


}

exports.getLoginView = (req, res) => {
    res.render("auth/login")
}

exports.postLogin = async (req, res) => {
    const { email, password } = req.body
    //TODO ERORR HANDLIN
    try {
        const token = await authService.login(req, res, email, password)
        res.cookie("auth", token)
        res.redirect("/")
    } catch (err) {
        errorResponse(res, "auth/login", err, 404);;
    }
}


exports.getLogout = (req, res) => {
    res.clearCookie("auth")
    res.redirect("/")
}

module.export = errorResponse;