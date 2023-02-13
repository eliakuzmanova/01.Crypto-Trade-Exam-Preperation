const router = require("express").Router();

const homeController = require("../controllers/homeController")
const authController = require("../controllers/authController")
const cryptoController = require("../controllers/cryptoController")
const {isAuth} = require("../middlewares/authMiddleware")


router.get("/", homeController.getHomeView)
router.get("/404", homeController.get404View)

router.get("/register", authController.getRegisterView);
router.post("/register", authController.postRegister);

router.get("/login", authController.getLoginView);
router.post("/login", authController.postLogin);

router.get("/logout", isAuth, authController.getLogout);


router.get("/create", isAuth, cryptoController.getCreateView);
router.post("/create", isAuth,cryptoController.postCreate)

router.get("/catalog", cryptoController.getCatalogView);

router.get("/details/:cryptoId",cryptoController.getDetailsView)

router.get("/edit/:cryptoId",cryptoController.getEditView)
router.post("/edit/:cryptoId",cryptoController.postEdit)

router.get("/delete/:cryptoId",cryptoController.getDelete)

router.get("/buy/:cryptoId",isAuth,cryptoController.getBuy)

module.exports = router