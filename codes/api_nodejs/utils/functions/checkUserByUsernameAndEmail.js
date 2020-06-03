const logger = require('../../app/middlewares/logMiddleware').logMiddleware;
const userDbRequest = require('../../database/query/User.query');


//change this by using regex to factorise it 
data = 1;
if (isNaN(data)) {
    if (data /*regex email*/ ) {
        //find by email
    } else if (data /*Regex username */ ) {

    } else {
        //message --- not existe
    }
} else {
    //find by id 'cause we have a number       
}


exports.checkUserByEmail = async function(email) {
    var emailExist = false;
    //Before adding user we are checking if this email is not already taken
    await userDbRequest.findOneByEmail(email)
        .then(
            user => {
                console.log("--------------je verfie email")

                if (user) {
                    //email already-taken
                    emailExist = true;
                }
            })
        .catch((e) => { //if err
            logger.error(JSON.stringify(e));
            res.json({
                error: true,
                success: false,
                status: 500,
                message: "Error :" + e
            });
        });
    return emailExist;
}


// exports.checkUserByUsername = async function(username) {
//     var usernameExist = false;
//     await userDbRequest.findOneByUsername(username)
//     .then(
//         user => {
//             if (user) {
//                 //username already-taken we put DataAlreadyTaken to true;
//                 console.log("username dejà pri")
//                 usernameExist = true;
//             }
//         }).catch((e) => { //if err
//         logger.error(JSON.stringify(e));
//         res.json({
//             error : true,
//             success : false,
//             status: 500,
//             message: "Error :" + e
//         });
//     });
//     return usernameExist;
// }