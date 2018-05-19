var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var watch = require('node-watch');

app.get('/', function (req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log("usuario conectado");

  io.emit('mensaje', 'Conexion ok');

  watch('D:/archivos_elecciones',{recursive: false}, function(evt, name){
    io.emit('mensaje', 'Cambio en: '+name);
  })

  socket.on('disconnect', function(){
    console.log('usuario desconectado');
  })
  socket.on('mensaje', function(msg){
    console.log('mensaje: '+msg);
  })
})

http.listen(3000, function(){
  console.log("Escuchando puerto 3000");
})
