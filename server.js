const Koa = require("koa");
const logger = require('koa-logger')
const bodyParser = require("koa-bodyparser");
const settings = require('./config/settings.json');

const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');

const app = new Koa();


app.use(logger());
app.use(bodyParser());


// Handle Errors
app.use(async (ctx, next) => {
    try {
        await next();
        // handle 404 not found
        if (ctx.status === 404) ctx.throw(404, "Not Found");
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = { error: err.message };
    }
});

// Routes
app.use(authRouter.routes()).use(authRouter.allowedMethods());
app.use(usersRouter.routes()).use(usersRouter.allowedMethods());




//const PORT = process.env.PORT || 3003;
const PORT = settings['port'] || 3003;
app.listen(PORT, () => { console.log(`🌐  Server started on port ${PORT} ... 🚀`) });



