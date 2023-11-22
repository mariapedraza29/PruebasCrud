const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Conectar a la base de datos MySQL
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tu_base_de_datos',
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos establecida');
  
  // Realiza consultas o ejecuta operaciones aquí

  // Ejemplo de consulta
  connection.query('SELECT * FROM tu_tabla', (error, results, fields) => {
    if (error) throw error;
    console.log('Resultados de la consulta:', results);
  });

  // Cerrar la conexión después de realizar las operaciones necesarias
  connection.end((err) => {
    if (err) {
      console.error('Error al cerrar la conexión:', err);
    }
    console.log('Conexión cerrada');
  });
});


// Rutas CRUD
app.post('/api/items', async (req, res) => {
  const newItem = await Item.create(req.body);
  res.json(newItem);
});

app.get('/api/items', async (req, res) => {
  const items = await Item.findAll();
  res.json(items);
});

app.get('/api/items/:id', async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  res.json(item);
});

app.put('/api/items/:id', async (req, res) => {
  await Item.update(req.body, { where: { id: req.params.id } });
  const updatedItem = await Item.findByPk(req.params.id);
  res.json(updatedItem);
});

app.delete('/api/items/:id', async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  await item.destroy();
  res.json(item);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
