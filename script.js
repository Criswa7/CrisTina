let isInitialAnimationDone = false;

document.addEventListener('mousemove', function(e) {
    if (isInitialAnimationDone) return; // Evita la estela del cursor después de la primera animación
        const star = document.createElement('div');
        star.className = 'star';
        document.body.appendChild(star);

        // Establece el tamaño y la posición de la estrella
        star.style.left = e.pageX + 'px';
        star.style.top = e.pageY + 'px';
        star.style.width = '7px';
        star.style.height = '7px';

        // Animación para desvanecer y eliminar la estrella
        setTimeout(function() {
            star.style.opacity = '0';
            setTimeout(function() {
                star.remove();
            }, 500);
        }, 1000);
});

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
          window.location.href = './ily/index.html'
          slider.style.right = '100%'; // Mover la cortina hacia la derecha para abrirla
          document.querySelector('.inicio').classList.add('inactive'); // Ocultar la sección inicial
          setTimeout(() => {
            slider.remove(); // Eliminar la cortina
            // Aquí iría el código para revelar la animación "I love you"
          }, 1000); // Ajustar este tiempo según lo necesario
        }, 3000); // Ajustar este tiempo según lo necesario
      }, 2100); // Ajustar este tiempo según lo necesario
});

