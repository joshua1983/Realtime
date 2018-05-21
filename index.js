var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var watch = require('node-watch');


var libreria = require('./funciones/libreria');

app.get('/', function (req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/static', express.static(__dirname + '/publico'));

io.on('connection', function(socket){
  console.log("usuario conectado");

  io.emit('mensaje', '{"estado": "Conexion ok"}');

  var ultimo_archivo = libreria.cargarUltimoArchivo(__dirname + '/archivos_elecciones/');

  if (ultimo_archivo != undefined){
    var datos;
    libreria.procesarNuevoBoletin(ultimo_archivo).then (function(resultado){
      datos = resultado;
      console.log("procesado archivo: "+ultimo_archivo);
      io.emit('mensaje', datos);
    })
  }


  watch(__dirname + '/archivos_elecciones',{ recursive: false, filter: /\.xml$/ },
    function(evt, name){
      var datos;
      libreria.procesarNuevoBoletin(name).then( function(resultado) {
        datos = resultado;
        console.log("procesado archivo: "+name);
        io.emit('mensaje', datos);
    });

  });

  socket.on('disconnect', function(){
    console.log('usuario desconectado');
  });
  socket.on('mensaje', function(msg){
    console.log('mensaje: '+msg);
  });
});

http.listen(3000, function(){
  console.log("Escuchando puerto 3000");
})
