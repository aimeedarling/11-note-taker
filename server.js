const express = require('express')
const PORT = process.env.PORT || 3001
const path = require('path')
const api = require('./routes/notes.js')
// const fs = require('fs')



const app = express()

// middleware for parsing JSON and urlencoded data
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', api)
app.use(express.static('public'))

// GET route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})



app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
)