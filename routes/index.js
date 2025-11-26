var express = require('express');
var axios = require('axios')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('fotos_formulario', { title: 'Express' });
});

router.post('/photos/save', async function(req, res, next) {
  let { titulo, descripcion, calificacion} = req.body;
  console.log(titulo)
  console.log(descripcion)
  console.log(calificacion)
  const URL = "http://localhost:8080/fotos/save";

  let data = {
    titulo: titulo,
    descripcion: descripcion,
    calificacion: calificacion,
    ruta: ''
  }
  const config = {
    proxy: {
      host: 'localhost',
      port: 8080
    }
  }
  
  const response = await axios.post(URL, data, config);

  if(response.status == '200' && response.statusText == 'OK'){
    res.redirect('/')
  } else {
    res.redirect('/')
  }
})

module.exports = router;
