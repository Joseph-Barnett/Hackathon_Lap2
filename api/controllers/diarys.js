const Entries = require('../models/Diary')


async function index(req, res) {
    try {
        const entries = await Entries.getAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ "error": err.message })
    }
}

async function show(req, res) {
    try {
        const id = parseInt(req.params.id);
        const entries = await Entries.getOneById(id);
        res.status(200).json(entries);
    } catch (err) {
        res.status(404).json({ "error": err.message })
    }
}

async function create(req, res) {
    try {
        const entries = await Entries.create(req.body);
        res.status(201).json(entries);
    } catch (err) {
        res.status(404).json({ "error": err.message })
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const entries = await Entries.getOneById(id);
        const result = await entries.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ "error": err.message })
    }
}

async function destroy(req, res) {
    try {
        const id = parseInt(req.params.id);
        const entries = await Entries.getOneById(id);
        const result = await entries.destroy();
        res.status(204).json(result);
    } catch (err) {
        res.status(404).json({ "error": err.message })
    }
}

module.exports = { index, show, create, update, destroy }