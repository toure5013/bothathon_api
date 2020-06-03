const Token = require('../mongodb').TokenModel;

/*-------------------------------------------------------
                        Request
-------------------------------------------------------*/
// Find all users
const findAll = () => {
    return Token.find({});
}

// Find one user with id
const findOneToken = (token) => {
    return Token.find({ token: token });
}


// Create a new user
const insert = (email, token) => {
    var Token = new Token({
        email: email,
        token: token
    });
    console.log(Token);
    return Token.save(function(err, doc) {
        if (err) return console.error(err);
        console.log("Token inserted succussfully!");
    });
}

// Delete everyone with his id
const destroy = (id) => {
    return Token.findByIdAndDelete(id);
}

module.exports = {
    insert,
    findOneToken,
    findAll,
    destroy
}