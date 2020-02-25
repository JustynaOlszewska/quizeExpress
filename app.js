const express = require('express');
const gameRootes = require('./rootes/game')
const path = require('path')
const app = express();
app.listen(3000, ()=> {
    console.log('serwer nasluchuje')
})
app.use(express.static(path.join(__dirname, 'public')))
gameRootes(app)
