const bcrypt = require('bcrypt');
const User = require('../../models/User');
const passport = require('passport')


function authController() {
    return {
        login(req, res) {
            res.render('auth/login');
        },
        postLogin(req, res, next) {
            const { email, password } = req.body
                // validation
            if (!email || !password) {
                req.flash('error', 'All fileds are requires')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.login(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect('/')
                })
            })(req, res, next)
        },
        register(req, res) {
            res.render('auth/register');
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body
                // validation
            if (!name || !email || !password) {
                req.flash('error', 'All fileds are requires')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }
            // check email exitst
            User.exists({ email: email }, (err, result) => {
                    if (result) {
                        req.flash('error', 'Email allready exist')
                        req.flash('name', name)
                        req.flash('email', email)
                        return res.redirect('/register')
                    }
                })
                // has password
            const haspass = await bcrypt.hash(password, 10)
                // create user
            const user = new User({
                name,
                email,
                password: haspass
            })
            user.save().then((user) => {
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Somthing Went Wrong')
                return res.redirect('/register')
            })
        },
        logout(req, res) {
            req.logout()
            return res.redirect('/login')
        }

    }
}
module.exports = authController;