const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer"); // Para manejar la carga de archivos
const postExcel = require("./controllers/product/postExcel.js"); // Importa tu controlador postExcel
require("./db.js");

const app = express();

app.name = "API";
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Configura Multer para manejar la subida de archivos
const upload = multer({ dest: "uploads/" }); // Directorio donde se guardarán los archivos

// Modifica esta ruta para usar tu función postExcel directamente
app.post("/postExcel", upload.single("excelFile"), postExcel);

// Aquí asumo que tienes otros endpoints definidos en `./routes/app.routes.js`
const routes = require("./routes/app.routes.js");
app.use("/", routes);

// Middleware de manejo de errores - debe ir al final
app.use((err, req, res, next) => {
  console.error(err.stack); // Esto imprimirá la pila de errores en la consola
  res.status(500).send('Algo salió mal!'); // Esto enviará una respuesta de error genérica al cliente
});

/* // Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
}); */

module.exports = app;