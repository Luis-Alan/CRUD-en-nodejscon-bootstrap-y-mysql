const { render } = require('ejs');
const express= require('express');
const router = express.Router();



const conexion = require('./database/db');

router.get('/', (req, res)=>{

   conexion.query('SELECT * FROM usuarios',(error,results)=>{
     if(error){
         throw error;
     }else{
         res.render('index',{results:results});
     }
 });

});

//ruta para crear registros
router.get('/create', (req,res)=>{
    res.render('create');
});

//ruta para editar los registros
router.get('/edit/:id', (req,res)=>{
    const id =req.params.id;
    conexion.query('SELECT * FROM usuarios WHERE id=?',[id],(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('edit',{user:results[0]});
        }
    });
});

//ruta para eliminar registros 
router.get('/delete/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('DELETE FROM usuarios WHERE id = ?', [id],(error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/');//una ves que elimina regresamos a la raiz
        }
    })
});

// aqui se invoca el crud
const crud =require('./controllers/crud');
router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports=router;