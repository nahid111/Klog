const Router = require("koa-router");
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const auth = require("../../middlewares/auth");
const User = require('../../models').User;


const router = new Router({ prefix: '/api/users' });
router.use(auth.verifyToken());


// @route   GET  api/users
// @desc    get all users
// @acess   Protected
router.get('/', async (ctx) => {
    console.error(ctx.request.user);
    let users = await User.findAll({ attributes: { exclude: ['password'] } });
    ctx.body = users;
});



// @route   GET  api/users/get_auth_user
// @desc    get current user
// @acess   Protected
router.get('/get_auth_user', async (ctx) => {
    const the_user = await User.findOne({
        where: { id: ctx.request.user.id },
        attributes: { exclude: ['password'] }
    });
    if (!the_user) ctx.throw(400, 'User Not Found');
    ctx.body = the_user;
});



// @route   GET  api/users/:id
// @desc    get single user by id
// @acess   Protected
router.get('/:id', async (ctx) => {// check if user exists
    const the_user = await User.findOne({
        where: { id: ctx.params.id },
        attributes: { exclude: ['password'] }
    });
    if (!the_user) ctx.throw(400, 'User Not Found');
    ctx.body = the_user;
});


// @route   POST  api/users
// @desc    create user
// @acess   Protected
router.post('/', async (ctx) => {

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

    // Get user's Gravatar
    user.avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user = await User.create(user);
    ctx.body = user;
});


// @route   PUT  api/users/:id
// @desc    update user by id
// @acess   Protected
router.put('/:id', async (ctx) => {

    // Validate data
    const schema = Joi.object().keys({
        name: Joi.string().trim().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "any.empty":
                    case "any.required":
                        err.message = `${err.path} is required`;
                        break;
                    default:
                        break;
                }
            });
            return errors;
        })
    });

    Joi.validate(ctx.request.body, schema, (err, result) => {
        if (err) {
            const { details } = err;
            console.log(details);
            const message = details.map(d => d.message).join(',');
            ctx.throw(400, message);
        }
    });

    // check if user exists
    let the_user = await User.findOne({ where: { id: ctx.params.id } });
    if (!the_user) ctx.throw(400, 'User Not Found');

    // let user = await User.update(ctx.request.body.name, { where: { id: ctx.params.id } });
    let user = await the_user.update({ name: ctx.request.body.name });
    ctx.body = user;
});


// @route   DELETE  api/users
// @desc    delete user by id
// @acess   Protected
router.del('/:id', async (ctx) => {
    // check if user exists
    const the_user = await User.findOne({ where: { id: ctx.params.id } });
    if (!the_user) ctx.throw(400, 'User Not Found');

    // const user = await User.destroy({ where: { id: ctx.params.id } });
    const user = await the_user.destroy();
    ctx.body = user;
});




module.exports = router

