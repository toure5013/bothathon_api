exports.updateOneUser = async(req, res, next) => {

    //The user id
    const userId = req.params.userId

    // user all info
    const data = req.body
    const firstname = data.firstname
    const lastname = data.lastname
    const email = data.email
    const password = data.password
    const passwordConfirm = data.passwordConfirm

    // verifyData : we use function to check if all of user data sent by user are OK
    const dataVerificationReturn = await verifyData.verifyUserData(
        req,
        res,
        firstname,
        lastname,
        email,
        password,
        passwordConfirm
    );

    // A dataVerificationReturn: if all we verify the image using imageUploadFunction();
    if (dataVerificationReturn[0] == false) {
        //We check if username or email isn't already took
        const emailCheckReturn = checkUserByUsernameAndEmail.checkUserByEmail(email);
        const usernameCheckReturn = checkUserByUsernameAndEmail.checkUserByUsername(username);

        emailCheckReturn.then((emailExistReturn) => {
            if (!emailExistReturn) { //email not taken
                usernameCheckReturn.then((usernameCheckReturn) => {
                    if (!usernameCheckReturn) { //username not taken
                        // call a function to verify image sent by user after check the result
                        var dataImageSaveReturn = imageUploadFunction(req, res, imageFolderName);
                        //We check the dataImageSaveReturn here
                        dataImageSaveReturn.then(
                            (result) => {
                                if (result[0] == false) {
                                    //If all is ok with our image we get the picture name and save
                                    const picturename = imageFolderName + '/' + result[1].picturename;
                                    var passwordHashed = bcrypt.hashSync(password, 10);
                                    //logger
                                    logger.info(JSON.stringify(result));
                                    /*-------------------------------------------------
                                                      save in database
                                    --------------------------------------------------*/
                                    //Update the user by id from database
                                    userDbRequest.update(userId, firstname, lastname, email, passwordHashed, picturename)
                                        .then( //if all is ok
                                            user => {
                                                logger.info("User  id : " + userId + message.success.update);
                                                res.json({
                                                    error: false,
                                                    success: true,
                                                    status: 200,
                                                    user: user,
                                                    new_data: {
                                                        firstname,
                                                        lastname,
                                                        username,
                                                        birthday,
                                                        email,
                                                        password
                                                    },
                                                    message: message.success.update
                                                })
                                            }).catch((e) => { //if err
                                            res.status(500).json({
                                                status: 500,
                                                message: "Error :" + JSON.stringify(e)
                                            });
                                        });
                                } else {
                                    // Something went wrong when trying to save image get the error message to return to user
                                    logger.error(JSON.stringify(result));
                                    res.status(500).send(result);
                                }
                            }).catch((e) => {
                            res.status(500).send("Error" + JSON.stringify(e));
                        });
                    } else {
                        //User username exist
                        res.status(400).json({
                            status: 400,
                            message: 'Username already exist',
                        })
                    }
                }).catch((e) => {
                    /*Something went wrong */
                    res.status(400).json({
                        status: 400,
                        message: JSON.stringify(e),
                    })
                });

            } else {
                /*User email exist */
                res.status(400).json({
                    status: 400,
                    message: 'Email Already exist',
                })
            }
        }).catch((e) => {
            /*Something went wrong */
            res.status(400).json({
                status: 400,
                message: JSON.stringify(e),
            })
        });
    } else {
        var error = dataVerificationReturn;
        res.status(400).json({
            status: 400,
            message: error
        })
    }
}