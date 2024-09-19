const express = require('express')
const app = express()
require('./database/config')
app.listen(3001, () => {
    
    console.log('servidor back', 3001);
})