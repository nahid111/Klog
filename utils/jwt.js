const jsonwebtoken = require("jsonwebtoken");
const koajwt = require("koa-jwt");
const SECRET = "~mM_jWt_SecR3t_T0k3n_!";
const jwtInstance = koajwt({secret: SECRET});


const jwtErrorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (401 == err.status) {
            ctx.response.status = 401;
            ctx.response.body = { error: 'Authorization Failed' };
        } else {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response.body = { error: err.message };
        }
    }
}



module.exports.jwt = () => jwtInstance;
module.exports.errorHandler = () => jwtErrorHandler;

// helper function to issue token
module.exports.issueToken =  (payload) => {
    return jsonwebtoken.sign(payload, SECRET);
};
