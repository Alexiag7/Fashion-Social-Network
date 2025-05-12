const connection = require("../config/db");
const bcrypt = require('bcrypt');


class DesignerController {

  //muestra la lista de todos los diseñadores
  showDesignerList = (req, res)=>{
    let sql = 'SELECT * FROM designer WHERE designer_is_del = 0';

    connection.query(sql, (err, result)=>{
      if(err){
        throw err;
      }else{
        console.log(result);
        res.render('designerList', {result});
      }
    });
  };

  //muestra el perfil de un diseñador con todos sus diseños
  profile = (req, res)=>{
    const {id} = req.params;

    let sql = 'SELECT d.*, de.design_name, de.garment, de.genre, de.design_img, de.design_id FROM designer d left join design de ON d.designer_id = de.designer_id AND de.design_is_del = 0 WHERE d.designer_is_del = 0 AND d.designer_id = ? '

    connection.query(sql, [id], (err, result)=>{
      if(err){
        throw err;
      }else {
        let finalResult = {};
        let designs = [];
        let design = {};

        result.forEach((elem)=>{
          if(elem.design_id){
            design = {
              design_id: elem.design_id,
              design_name: elem.design_name,
              garment: elem.garment,
              genre: elem.genre,
              design_img : elem.design_img,
            }

            designs.push(design);
          }
        })

        finalResult = {
          designer_id : result[0].designer_id,
          name: result[0].name,
          lastname: result[0].lastname,
          description: result[0].description,
          city: result[0].city,
          phone_number: result[0].phone_number,
          email: result[0].email,
          designer_img: result[0].designer_img,
          designs: designs
        }

        console.log("REEESUUUULT", finalResult);
        console.log("DESSSSIIIGGNN", designs);
        res.render("profile", {finalResult});

      }
    })
  };

  profileAdmin = (req, res)=>{
    const {id} = req.params;

    let sql = 'SELECT d.*, de.design_name, de.garment, de.genre, de.design_img, de.design_id FROM designer d left join design de ON d.designer_id = de.designer_id AND de.design_is_del = 0 WHERE d.designer_is_del = 0 AND d.designer_id = ? '

    connection.query(sql, [id], (err, result)=>{
      if(err){
        throw err;
      }else {
        let finalResult = {};
        let designs = [];
        let design = {};

        result.forEach((elem)=>{
          if(elem.design_id){
            design = {
              design_id: elem.design_id,
              design_name: elem.design_name,
              garment: elem.garment,
              genre: elem.genre,
              design_img : elem.design_img,
            }

            designs.push(design);
          }
        })

        finalResult = {
          designer_id : result[0].designer_id,
          name: result[0].name,
          lastname: result[0].lastname,
          description: result[0].description,
          city: result[0].city,
          phone_number: result[0].phone_number,
          email: result[0].email,
          designer_img: result[0].designer_img,
          designs: designs
        }

        console.log("REEESUUUULT", finalResult);
        console.log("DESSSSIIIGGNN", designs);
        res.render("profileAdmin", {finalResult});

      }
    })
  };

  showRegisterForm = (req, res)=>{
    res.render('registerForm', {warning:""})
  }

  register = (req, res)=>{
    console.log("??????", req.body);

    const {name, lastname, email, password, repPassword} = req.body;

    if(!name || !lastname || !email || !password || !repPassword){
      res.render('registerForm', {warning:"Rellene todos los campos"});
    }else{
      if(password !== repPassword){
        res.render('registerForm', {warning:"Las contraseñas no coinciden"})
      }else{
        bcrypt.hash(password, 10, (err, hash)=>{
          if(err){
            throw err;
          }else{
            console.log("HASHEO", hash);

            let sql = 'INSERT INTO designer (name, lastname, email, password) VALUES (?,?,?,?)';

            let values = [name, lastname, email, hash];

            connection.query(sql, values, (err2, result)=>{
              if(err2){
                if(err2.errno === 1062){
                  res.render('registerForm', {warning: "Email ya registrado"})
                }else{
                  throw err2;
                };
              }else{
                res.redirect('/designer/loginForm')
              }
            })
          }
        })
      }
    }
  };

  showLoginForm = (req, res)=>{
    res.render('loginForm', {warning:""})
  }

  login = (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
      res.render('loginForm', {warning: "Rellene todos los campos"})
    }else{
      let sql = 'SELECT * FROM designer WHERE email = ? AND designer_is_del = 0';

      connection.query(sql, [email], (err, result)=>{
        if(err){
          throw err;
        }else{
          console.log("&&&&&&&", result)

          if(result.length == 0){
            res.render('loginForm', {warning:"El email no está registrado"});
          }else{
            let hash = result[0].password;

            bcrypt.compare(password, hash, (errHash, resultCompare)=>{
              if(errHash){
                throw errHash;
              }else{
                if(!resultCompare){
                  res.render('loginForm', {warning: "La contraseña no es correcta"});
                }else{
                  res.redirect(`/designer/profileAdmin/${result[0].designer_id}`);
                }
              }
            })
          }
        }
      })
    }
  };

  showEditForm = (req, res)=>{
    const {id} = req.params;

    let sql = 'SELECT * FROM designer WHERE designer_id = ? AND designer_is_del = 0';

    connection.query(sql, [id], (err, result)=>{
      if(err){
        throw err;
      }else{
        res.render('editDesignerForm', {result: result[0]});
        
      }
    })
  };

  editDesigner = (req, res)=>{
    const {id} = req.params;

    const {name, lastname, description, city, phone_number} = req.body;

    let sql = 'UPDATE designer SET name=?, lastname=?, description=?, city=?, phone_number=? WHERE designer_id=?';

    let values = [name, lastname, description, city, phone_number, id];

    if(req.file){
      sql = 'UPDATE designer SET name=?, lastname=?, description=?, city=?, phone_number=?, designer_img=? WHERE designer_id=?';

      values = [name, lastname, description, city, phone_number, req.file.filename, id];
    }

    connection.query(sql, values, (err, result)=>{
      if(err){
        throw err;
      }else{
        res.redirect(`/designer/profileAdmin/${id}`);
      }
    })
  };

  //finalmente he decidido no ponerlo en la web
  /* 
  delTotal = (req, res)=>{
    const {id} = req.params

    let sql = 'DELETE FROM designer WHERE designer_id = ?';

    connection.query(sql, [id], (err, result)=>{
      if(err){
        throw err;
      }else{
        res.redirect('/designer/designerList')
      }
    })
  };
   */

  delLogic = (req, res)=>{
    const {id} = req.params;

    let sql = 'UPDATE designer LEFT JOIN design ON designer.designer_id = design.designer_id SET designer.designer_is_del = 1, design.design_is_del = 1 WHERE designer.designer_id = ?';

    connection.query(sql, [id], (err, result)=>{
      if(err){
        throw err
      }else{
        res.redirect('/designer/designerList')
      }
    })
  }


};

module.exports = new DesignerController();