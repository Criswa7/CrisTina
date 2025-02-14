document.addEventListener('DOMContentLoaded', () => {
const cupones = [
  { 
    titulo: "Postre Sorpresa",
    descripcion: "Endulza tu día con un postre especial que te llevaré con amor",
    icono: "🍰"
  },
  { 
    titulo: "Plancito en Fortaleza",
    descripcion: "Acurruquémonos en nuestra fortaleza de cobijas y disfrutemos de una película, un juego, una charla o nosotros.",
    icono: "🍿"
  },
  { 
    titulo: "Una Canción",
    descripcion: "Déjame dedicarte una canción que exprese todo mi amor por ti.",
    icono: "🎤"
  },
  { 
    titulo: "Día de Spa",
    descripcion: "Consiéntete con un día de relajación y mimos solo para ti.",
    icono: "💆‍♀️"
  },
  { 
    titulo: "Escapada Romántica",
    descripcion: "Una noche inolvidable en nuestro propio paraíso.",
    icono: "💖"
  },
  { 
    titulo: "Cumple una Fantasía",
    descripcion: "Dime tu fantasia y haré todo lo posible para hacerlo realidad.",
    icono: "✨"
  },
  { 
    titulo: "Desayuno en la Cama",
    descripcion: "Empieza el día con un delicioso desayuno que te llevaré a la cama.",
    icono: "🥐"
  },
  { 
    titulo: "Un Nude",
    descripcion: "Escoge como lo quieres, que quieres ver, con sonido, como desees ;)",
    icono: "😉"
  },
  { 
    titulo: "Comida a tu Gusto",
    descripcion: "Elige tu comida favorita y yo me encargaré de conseguirla o preparártela y llevártela.",
    icono: "🍕"
  },
  { 
    titulo: "Día de picnic",
    descripcion: "Disfrutemos de un día soleado con un picnic delicioso en un lugar especial",
    icono: "🍱"
  },
  { 
    titulo: "Chocolate",
    descripcion: "Te consentiré con una explosión de sabor a chocolate, ya sea un postre, una bebida caliente o tu chocolate amargo o no favorito.",
    icono: "🍫"
  },
];

const cuponesContainer = document.querySelector('.cupones');

cupones.forEach(cupon => {
    const cuponElement = document.createElement('div');
    cuponElement.classList.add('cupon');
    cuponElement.innerHTML = `
    <div class="icono">${cupon.icono}</div>
    <h2>${cupon.titulo}</h2>
    <p>${cupon.descripcion}</p>
    <img src="rasgado.png" class="rasgado" style="display: none;"> 
    <p class="infinito" style="display: none;">Este cupón es infinito <3</p> 
  `;
    cuponesContainer.appendChild(cuponElement);

    // Animacion de "redimir" (ahora dentro del bucle)
    cuponElement.addEventListener('click', () => {
      // Mostrar la imagen de rasgado
      const rasgadoImg = cuponElement.querySelector('.rasgado');
      rasgadoImg.style.display = 'block';

      // Ocultar el contenido del cupón
      cuponElement.querySelector('h2').style.display = 'none';
      cuponElement.querySelector('p').style.display = 'none';
      cuponElement.querySelector('.icono').style.display = 'none';

      // Mostrar el texto "infinito" después de un breve tiempo
      const infinitoText = cuponElement.querySelector('.infinito');
      setTimeout(() => {
        infinitoText.style.display = 'block';
      }, 300); 

      // Ocultar el texto y la imagen, y encoger el cupón
      setTimeout(() => {
        rasgadoImg.style.display = 'none';
        infinitoText.style.display = 'none';
        cuponElement.style.transform = 'scale(0.1)'; // Encoger
      }, 1000); 

      // Restablecer el tamaño del cupón y mostrar el contenido original
      setTimeout(() => {
        cuponElement.style.transform = 'scale(1)'; // Tamaño original
        cuponElement.querySelector('h2').style.display = 'block';
        cuponElement.querySelector('p').style.display = 'block';
        cuponElement.querySelector('.icono').style.display = 'block';
      }, 1500); 
    }); 
  }); // Cierra el forEach
}); // Cierra el DOMContentLoaded