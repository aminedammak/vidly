const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    }
});

const Customer = mongoose.model("Customer", customerSchema);

const validateCustomer = (customer) => {
    const schema = {
        name: Joi.string().min(2).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(2).max(50).required()
    }

    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
exports.customerSchema = customerSchema;