const express = require('express')
const app = express()
const port = 5005

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://seong:9900@cluster-ay.ee6ix84.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

app.get('/', (req, res) => res.send('재실행하기'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))