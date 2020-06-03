const User = require('../mongodb').UserModel;


// Find all users
const findAll = () => {
    return User.find({});
}

// Create a new user
const insert = (firstname, lastname, ID, email, password) => {

    // var myData = new User(req.body);
    // myData.save()
    //     .then(item => {
    //         res.send("item saved to database");
    //     })
    //     .catch(err => {
    //         res.status(400).send("unable to save to database");
    //     });
    var message = {
        error: false,
        success: true,
        message: "User inserted success",
        status: 200
    }
    var newUser = new User({
        firstname: firstname,
        lastname: lastname,
        ID: ID,
        email: email,
        password: password,
    });


    console.log(newUser);

    newUser.save()
        .then(item => {
            console.log(item)
            console.log('ok ok ok ok ')
            return message;
        })
        .catch(err => {
            console.log(err);
            message = {
                error: true,
                success: false,
                message: "User not insertedn retry!",
                status: 200
            }
            return message;
        });
}

// Find one user with id
const findOneById = (Userid) => {
    return User.find({ id: Userid })
}

// Find one user with email
const findOneByEmail = (email) => {
    const UserFind = User.find({ email: email });
    if (UserFind.length !== 0) {
        return UserFind;
    } else {
        return false;
    }

}

// Delete everyone with his id
const destroy = (id) => {
    return User.findByIdAndDelete(id);
    // if (!food) res.status(404).send("No item found")
    // res.status(200).send()
}




// Change everyone without a last name to "Doe"
const update = (id, firstname, lastname, email, passwordHashed) => {
    var message = {
        error: false,
        success: true,
        message: "User updated with success",
        status: 200
    }
    var updateUser = User.findByIdAndUpdate(id, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: passwordHashed,
    }, function(err, result) {

        if (err) {
            console.log(err);
            message = {
                error: true,
                success: false,
                message: "User not insertedn retry!",
                status: 200
            }
            return message;
        } else {
            return message;
        }

    });
}

module.exports = {
    insert,
    findOneById,
    findOneByEmail,
    findAll,
    update,
    destroy
}