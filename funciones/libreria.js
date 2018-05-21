var fs = require('fs');
var xml2js = require('xml2json');
var path = require('path'),
 _ = require('underscore');

var contenido;
var datos_boletin;
exports.procesarNuevoBoletin = function(archivo){
    return new Promise(function(resolve, reject) {
      if (fs.existsSync(archivo)){
        fs.readFile(archivo, undefined, function(err, data){
            if (err)
                reject(err);
            else{
              var s = xml2js.toJson(data);
              resolve(s);
            }
        });
      }
    });
}

exports.cargarUltimoArchivo = function(basePath){
  var newest = null;
  var files = fs.readdirSync(basePath);
  var one_matched = 0;
  var regexp =new RegExp('.*\.xml');

  for (i = 0; i < files.length; i++) {

      if (regexp.test(files[i]) == false)
          continue;
      else if (one_matched == 0) {
          newest = files[i];
          one_matched = 1;
          continue;
      }

      f1_time = fs.statSync(files[i]).mtime.getTime();
      f2_time = fs.statSync(newest).mtime.getTime();
      if (f1_time > f2_time)
          newest[i] = files[i];
  }

  if (newest != null)
      return (basePath + newest);
  return null;
}
