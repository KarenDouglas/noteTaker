const apiRouter = require('express').Router()
const fs = require('fs').promises;
const path = require('path');

const dbPath = path.join(__dirname, '../../db.json');
// sets id number for each object
let setId = 1
apiRouter.get('/notes', async (req, res) => {
    try {
        // declares readfile and awaits its data
        const data = await fs.readFile(dbPath, 'utf-8');
        // return file as json data
        return res.json(JSON.parse(data));
    } catch (error) {
        console.error(error);
       return res.status(500).send('Internal Server Error');
    }
});

apiRouter.post('/notes', async (req, res) => {
    try {
        // declares readfile and awaits data
        const data = await fs.readFile(dbPath, 'utf-8');
        // spreads parsed data to dbARrry
        const dbArry = [...JSON.parse(data)]
        
        // gets title in text values from request body in post 
        const {title, text} = req.body
        // declares data object to be inserted in dbarry
        const newNote = {
        title,
        text,
        id: setId++
    }
    // if request has a title and text
    if(title && text){
        // sets object to relevant values
        newNote.title = title
        newNote.text = text
    }
    // pushes new object into dbarry
    dbArry.push(newNote) 
    // writes dbarry to dbjson file
    
       fs.writeFile('db.json', JSON.stringify(dbArry))
       .then(()=>{
        console.info(`\nData written to db.jsons`)
                return res.status(200).json(dbArry)
       })
       .catch((err) => {
               console.error(err)
               res.status(500).json(err)
        });
            
        
    } catch (error) {
        // if the readfile doesn't return relevant data
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
apiRouter.delete('/notes/:id', async (req, res) => {
    // gets the id from req params
    const requestedId = parseFloat(req.params.id)
    // gets data from file
    try{
        const data = await fs.readFile(dbPath, 'utf-8');
    let dbArry = [...JSON.parse(data)]
    // if there are req params    
        if (requestedId) {
        const dbDeleted=  dbArry.filter((data)=> data.id !== requestedId)
        // writes updated array to file
        fs.writeFile('db.json', JSON.stringify(dbDeleted))
        .then(()=>{
            console.info(`file deleted and updated`)
            res.status(200).json(dbArry)
            })
            .catch((err) => {
                console.error(err)
                res.status(500).json(err)
            }) 
        }
    } catch (error) {
        // if the readfile doesn't return relevant data
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    
});
module.exports = apiRouter