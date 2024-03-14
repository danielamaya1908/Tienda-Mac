const { Router } = require("express");
const router = Router();
const postProduct = require("../controllers/product/postProduct");
const getProductByPk = require("../controllers/product/getProductByPk");
const getProduct = require("../controllers/product/getProduct");
const getProductOrderBy = require("../controllers/product/getProductOrderBy");
const deleteProductByPk = require("../controllers/product/deleteProductByPk");
const putProductbyID = require("../controllers/product/putProductbyID");
const searchProduct = require("../controllers/product/searchProduct");
const postRegister = require("../controllers/User/postRegister");

const postLogin = require("../controllers/User/postLogin");
const PostRegisterGoogle = require("../controllers/User/postRegisterGoogle");
const getUser = require("../controllers/User/getUser");
const getProductAdmin = require("../controllers/product/getProductAdmin");
const getAllUsers = require("../controllers/User/getAllUser");

const postShopping = require("../controllers/Carrito/PostShopping");
const putShopping = require("../controllers/Carrito/PutShopping");

const putUserById = require("../controllers/User/putUserById");

const getProperty = require("../controllers/product/getProperty");

const getDiscountProducts = require("../controllers/product/getDiscountProducts");
const getUserByEmail = require("../controllers/User/getUserByEmail");
const postFavorite = require("../controllers/User/postFavorite");
const deleteFavorite = require("../controllers/User/deleteFavorite");
const getAllFavorites = require("../controllers/User/getAllFavorites");
const getFavsByProduct = require("../controllers/User/getAllFavsByProduct");
const setFavoritesByUser = require("../controllers/User/getFavoritesByUser");
const getOneFavByUser = require("../controllers/User/getOneFavByUser");

const putPassword = require("../controllers/User/putPassword");
const captureOrder = require("../controllers/paypal/captureOrder");
const createOrder = require("../controllers/paypal/createOrder");
const cancelOrder = require("../controllers/paypal/cancelOrder");
const getBrands = require("../controllers/product/getBrands");

const getStock = require("../controllers/stock/getStockByProductId");
const getAllPurchases = require("../controllers/User/getAllPurchases");
const addToCart = require("../controllers/Carrito/addToCart");
const getShoppingCart = require("../controllers/Carrito/getShoppingCart");
const deleteProduct = require("../controllers/Carrito/deleteProductController");
const postReview = require("../controllers/reviews/postReview");
const putReview = require("../controllers/reviews/putReview");
const getReview = require("../controllers/reviews/getReview");
const getCategory = require("../controllers/product/getCategory");
const getSubCategory = require("../controllers/product/getSubCategory");
const PostRecoverPassword = require("../controllers/User/postRecoverPassword");
const PostUpdatePassword = require("../controllers/User/postUpdatePassword");

const postShoppingProduct = require("../controllers/Cart/postShoppingProduct");
const putShoppingProduct = require("../controllers/Cart/putShoppingProduct");
const deleteShoppingProduct = require("../controllers/Cart/deleteShoppingProduct");
const putAllCart = require("../controllers/Cart/putAllCart");
const getUserCart = require("../controllers/Cart/getUserCart");

const postOrder = require("../controllers/Order/postOrder");
const captureUserOrder = require("../controllers/Order/captureUserOrder");




// Nuevo carrito rutas
router.post("/postShoppingProduct", postShoppingProduct);
router.put("/putShoppingProduct", putShoppingProduct);
router.put("/putAllCart", putAllCart);
router.delete("/deleteShoppingProduct", deleteShoppingProduct);
router.get("/getUserCart", getUserCart);

// Nuevas órdenes
router.post("/postOrder", postOrder);
router.get("/captureUserOrder", captureUserOrder);

// Rutas de Productos
router.get("/product", getProduct);
router.get("/search/:product", searchProduct);
router.get("/detail/:id", getProductByPk);
router.get("/admin", getProductAdmin);
router.get("/property", getProperty);
router.get("/product/discount", getDiscountProducts);
router.get("/product/orderBy", getProductOrderBy);
router.get("/product/brands", getBrands);
router.get("/product/category", getCategory);
router.get("/product/sub-category", getSubCategory);

router.post("/product", postProduct);
router.delete("/deleteProduct/:id", deleteProductByPk);
router.put("/product/:id", putProductbyID);

// Rutas de Usuarios
router.post("/userRegister", postRegister);
router.post("/google", PostRegisterGoogle);
router.post("/login", postLogin);
router.post("/password-recover", PostRecoverPassword);
router.post("/password-update", PostUpdatePassword);

router.put("/user/:id", putUserById);
router.put("/user/:id/password", putPassword);

router.get("/user/:id", getUser);
router.get("/user", getUserByEmail);
router.get("/users", getAllUsers);
router.get("/purchases/:id", getAllPurchases);

// Rutas de Favoritos
router.post("/postFavorite", postFavorite);
router.delete("/deleteFavorite", deleteFavorite);
router.get("/getAllFavorites", getAllFavorites);
router.get("/getFavsByProduct", getFavsByProduct);
router.get("/setFavoritesByUser", setFavoritesByUser);
router.get("/getOneFavByUser", getOneFavByUser);

// Rutas de Carrito
router.post("/shoppingCart", postShopping);

router.put("/shopping", putShopping);

router.post("/addToCart", addToCart);

router.get("/shoppingCart/:id", getShoppingCart);

router.delete("/shoppingCart", deleteProduct);

// Rutas PayPal
router.post("/create-order", createOrder);
router.get("/capture-order", captureOrder);
router.get("/cancel-order", cancelOrder);

//Rutas Stock
router.get("/stock/:productId", getStock);

//Rutas Reviews
router.post("/reviews", postReview);
router.put("/reviews", putReview);
router.get("/reviews", getReview);

module.exports = router;
