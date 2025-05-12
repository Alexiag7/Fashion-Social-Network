const express = require('express');
const designController = require('../controllers/designController');
const uploadFile = require('../middleware/uploadFile');
const router = express.Router();

//localhost:4000/design

//muestra lista de los diseños
router.get('/designList', designController.showDesignList)

router.get('/designListMan', designController.showDesignListMan)

router.get('/designListWoman', designController.showDesignListWoman)

//muestra formulario de añadir diseño
router.get('/addDesignForm/:id', designController.showFormAddDesign)

//envia datos del form añadir diseño
router.post('/addDesign/:id', uploadFile("designImg"), designController.addDesign)

//mostrar perfil diseño
router.get('/profile/:id', designController.showDesignProfile)

//mostrar perfil diseño usuario
router.get('/profileAdmin/:id', designController.showDesignProfileAdmin)

//mostrar form editar diseño
router.get('/editDesignForm/:id', designController.showEditDesignForm);

//enviar datos de edicion
router.post('/editDesign/:id/:designer_id', uploadFile("designImg"), designController.editDesign);

//borrar total
router.get('/delTotal/:id/:designer_id', designController.delTotal);

//borrar logico (no lo he puesto al final)
router.get('/delLogic/:id/:designer_id', designController.delLogic);


//mandar datos search
router.post('/search', designController.search);

module.exports = router;