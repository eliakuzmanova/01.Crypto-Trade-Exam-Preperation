
const cryptoService = require("../services/cryptoService")
const errorUtils = require("../utils/errorUtils")

exports.getCreateView = (req, res) => {
    res.render("crypto/create")
}

exports.postCreate = async (req, res) => {
    const {name, imageUrl, price, description, payment} = req.body

    try {
      
        if(!name) {
            throw Error("Name is required")
        }
        
        if(!imageUrl) {
            throw Error("ImageUrl is required")
        }
      
        if(!price) {
            throw Error("Price is required")
        }
       
        if(!description) {
            throw Error("Description is required")
        }
   
        if(!payment) {	
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
        res.render("crypto/catalog", {cryptos})
    } catch(err) {
        errorUtils.errorResponse(res, "crypto/catalog", err, 404)
    }
}