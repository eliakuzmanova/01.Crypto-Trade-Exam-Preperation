
const cryptoService = require("../services/cryptoService")
const errorUtils = require("../utils/errorUtils")
const paymentUtil = require("../utils/paymentUtil")

exports.getCreateView = (req, res) => {
    res.render("crypto/create")
}

exports.postCreate = async (req, res) => {
    const { name, imageUrl, price, description, payment } = req.body

    try {

        if (!name) {
            throw Error("Name is required")
        }

        if (!imageUrl) {
            throw Error("ImageUrl is required")
        }

        if (!price) {
            throw Error("Price is required")
        }

        if (!description) {
            throw Error("Description is required")
        }

        if (!payment) {
            throw Error("Payment is required")
        }

        await cryptoService.createCrypto(name, imageUrl, price, description, payment, req.user.userId)

    } catch (err) {
        errorUtils.errorResponse(res, "crypto/create", err, 404)
    }
    res.redirect("/catalog")
}

exports.getCatalogView = async (req, res) => {
    try {
        const cryptos = await cryptoService.getAllCrypto()
        res.render("crypto/catalog", { cryptos })
    } catch (err) {
        errorUtils.errorResponse(res, "crypto/catalog", err, 404)
    }
}

exports.getDetailsView = async (req, res) => {

    try {
        const cryptoId = req.params.cryptoId
        const crypto = await cryptoService.getOneCrypto(cryptoId)

        let data;
        if (req.user) {
            const isAuth = req.user.userId

            const isOwner = crypto.owner == req.user.userId && isAuth

            const isUser = crypto.users.includes(req.user.userId) && isAuth && !isOwner

            const isLoggedIn = isAuth && !isOwner && !isUser

            data = { crypto, isLoggedIn, isUser, isOwner }
        } else {
            const noUser = true
            data = { crypto, noUser }

        }
        res.render("crypto/details", data)



    } catch (err) {
        console.log(err);
        res.status(404).redirect("/404")
    }

}

exports.getEditView = async (req, res) => {

    try {
        const cryptoId = req.params.cryptoId

        const crypto = await cryptoService.getOneCrypto(cryptoId)
        const payments = paymentUtil.generatePayment(crypto.payment)

        res.render("crypto/edit", { crypto, payments })
    } catch (err) {
        errorUtils.errorResponse(res, "404", err, 404)
    }


}

exports.postEdit = async (req, res) => {
    const cryptoId = req.params.cryptoId

    try {

        const { name, imageUrl, price, description, payment } = req.body

        if (!name) {
            throw Error("Name is required")
        }

        if (!imageUrl) {
            throw Error("ImageUrl is required")
        }

        if (!price) {
            throw Error("Price is required")
        }

        if (!description) {
            throw Error("Description is required")
        }

        if (!payment) {
            throw Error("Payment is required")
        }

        await cryptoService.editCrypto(name, imageUrl, price, description, payment, cryptoId)

        res.redirect(`/details/${cryptoId}`)
    } catch (err) {
        errorUtils.errorResponse(res, "crypto/edit", err, 404)
    }

}

exports.getDelete = async (req, res) => {

    try {
        const cryptoId = req.params.cryptoId
        await cryptoService.deleteCrypto(cryptoId)
        res.redirect("/catalog")
    } catch (err) {
        errorUtils.errorResponse(res, "404", err, 404)
    }
}