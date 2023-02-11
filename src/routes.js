const router = require("express").Router();

const homeController = require("../controllers/homeController")
const authController = require("../controllers/authController")
const cryptoController = require("../controllers/cryptoController")
const {authMiddleware} = require("../middlewares/authMiddleware")

//add middleware to the needed routes <<<<-----------------------

router.get("/", homeController.getHomeView)
router.get("/404", homeController.get404View)

router.get("/register", authController.getRegisterView);
router.post("/register", authController.postRegister);

router.get("/login", authController.getLoginView);
router.post("/login", authController.postLogin);

router.get("/logout", authController.getLogout);


router.get("/create", cryptoController.getCreateView);
router.post("/create", cryptoController.postCreate)

router.get("/catalog", cryptoController.getCatalogView);

module.exports = router