const express = require('express')
const app = express()
const PORT = 8000

const fs = require('fs')

/* Defining PUG as view engine */ 
app.set('view engine', 'pug')
/* Static server */
app.use('/static', express.static('public'))
/* It is a middleware that built in express any incoming requests */ 
app.use(express.urlencoded({ extended: false }))

/* Localhost on PORT that we define by the constant */
app.get('/', (req, res) => {
    res.render('index')
})

/* A function to show the upload page*/ 
app.get('/upload', (req, res) => {
    res.render('upload')
})

/* POST method  */
app.post('/upload', (req, res) => {
    const title = req.body.title
    const desc = req.body.desc

    if (title.trim() === '' && desc.trim() === ''){
        res.render('upload', { error: true })
    } else {
        fs.readFile('./data/images.json', (err, data) => {
            if (err) throw err

            const images = JSON.parse(data)

            images.push({
                id: id(),
                title: title,
                description: desc
            })

            fs.writeFile('./data/images.json', JSON.stringify(images), err =>{
                if (err) throw err

                res.render('upload', { success: true })
            })
        })
    }

    res.render('upload')
})

/* delete  */
app.get('/:id/delete', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/images.json', (err, data) => {
        if (err) throw err

        const images = JSON.parse(data)

        const filteredImages = images.filter(image => image.id != id)

        fs.writeFile('./data/images.json', JSON.stringify(filteredImages), (err) => {
            if (err) throw err  
            
            res.render('gallery', { images: filteredImages, delete: true})
        })
    })
})

/* A function to show the about page */
app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/gallery', (req, res) =>{

    fs.readFile('./data/images.json', (err, data) => {
        if (err) throw err

        const images = JSON.parse(data)

        res.render('gallery', { images: images })
    })
})

/* Catching error if the any errors occur in the scripts */
app.listen(PORT, (err) =>{
    if (err) throw err

    console.log(`App is running on port ${ PORT }`)
})

function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };