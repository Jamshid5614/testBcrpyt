const UsersModel = require('../models/user')
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrpyt = require('bcrpyt');



exports.signIn = async (req,res) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
    const validateResult = schema.validate({email: req.body.email,password: req.body.password});
    const {error} = validateResult;
    if(!error) {
        const user = await UsersModel.findOne({email: req.body.email,password: req.body.password});
        if(!user) {
            res.json({
                success: false,
                message: 'Email or password is wrong'
            });
        } else {
            try {
                if(await bcrpyt.compare(req.body.password,user.password)) {
                    res.send('success');
                } else {
                    res.send('Not allowed');
                }
                res.json({
                    success: true,
                    payload: user
                })
            } catch {

            }
        }
    } else {
        res.status(400).send({
            success: false,
            message: error.details[0].message
        })
    }
}
exports.signUp = async (req,res) => {
    const schema = Joi.object({
        name: Joi.string().required().trim(),
        email: Joi.string().required().trim(),
        password: Joi.string().required().trim(),
    })
    const validateResult = schema.validate(req.body);
    const {error} = validateResult;
    if(!error) {
        const salt = await bcrpyt.genSalt();
        const hashedPassword = await bcrpyt.hash(req.body.password,salt);
        console.log(hashedPassword);
        const savedUser = await UsersModel.create({
            name: req.body.name,
            name: req.body.email,
        });
        res.json({
            success: true,
            payload: savedUser,
        })
    } else {
        res.status(400).send(error.details[0].message);
    }
}
exports.getUsers = async (req,res) => {
    const users = await UsersModel.find();
    if(!users || users.length == 0) {
        res.status(404).send('Users not found');
    } else {
        res.json(users);
    }
}
exports.getUser = async (req,res) => {
    const user = await UsersModel.findOne({_id: req.params.id});
    if(!user) {
        res.status(404).send('User not found');
    } else {
        res.json(user);
    }
}



