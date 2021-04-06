const express = require('express')
const app = express()
const PORT = 8000

/* Defining PUG as view engine */ 
app.set('view engine', 'pug')
/* Static server */
app.use('/static', express.static('public'))

/* Localhost on PORT that we define by the constant */
app.get('/', (req, res) => {
    res.render('index')
})

/* A function to show the upload page*/ 
app.get('/upload', (req, res) => {
    res.render('upload')
})

/* A function to show the about page */
app.get('/about', (req, res) => {
    res.render('about')
})

/* for first steps to db  */
const images = ['1', '2']

app.get('/gallery', (req, res) =>{
    res.render('gallery', { images: images })
})

/* Catching error if the any errors occur in the scripts */
app.listen(PORT, (err) =>{
    if (err) throw err

    console.log(`App is running on port ${ PORT }`)
})