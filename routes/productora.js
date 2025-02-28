const { Router } = require('express');
const Productora = require('../models/Productora');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Active', 'Inactive' ]),
    check('description', 'invalid.description').not().isEmpty(),
    check('slogan', 'invalid.slogan').not().isEmpty(),

], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        let productora = new Productora();
        productora.name = req.body.name;
        productora.state = req.body.state;
        productora.createdAt = new Date();
        productora.updatedAt = new Date();
        productora.slogan = req.body.slogan;
        productora.description = req.body.description;

        productora = await productora.save();
        res.send(productora)

    } catch (error){
        console.log(error);
        res.status(500).send('message error')
    }

});

router.get('/', async function(req, res) {
    try {
        const productoras = await Productora.find(); // select * from users;
        res.send(productoras);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});

// PUT method route
router.put('/:productoraId', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn(['Active', 'Inactive']),
    check('slogan', 'invalid.slogan').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty(),


], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let productora = await Productora.findById(req.params.productoraId); //select * from tip where id = ?
        
        if (!productora) {
            return res.status(400).send('Productora de pelicula no existe');
        }

        productora.name = req.body.name;
        productora.state = req.body.state;
        productora.createdAt = new Date();
        productora.updatedAt = new Date();
        productora.slogan = req.body.slogan;
        productora.description = req.body.description;

        productora = await productora.save(); 
        res.send(productora);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar la productora de pelicula')
        
    }
    
  })

module.exports = router;