const mongoose = require('mongoose');

//User schema
const userSchema = mongoose.Schema({
    login: {
        type: String,
        required: true},
    password: {
        type: String,
        required: true},
    name: {
        type: String,
        required: true},
    surname: {
        type: String,
        required: true},
    email: {
        type: String,
        required: true}
});

const User = module.exports = mongoose.model('User', userSchema, 'users');