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

/* A controller to show the upload page*/ 
app.get('/upload', (req, res) => {
    res.render('upload')
})

/* A controller to show the detail page */
app.get('/gallery/:id', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/images.json', (err, data) => {
        if (err) throw err

        const images = JSON.parse(data)

        const image = images.filter( image => image.id == id)[0]

        res.render('detail', { image: image })
    })
})

/* POST method to upload the image with title and description */
app.post('/upload', (req, res) => {
    const title = req.body.title
    const description = req.body.description

    if (title.trim() === '' && description.trim() === ''){
        res.render('upload', { error: true })
    } else {
        fs.readFile('./data/images.json', (err, data) => {
            if (err) throw err

            const images = JSON.parse(data)

            images.push({
                id: id (),
                title: title,
                description: description
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

        fs.writeFile('./data/images.json', JSON.stringify(filteredImages), err => {
            if (err) throw err  
            
            res.render('gallery', { images: filteredImages, deleted: true})
        })
    })
})

/* A controller to show the about page */
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

/* function to generated a random id */ 
function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };