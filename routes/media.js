const { Router } = require('express');
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('url', 'invalid.url').not().isEmpty(),
    check('imagen', 'invalid.imagen').not().isEmpty(),
    check('productora', 'invalid.productora').not().isEmpty(),
    check('director', 'invalid.director').not().isEmpty(),
    check('genero', 'invalid.genero').not().isEmpty(),
    check('tipo', 'invalid.tipo').not().isEmpty(),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        const mediaExist = await Media.findOne({ serial: req.body.serial });
        if (mediaExist) {
            return res.status(400).send('Exist serial');
        }

        let media = new Media();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.url = req.body.url;
        media.imagen = req.body.imagen
        media.productora = req.body.productora;
        media.director = req.body.director;
        media.genero = req.body.genero;
        media.tipo = req.body.tipo;
        media.createdAt = new Date();
        media.updatedAt = new Date();


        media = await media.save();
        res.send(media)

    } catch (error){
        console.log(error);
        res.status(500).send('message error')
    }

});


// Listar medias
router.get('/', async function (req, res) {
    
    try {

        const medias = await Media.find().populate([
            {
                path: 'director', select: 'name state createdAt updatedAt'
            },
            {
                path: 'genero', select: 'name state createdAt updatedAt description'
            },
            {
                path: 'productora', select: 'name state slogan createdAt updatedAt description'
            },
            {
                path: 'tipo', select: 'name state createdAt description'
            }

        ]);

        res.send(medias);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error')
    }
    
  });


// PUT method route
router.put('/:mediaId', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('url', 'invalid.url').not().isEmpty(),
    check('imagen', 'invalid.imagen').not().isEmpty(),
    check('productora', 'invalid.productora').not().isEmpty(),
    check('director', 'invalid.director').not().isEmpty(),
    check('genero', 'invalid.genero').not().isEmpty(),
    check('tipo', 'invalid.tipo').not().isEmpty(),

], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let media = await Media.findById(req.params.mediaId); //select * from tip where id = ?
        
        if (!media) {
            return res.status(400).send('media de pelicula no existe');
        }

        const existeMediaPorSerial = await Media.findOne({ serial: req.body.serial, _id:{ $ne: media._id} });
        if (existeMediaPorSerial) {
            return res.status(400).send('Ya existe la media para otra pelicula ')
        }
        
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.url = req.body.url;
        media.productora = req.body.productora;
        media.director = req.body.director;
        media.genero = req.body.genero;
        media.tipo = req.body.tipo;
        media.createdAt = new Date();
        media.updatedAt = new Date();



        media = await media.save(); 
        res.send(media);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al actualiza Media de pelicula')
        
    }
    
  });


router.get('/:mediaId', async function(req, res){
    try {
        const media = await Media.findById(req.params.mediaId);
        if(!media) {
            return res.status(404).send('media no existe');
        }
        res.send(media);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar media');
    }
});

module.exports = router;