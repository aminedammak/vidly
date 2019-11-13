const express = require("express");
const { Customer, validateCustomer, customerSchema } = require("../models/customer");

const router = express.Router();
const app = express();

router.post("/", async (req, res) => {

    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });

    customer = await customer.save();
    res.send(customer);

});

router.get("/", async (req, res) => {
    const customers = await Customer.find();
    return res.send(customers);
});

router.get("/:id", async (req, res) => {

    const id = req.params.id;

    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).send("No customer with the given id");

    return res.send(customer);

});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const customer = await Customer.findByIdAndRemove(id);

    if (!customer) return res.status(404).send("No customer with the given id was found");

    return res.send(customer);

});

router.put("/:id", async (req, res) => {
    const id = req.params.id;

    const customer = await Customer.findByIdAndUpdate(id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    }, { new: true });

    if (!customer) return res.status(404).send("no customer found with the given id");

    return res.send(customer);

});


module.exports = router;
