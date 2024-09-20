const express = require('express')
const app = express()


app.use(express.json())


app.use('/api', require('./routes/index.routes'))


app.listen(3001, () => {
    console.log('servidor back', 3001);
})