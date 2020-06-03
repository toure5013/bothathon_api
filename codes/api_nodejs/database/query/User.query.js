const User = require('../mongodb').UserModel;




// Find all users
const findAll = () => {
    return User.find({});
}

// Create a new user
const insert = (firstname, lastname, ID, email, passwordHashed) => {
    var newUser = new User({
        firstname: firstname,
        lastname: lastname,
        ID: ID,
        email: email,
        password: passwordHashed,
    });

    console.log(newUser);
    return newUser.save(function(err, doc) {
        if (err) return console.error(err);
        console.log("User inserted succussfully!");
    });
}

// Find one user with id
const findOneById = (Userid) => {
    return User.find({ id: Userid })
}

// Find one user with email
const findOneByEmail = (email) => {
    return User.find({ email: email });
}

// Delete everyone with his id
const destroy = (id) => {
    return User.findByIdAndDelete(id);
    // if (!food) res.status(404).send("No item found")
    // res.status(200).send()
}




// Change everyone without a last name to "Doe"
const update = (id, firstname, lastname, email, passwordHashed) => {
    User.findByIdAndUpdate(id, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: passwordHashed,
    })
    return User.save();
}

module.exports = {
    insert,
    findOneById,
    findOneByEmail,
    findAll,
    update,
    destroy
}