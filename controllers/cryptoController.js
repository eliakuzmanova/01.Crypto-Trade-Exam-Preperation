
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

exports.getDetailsView = async (req, res) => {
    
    try{
        const cryptoId = req.params.cryptoId
        const crypto = await cryptoService.getOneCrypto(cryptoId)

        let data;
    if (req.user) {
        const isAuth = req.user.userId
   
        const isOwner = crypto.owner == req.user.userId && isAuth

        const isUser = crypto.users.includes(req.user.userId) && isAuth && !isOwner

        
        data = {crypto, isLoggedIn, isUser, isOwner}
    } else {
        const noUser = true
        data = {crypto, noUser} 
        
    }
        res.render("crypto/details", data)
   

    
    } catch(err) {
        console.log(err);
        res.status(404).redirect("/404")
    }
    
}