const mysql = require('mysql2');

const connection = mysql.createConnection({
  host:'localhost',
  user: 'root', 
  password: 'root', 
  database: 'fashion'
});

connection.connect((err)=>{
  if(err){
      console.log(err);
  }else{
    console.log("conexion ok");
  }
});

module.exports = connection; 