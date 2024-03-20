$(function () {
  // Buscar formulario DOM
  const formulario = document.getElementById('form-buscar'); // --> Version js vanilla
  // const formulario = $('#form-buscar')[0];  // --> Version Jquery

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const inputBuscar = document.getElementById('input-buscar');// --> Version js vanilla
    // const inputBuscar = $('#input-buscar')[0]; // --> Version Jquery

    let idBuscar = inputBuscar.value;
    validarId(idBuscar);
    mostrarDatos(idBuscar);
  });
});

function validarId(id) {
  const regex = /^(?!0)[0-9]+$/
if(id.match(regex)){
}else{
  alert("Debes ingresar sólo números");
}
}

function mostrarDatos(id) {
  $.ajax({
    url: `https://www.superheroapi.com/api.php/4905856019427443/${id}`,
    method: 'GET', // GET - POST - PUT - DELETE 
    dataType: 'json',
    success: function (respuesta) {
      let resultadoHtml = `
      <div class="card mb-3" style="max-width: 540px;">
  <div class="row">
    <div class="col-md-4 bg-dark">
    <p class="text-center"><span>${respuesta.id}</span></p>     
    <img src="${respuesta.image.url}" class="img-fluid rounded-start" alt="...">         
    </div>
    <div class="col-md-8">
      <div class="card-body">
      <h4 class="card-title">Nombre: ${respuesta.name}</h4>
      <hr>
      <p>Ocupación:${respuesta.work.occupation}</p>
      <hr>
      <p>Publicado por:${respuesta.biography.publisher}</p>
      <hr>
      <p>Conexiones:${respuesta.connections.relatives}</p>
      <hr>
      <p>Alianzas:${respuesta.biography.aliases}</p>
      <hr>
      <p>Peso:${respuesta.appearance.weight}</p>
      <hr>
      <p>Altura:${respuesta.appearance.height}</p>
      <hr>
      <p>Apariencia:${respuesta.appearance.gender}</p>
      </div>
    </div>
  </div>
</div>
`
      $('#resultado').html(resultadoHtml);

      // Grafico Canvasjs
      let opciones = {
        animationEnabled: true,
        title: {
          text: `Estadísticas para ${respuesta.name}`
        },
        data: [{
          type: "doughnut",
          startAngle: 60,
          innerRadius: "20%",
          showInLegend: true,
          legendText: "{label}",
          indexLabelFontSize: 12,
          indexLabel: "{label}: {y}",
          toolTipContent: "<b>{label}:</b> {y}",
          dataPoints: [
            { label: "Inteligencia", y: respuesta.powerstats.intelligence },
            { label: "Fortaleza", y: respuesta.powerstats.strength },
            { label: "Velocidad", y: respuesta.powerstats.speed },
            { label: "Durabilidad", y: respuesta.powerstats.durability },
            { label: "Poder", y: respuesta.powerstats.power },
            { label: "Combate", y: respuesta.powerstats.combat },
          ]
        }
        ]
      };

      $("#grafico").CanvasJSChart(opciones);
      $('.canvasjs-chart-credit').html('');
    },
    error: function (error) {
      console.log(error);
    }
  });
}

const nav = document.getElementById('navlindo');
const divToReach = document.getElementById('contenido');
const navHeight = nav.offsetHeight;

window.addEventListener('scroll', function () {
  const scrollPosition = window.scrollY;
  const divPosition = divToReach.offsetTop;

  if (scrollPosition > divPosition - navHeight) {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }
});

