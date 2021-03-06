const Order = require('../../../models/Order')
const moment = require('moment')

function orderController() {
    return {
        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 } })
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0 post-check=0 pre-check=0')
            res.render('customers/orders', { orders: orders, moment: moment })
        },
        store(req, res) {
            //validate request
            const { phone, address } = req.body
            if (!phone || !address) {
                req.flash('error', 'All fileds are requires')
                return res.redirect('/cart')
            }
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })
            order.save().then((result) => {
                req.flash('success', 'Order Placed Successfully')
                delete req.session.cart
                return res.redirect('customer/orders')
            }).catch(err => {
                req.flash('error', 'Somthing Went Wrong')
                return res.redirect('/cart')
            })
        }
    }
}
module.exports = orderController