const {errorResponse} = require("./authController")
const cryptoService = require("../services/cryptoService")

exports.getCreateView = (req, res) => {
    res.render("crypto/create")
}

exports.postCreate = async (req, res) => {
    const {name, imageUrl, price, description, payment} = req.body

    try {
        const crypto = await cryptoService.createCrypto(name, imageUrl, price, description, payment)
    } catch (err) { 
        errorResponse(res, "crypto/create", err, 404)
    }
    res.render("crypto/catalog") // <------------- add cryptos object --------------------
}