// APP principal

var aplicacion = new Vue({
  el: '#app',
  data: {
    numero_boletin: 000,
    votos_fajardo:0,
    votos_petro:0,
    votos_delacalle:0,
    votos_duque:0,
    votos_vargas:0,
    votos_trujillo:0,
    votos_blanco:0
  },
  methods:{
    formatVotos(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
  }
});

function actualizarVariables(datosDelServidor){
  console.log(datosDelServidor);
  var Boletin_Consolidado = datosDelServidor.Boletin_Consolidado;
  if (Array.isArray(Boletin_Consolidado.Boletin)){
    var boletin = datosDelServidor.Boletin_Consolidado.Boletin[0];
    aplicacion.numero_boletin = boletin.Numero.V;
    aplicacion.votos_fajardo = boletin.Detalle_Circunscripcion.lin.Detalle_Candidato.lin[0].Votos.V;
    aplicacion.votos_petro = boletin.Detalle_Circunscripcion.lin.Detalle_Candidato.lin[1].Votos.V;
    aplicacion.votos_delacalle = boletin.Detalle_Circunscripcion.lin.Detalle_Candidato.lin[2].Votos.V;
    aplicacion.votos_duque = boletin.Detalle_Circunscripcion.lin.Detalle_Candidato.lin[3].Votos.V;
    aplicacion.votos_vargas = boletin.Detalle_Circunscripcion.lin.Detalle_Candidato.lin[4].Votos.V;
    aplicacion.votos_trujillo = boletin.Detalle_Circunscripcion.lin.Detalle_Candidato.lin[5].Votos.V;
    aplicacion.votos_blanco = boletin.Detalle_Circunscripcion.lin.Detalle_Candidato.lin[6].Votos.V;
  }else{
    var boletin = datosDelServidor.Boletin_Consolidado.Boletin;
    aplicacion.numero_boletin = boletin.Numero.V;
    aplicacion.votos_fajardo = boletin.Detalle_Circunscripcion.lin.Detalle_Candidato.lin[0].Votos.V;
    aplicacion.votos_petro = boletin.Detalle_Circunscripcion.lin.Detalle_Candidato.lin[1].Votos.V;
    aplicacion.votos_delacalle = boletin.Detalle_Circunscripcion.lin.Detalle_Candidato.lin[2].Votos.V;
    aplicacion.votos_duque = boletin.Detalle_Circunscripcion.lin.Detalle_Candidato.lin[3].Votos.V;
    aplicacion.votos_vargas = boletin.Detalle_Circunscripcion.lin.Detalle_Candidato.lin[4].Votos.V;
    aplicacion.votos_trujillo = boletin.Detalle_Circunscripcion.lin.Detalle_Candidato.lin[5].Votos.V;
    aplicacion.votos_blanco = boletin.Detalle_Circunscripcion.lin.Detalle_Candidato.lin[6].Votos.V;
  }

}
