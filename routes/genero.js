const { Router } = require('express');
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Active', 'Inactive' ]),
    check('createdAt', 'invalid.name').not().isEmpty(),
    check('updatedAt', 'invalid.name').not().isEmpty(),
    check('description', 'invalid.name').not().isEmpty(),


], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        let genero = new Genero();
        genero.name = req.body.name;
        genero.state = req.body.state;
        genero.createdAt = new Date();
        genero.updatedAt = new Date();
        genero.description = req.body.description;

        genero = await genero.save();
        res.send(genero)

    } catch (error){
        console.log(error);
        res.status(500).send('message error')
    }

});

router.get('/', async function(req, res) {
    try {
        const genero = await Genero.find(); // select * from equipmentStates;
        res.send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});


// PUT method route
router.put('/:generoId', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Active', 'Inactive' ]),
    check('createdAt', 'invalid.createdAt').not().isEmpty(),
    check('updatedAt', 'invalid.updatedAt').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty(),

], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let genero = await Genero.findById(req.params.generoId); //select * from tip where id = ?
        
        if (!genero) {
            return res.status(400).send('El Genero de pelicula no existe');
        }       
        
        genero.name = req.body.name;
        genero.state = req.body.state;
        genero.createdAt = new Date();
        genero.updatedAt = new Date();
        genero.description = req.body.description;

        genero = await genero.save(); 
        res.send(genero);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar el genero de pelicula')
        
    }
    
  });



module.exports = router;