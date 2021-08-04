console.log('chat codigo');
const socket = io();

//DOM elements
let ruta = document.getElementById('ruta')
let btn = document.getElementById('send')
let output = document.getElementById('output')


let ocupacion = 0;
let indexParadas = 0;
let parada ="";

let rutas =[
        {
            "tipo":"TRONCAL",
            "nombre":"8",
            "id_servicio":"269",
            "destino":"Terminal",
            "frecuencia_pico":4,
            "frecuencia_normal":5,
            "operacion":"Lunes - Viernes",
            "horario":"Desde: 04:30:00 Hasta: 23:35:00",
            "paradas": ["Terminal2","Calle 187","Portal del Norte","Toberín","Cardio Infantil","Mazurén","Calle 146","Calle 142","Alcalá","Prado","Calle 127","Pepe Sierra","Calle 106","Calle 100","Virrey","Calle 85","Héroes","Calle 76","Calle 72","Flores","Calle 63","Calle 57","Marly","Calle 45","AV. 39","Calle 26","Calle 22","Calle 19","AV. Jiménez (AV. Caracas)","Tercer Milenio","Tygua – San José","Guatoque – Veraguas"],
            "ocupacion" : 0
        },
        {
            "tipo":"DUAL",
            "nombre":"D81-M81",
            "id_servicio":"252",
            "destino":"AC 80 - K119",
            "frecuencia_pico":9,
            "frecuencia_normal":11,
            "operacion":"Lunes - Viernes",
            "horario":"Desde: 05:00:00 Hasta: 23:40:00",
            "paradas": ["Museo Nacional","Universidad Javeriana","Calle 45","Br. Bosque Calderón","Av. Chile","Carrera 47","Avenida 68","Br. Bolivia Occidental","Br. Garcés Navas","Br. Ciudadela Colsubsidio","Br. El Cortijo","Puente de Guadua"],
            "ocupacion" : 0
        },
        {
            "tipo":"TRONCAL",
            "nombre":"A52 - G52",
            "id_servicio":"2",
            "destino":"A52 FLORES",
            "frecuencia_pico":4,
            "frecuencia_normal":4,
            "operacion":"Lunes - Viernes","horario":"Desde: 05:30:00 Hasta: 08:00:00",
            "paradas": ["Portal del Sur","Perdomo","Venecia","General Santander","NQS – CL 30 S.","Santa Isabel","NQS – Calle 75","Calle 76","Calle 2","Flores"],
            "ocupacion" : 0
        }
]

function random(){
    // generates a random occupancy value for each station
    console.log(rutas[0].paradas.length,indexParadas,Math.random().toFixed(2),parada);

    if (indexParadas < rutas[0].paradas.length ) {
        console.log(rutas[0].paradas[indexParadas]);
        parada = rutas[0].paradas[indexParadas];
        indexParadas ++;
        ocupacion = Math.random().toFixed(2);
    } else {
        indexParadas = 0;
    }
    
    socket.emit('chatTransmilenio',{
        ruta : ruta.value,
        ocupacion: ocupacion,
        parada: parada
        
    });
}


btn.addEventListener('click',function(){
    socket.emit('chatTransmilenio',{
        ruta : ruta.value,
        ocupacion: ocupacion,
        parada: parada
    });
});


setInterval("random()",5000);


socket.on('chatTransmilenio', function(data){
    if (data.ruta == ruta.value) {
        console.log(data);
        output.innerHTML += `<p> 
            <strong>Ruta</strong>: ${data.ruta} <br/>
            <strong>Parada</strong>: ${data.parada}  <br/>
            <strong>Ocupacion</strong>: ${data.ocupacion}  <br/>
            <p>`
    }
});
