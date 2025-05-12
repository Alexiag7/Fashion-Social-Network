const connection = require("../config/db");

class DesignController {

  showDesignList = (req, res)=>{

     let sql = 'SELECT * FROM design WHERE design_is_del = 0';

     connection.query(sql, (err, result)=>{
      if(err){
        throw err;
      }else{
        res.render('designList', {message:"", result});
      }
     })
  }

  showDesignListMan = (req, res)=>{

    let sql = 'SELECT * FROM design WHERE genre = "Hombre" AND design_is_del = 0';

    connection.query(sql, (err, result)=>{
     if(err){
       throw err;
     }else{
      res.render('designList', {message:"", result});
     }
    })
 }

  showDesignListWoman = (req, res)=>{

    let sql = 'SELECT * FROM design WHERE genre = "Mujer" AND design_is_del = 0';

    connection.query(sql, (err, result)=>{
      if(err){
        throw err;
      }else{
        res.render('designList', {message:"", result});
      }
    })
  }

  showFormAddDesign = (req, res)=>{
    const {id} = req.params;

    res.render('formAddDesign', {id});
    
  };

  addDesign = (req, res)=>{
    const {id} = req.params;

    const {design_name, garment, main_material, main_color, genre, description} = req.body;

    let sql = 'INSERT INTO design (designer_id, design_name, garment, main_material, main_color, genre, description) VALUES (?,?,?,?,?,?,?)';

    let values = [id, design_name, garment, main_material, main_color, genre, description];

    if(req.file){

      sql = 'INSERT INTO design (designer_id, design_name, garment, main_material, main_color, genre, description, design_img) VALUES (?,?,?,?,?,?,?,?)'

      values = [id, design_name, garment, main_material, main_color, genre, description, req.file.filename];
    }

    connection.query(sql, values, (err, result)=>{
      if(err){
        throw err;
      }else{
        res.redirect(`/designer/profileAdmin/${id}`)
      }
    })
  };



  showDesignProfile = (req, res)=>{

    const {id} = req.params;

    let sql = 'SELECT * FROM design WHERE design_id = ? AND design_is_del = 0';

    connection.query(sql, [id], (err, result)=>{
      if(err){
        throw err;
      }else{
        console.log("···········", result)
        res.render("designProfile", {result: result[0]});
      }
    })

  }

  showDesignProfileAdmin = (req, res)=>{

    const {id} = req.params;

    let sql = 'SELECT * FROM design WHERE design_id = ? AND design_is_del = 0';

    connection.query(sql, [id], (err, result)=>{
      if(err){
        throw err;
      }else{
        console.log("···········", result)
        res.render("designProfileAdmin", {result: result[0]});
      }
    })

  }

  showEditDesignForm = (req, res)=>{
    const {id} = req.params;

    let sql = 'SELECT * FROM design WHERE design_id = ? AND design_is_del = 0';

    connection.query(sql, [id], (err, result)=>{
      if(err){
        throw err;
      }else{
        res.render('editDesignForm', {result: result[0]});
        
      }
    })
  }

  editDesign = (req, res)=>{
    const {id, designer_id} = req.params;

    const {design_name, garment, main_material, main_color, genre, description} = req.body;

    let sql = 'UPDATE design SET design_name=?, garment=?, main_material=?, main_color=?, genre=?, description=? WHERE design_id=?';

    let values = [design_name, garment, main_material, main_color, genre, description, id];

    if(req.file){
      sql = 'UPDATE design SET design_name=?, garment=?, main_material=?, main_color=?, genre=?, description=?, design_img=? WHERE design_id=?';

      values = [design_name, garment, main_material, main_color, genre, description, req.file.filename, id];
    }

    connection.query(sql, values, (err, result)=>{
      if(err){
        throw err;
      }else{
        res.redirect(`/design/profile/${id}`);
      }
    })
  };

  delTotal = (req, res)=>{
    const {id, designer_id} = req.params

    let sql = 'DELETE FROM design WHERE design_id = ?';

    connection.query(sql, [id], (err, result)=>{
      if(err){
        throw err;
      }else{
        res.redirect(`/designer/profile/${designer_id}`)
      }
    })
  };

  delLogic = (req, res)=>{
    const {id, designer_id} = req.params;

    let sql = 'UPDATE design SET design_is_del = 1 WHERE design_id = ?';

    connection.query(sql, [id], (err, result)=>{
      if(err){
        throw err
      }else{
        res.redirect(`/designer/profile/${designer_id}`)
      }
    })
  }

  search = (req, res)=>{
    const {search} = req.body;
    console.log("*******", req.body);

    let lookFor = `%${search}%`
    let sql = 'SELECT * FROM design WHERE design_name LIKE ? OR description LIKE ? OR genre LIKE ? ';
    let values = [lookFor, lookFor, lookFor];

    connection.query(sql, values, (err, result)=>{
      if(err){
        throw err;
      }else{
        if(result == 0){
          res.render('designList', {message: `No hay resultados para "${search}" `, result});
        }else{
          res.render('designList', {message: "", result});
        }
      }
    })

  }



};

module.exports = new DesignController();