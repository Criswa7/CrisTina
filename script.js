let isInitialAnimationDone = false;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

// for intro motion
let mouseMoved = false;

const pointer = {
    x: .5 * window.innerWidth,
    y: .5 * window.innerHeight,
}
const params = {
    pointsNumber: 40,
    widthFactor: .3,
    mouseThreshold: .6,
    spring: .4,
    friction: .5
};

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++) {
    trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
    }
}

window.addEventListener("click", e => {
    updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("mousemove", e => {
    mouseMoved = true;
    updateMousePosition(e.pageX, e.pageY);
});
window.addEventListener("touchmove", e => {
    mouseMoved = true;
    updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});

function updateMousePosition(eX, eY) {
    pointer.x = eX;
    pointer.y = eY;
}

setupCanvas();
update(0);
window.addEventListener("resize", setupCanvas);


function update(t) {

    // for intro motion
    if (!mouseMoved) {
        pointer.x = (.5 + .3 * Math.cos(.002 * t) * (Math.sin(.005 * t))) * window.innerWidth;
        pointer.y = (.5 + .2 * (Math.cos(.005 * t)) + .1 * Math.cos(.01 * t)) * window.innerHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? .4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
    });

    ctx.lineCap = "round";
	 ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);

    for (let i = 1; i < trail.length - 1; i++) {
        const xc = .5 * (trail[i].x + trail[i + 1].x);
        const yc = .5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
    }
    ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
    ctx.stroke();
    
    window.requestAnimationFrame(update);
}

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


document.addEventListener('click', function(e) {
    if (isInitialAnimationDone) return; // Evita que se vuelva a ejecutar la animación de expansión
    isInitialAnimationDone = true; // Establece que la animación inicial se ha completado

    // Crear el elemento de expansión
    const expansion = document.createElement('div');
    expansion.className = 'expansion';
    expansion.style.width = '1000px';
    expansion.style.height = '1000px';
    expansion.style.background = 'radial-gradient(circle, rgba(255,192,203,1) 0%, rgba(255,255,255,0) 70%)'; // Gradiente de color
    expansion.style.left = e.pageX - 500 + 'px';
    expansion.style.top = e.pageY - 500 + 'px';
    const wrapper = document.getElementById('expansion-wrapper');
    wrapper.appendChild(expansion);
    wrapper.style.display = 'block';
  
    // Animación de expansión
    setTimeout(() => {
      expansion.style.transform = 'scale(10)';
    }, 100);
  
    // Transición de deslizamiento
    setTimeout(() => {
        const slider = document.createElement('div');
        slider.className = 'slider';
        slider.style.position = 'fixed';
        slider.style.top = '0';
        slider.style.right = '-100%'; // Iniciar fuera de la pantalla a la derecha
        slider.style.width = '100%';
        slider.style.height = '100%';
        slider.style.backgroundColor = '#ffc568'; // Color actualizado
        slider.style.transition = 'right 1s ease-out';
        document.body.appendChild(slider);
    
        // Cerrar la cortina deslizando de derecha a izquierda
    setTimeout(() => {
        slider.style.right = '0';
    }, 100);
    
        // Esperar y luego abrir la cortina deslizando de derecha a izquierda
    setTimeout(() => {
      document.querySelector('.inicio').classList.add('inactive'); // Ocultar la sección inicial
      //AQUI SE EJECUTARIA EL I Love You
      document.getElementById("ily-container").classList.remove("inactive");
      window.location.href = './ily/ily.html'
      // slider.style.right = '100%'; // Mover la cortina hacia la derecha para abrirla
      // setTimeout(() => {
      // slider.remove(); // Eliminar la cortina
      //   // Aquí iría el código para revelar la animación "I love you"
      // }, 1000); // Ajustar este tiempo según lo necesario
    }, 3000); // Ajustar este tiempo según lo necesario
  }, 2100); // Ajustar este tiempo según lo necesario
});