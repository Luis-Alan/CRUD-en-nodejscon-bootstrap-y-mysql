const express = require('express');
const { patch } = require('./router');
const app = express();
const path=require('path');
const { json } = require('express');

//configuraciones
//app.engine('html', require('ejs').renderFile);
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//se indica como se deberan capturar los datos de los forularios
app.use(express.urlencoded({extended:false}));
app.use(express(json));

//rutas
app.use('/',require('./router'));

app.listen(3000, ()=>{
    console.log('corriendo en el puerto 3000')
});