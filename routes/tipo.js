const { Router } = require('express');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Active', 'Inactive' ]),
    check('description', 'invalid.description').not().isEmpty(),

], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        let tipo = new Tipo();
        tipo.name = req.body.name;
        tipo.state = req.body.state;
        tipo.createdAt = new Date();
        tipo.updatedAt = new Date();
        tipo.description = req.body.description;

        tipo = await tipo.save();
        res.send(tipo)

    } catch (error){
        console.log(error);
        res.status(500).send('message error')
    }

});

router.get('/', async function(req, res) {
    try {
        const tipo = await Tipo.find(); // select * from Tipo;
        res.send(tipo);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});

// PUT method route
router.put('/:tipoId', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn(['Active', 'Inactive']),
    check('description', 'invalid.description').not().isEmpty(),

], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipo = await Tipo.findById(req.params.tipoId); //select * from tip where id = ?
        
        if (!tipo) {
            return res.status(400).send('Tipo de pelicula no existe');
        }

        tipo.name = req.body.name;
        tipo.state = req.body.state;
        tipo.createdAt = new Date();
        tipo.updatedAt = new Date();
        tipo.description = req.body.description;


        tipo = await tipo.save(); 
        res.send(tipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar tipo de pelicula')
        
    }
    
  });
  

module.exports = router;