const apiRouter = require('express').Router()
const fs = require('fs').promises;
const path = require('path');

const dbPath = path.join(__dirname, '../../db.json');

apiRouter.get('/', async (req, res) => {
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

apiRouter.post('/', async (req, res) => {
    try {
        // declares readfile and awaits data
        const data = await fs.readFile(dbPath, 'utf-8');
        // spreads parsed data to dbARrry
       const dbArry = [...JSON.parse(data)]
       /// sets id number for each object
       let setId = 1
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
      await res.json(dbArry)

     fs.writeFile('db.json', JSON.stringify(dbArry), (err) => {
           if(err){
               console.error(err)
            }else{
                console.info(`\nData written to db.jsons`)
                return
            }
        });
    } catch (error) {
        // if the readfile doesn't return relevant data
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = apiRouter