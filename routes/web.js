const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/orderController");
const AdminOrderController = require("../app/http/controllers/admin/orderController");
const homeController = require("../app/http/controllers/homeController");
const guest = require("../app/http/middleware/guest");
const auth = require("../app/http/middleware/auth");
const admin = require("../app/http/middleware/admin");

function initRout(app) {
    app.get('/', homeController().index)
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)
        //customer routes
    app.post('/orders', auth, orderController().store)
    app.post('/customer/orders', auth, orderController().index)
        //admin routes
    app.post('/admin/orders', admin, AdminOrderController().index)
}
module.exports = initRout;