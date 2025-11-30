var express = require('express');
var axios = require('axios')
var router = express.Router();

router.get('/photos/add', async function(req, res, next) {
  const URL = 'http://localhost:8080/fotos/findAll/json'
  const response = await axios.get(URL)
  res.render('fotos_formulario', { title: 'Express', fotos: response.data});
});

router.get('/photos/edit', async function(req, res, next) {
  const URL = 'http://localhost:8080/fotos/findAll/json'
  const response = await axios.get(URL)
  res.render('fotos_formulario', { title: 'Express', fotos: response.data});
});

router.get('/api/photos/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const URL = `http://localhost:8080/fotos/findAllById/${id}/json`;
    const response = await axios.get(URL);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching photo:', error);
    res.status(404).json({ error: 'Photo not found' });
  }
});

router.get('/photos/delete/:id', async function(req, res, next) {
  const id = req.params.id;
  await axios.delete(`http://localhost:8080/fotos/delete/${id}`);
  res.redirect('/photos/add');
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
    res.redirect('/photos/add')
  } else {
    res.redirect('/photos/add')
  }
})

router.post('/photos/edit', async function(req, res, next) {
  let { id, titulo, descripcion, calificacion} = req.body;
  console.log('Editing photo ID:', id);
  console.log('Title:', titulo);
  console.log('Description:', descripcion);
  console.log('Rating:', calificacion);
  
  const URL = "http://localhost:8080/fotos/update";

  let data = {
    id: id,
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
  
  try {
    const response = await axios.put(URL, data, config);

    if(response.status == '200' && response.statusText == 'OK'){
      res.redirect('/photos/add');
    } else {
      res.redirect('/photos/add');
    }
  } catch (error) {
    console.error('Error updating photo:', error);
    res.redirect('/photos/add');
  }
})

module.exports = router;
