const express = require('express');
const designerController = require('../controllers/designerController');
const uploadFile = require('../middleware/uploadFile');
const router = express.Router();

//localhost:4000/designer

//muestra la lista de todos los diseñadores
router.get('/designerList', designerController.showDesignerList);

//muestra el perfil de un diseñador
router.get('/profile/:id', designerController.profile)

//muestra el perfil para editar de un diseñador
router.get('/profileAdmin/:id', designerController.profileAdmin)

//muestra el register form
router.get('/registerForm', designerController.showRegisterForm)

//envia datos form y registra al diseñador
router.post('/register', designerController.register)

//muestra el login form
router.get('/loginForm', designerController.showLoginForm)

//login
router.post('/login', designerController.login)

//mostrar form de edicion de diseñador
router.get('/editForm/:id', designerController.showEditForm);

//enviar datos edicion
router.post('/edit/:id',uploadFile("designerImg"), designerController.editDesigner);

//borrar total
/* router.get('/delTotal/:id', designerController.delTotal); */

//borrar logico
router.get('/delLogic/:id', designerController.delLogic);

module.exports = router;
