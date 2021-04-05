const express = require('express')
const app = express()
const PORT = 8000

/* Defining PUG as view engine */ 
app.set('view engine', 'pug')

/* Localhost on PORT that we define by the constant */
app.get('/', (req, res) => {
    res.render('homepage')
})

/* Catching error if the any errors occur in the scripts */
app.listen(PORT, (err) =>{
    if (err) throw err

    console.log(`App is running on port ${ PORT }`)
})