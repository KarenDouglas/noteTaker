const express = require('express')
const apiRouter = require('express').Router()
const fs = require('fs').promises;
const path = require('path');

const dbPath = path.join(__dirname, '../../db.json');

apiRouter.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(dbPath, 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

apiRouter.post('/', async (req, res) => {
    try {
        const data = await fs.readFile(dbPath, 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = apiRouter