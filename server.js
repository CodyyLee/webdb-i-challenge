const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
    try{
        res.json(await db('accounts').select());
    }
    catch(err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "There was an error trying to get all accounts."
        })
    }
})

server.post('/', async (req, res) => {
    try{
        const body=req.body;
        res.status(201).json(await db("accounts").insert(body));
    }
    catch(err) {
        res.status(500).json({
            errorMessage: "There was an error creating this account."
        })
    }
})

server.put("/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try{
        res.json(await db("accounts").where("id", id).update(body));
    }
    catch(err) {
        res.status(500).json({
            errorMessage: "There was an error updating the account."
        });
    }
})

server.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        res.json(await db("accounts").where("id", id).del())
    }
    catch(err) {
        res.status(500).json({
            errorMessage: "There was an error deleting this account."
        })
    }
})

module.exports = server;