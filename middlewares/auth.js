const jsonwebtoken = require('jsonwebtoken');
const jwtSecret = require('../config/settings.json')['jwtSecret'];


// const errorHandler = async (ctx, next) => {
//     try {
//         await next();
//         // handle 404 not found
//         if (ctx.status === 404) {
//             ctx.throw(404, "Not Found");
//         }
//     } catch (err) {
//         ctx.response.status = err.statusCode || err.status || 500;
//         ctx.response.body = { error: err.message };
//     }
// }


const verifyToken = async (ctx, next) => {
    // Get token from Header
    const token = ctx.request.header.x_auth_token;

    // Check if tokn exists
    if (!token) ctx.throw(401, 'Authorization Failed');

    // Verify token
    const decoded = jsonwebtoken.verify(token, jwtSecret);
    // Send User if verified
    ctx.request.user = decoded.user;
    // execute next function/route after auth middleware completion
    await next();
}



// helper function to issue token
module.exports.issueToken = (payload) => {
    const token = jsonwebtoken.sign(
        payload,
        jwtSecret,
        { expiresIn: 360000 }
    );
    return token;
};


module.exports.errorHandler = () => errorHandler;
module.exports.verifyToken = () => verifyToken;


