const Router = require("koa-router");
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const auth = require("../../middlewares/auth");
const User = require('../../models').User;


const router = new Router({ prefix: '/api/auth' });
// router.use(auth.errorHandler());



// @route   GET  api/auth
// @desc    login user
// @acess   Public
router.post("/", async (ctx) => {

    // Validate data
    const schema = Joi.object().keys({
        email: Joi.string().trim().email({ minDomainAtoms: 2 }).required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "any.empty":
                    case "any.required":
                        err.message = `${err.path} is required`;
                        break;
                    case "string.email":
                        err.message = `${err.path} must be a valid email`;
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
        password: Joi.string().required().error(() => 'Password is required')
    });

    Joi.validate(ctx.request.body, schema, (err, result) => {
        if (err) {
            const { details } = err;
            console.log(details);
            const message = details.map(d => d.message).join(',');
            ctx.throw(400, message);
        }
    });


    const { email, password } = ctx.request.body;

    // If user exists or not
    let the_user = await User.findOne({ where: { email: email } });
    if (!the_user) ctx.throw(400, 'Invalid Credentials');

    // Check if Pssword matches
    const isMatch = await bcrypt.compare(password, the_user.password);
    if (!isMatch) ctx.throw(400, 'Invalid Credentials');

    // Return jsonwebtoken
    const payLoad = {
        user: {
            id: the_user.id,
            name: the_user.name,
            email: the_user.email,
            avatar: the_user.avatar
        }
    }

    ctx.body = { token: auth.issueToken(payLoad) };
});



// @route   POST  api/auth/register
// @desc    Register user
// @acess   public
router.post('/register', async (ctx) => {

    // Validate data
    const schema = Joi.object().keys({
        name: Joi.string().required().error(() => 'name is required'),
        email: Joi.string().trim().email({ minDomainAtoms: 2 }).required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "any.empty":
                    case "any.required":
                        err.message = `${err.path} is required`;
                        break;
                    case "string.email":
                        err.message = `${err.path} must be a valid email`;
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
        password: Joi.string().required().error(() => 'password is required')
    });

    Joi.validate(ctx.request.body, schema, (err, result) => {
        if (err) {
            const { details } = err;
            console.log(details);
            const message = details.map(d => d.message).join(',');
            ctx.throw(400, message);
        }
    });


    // destructuring ctx.request.body
    const { name, email, password } = ctx.request.body;

    // check if user exists
    let the_user = await User.findOne({ where: { email: email } });
    if (the_user) ctx.throw(400, 'User already exists');

    let user = { "name": name, "email": email, "password": '', "avatar": '' }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user = await User.create(user);

    // Return jsonwebtoken
    const payLoad = {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }
    }

    ctx.body = { token: auth.issueToken(payLoad) };
});




module.exports = router

