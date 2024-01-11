document.addEventListener("DOMContentLoaded", function() {
    const slider = document.createElement('div');
    slider.className = 'slider';
    slider.style.position = 'fixed';
    slider.style.top = '0';
    slider.style.right = '0'; // Iniciar en la pantalla
    slider.style.width = '100%';
    slider.style.height = '100%';
    slider.style.backgroundColor = '#ffc568'; // Color actualizado
    slider.style.transition = 'right 1s ease-out';
    slider.style.zIndex = '9999'; // Asegurarse de que el slider esté por encima de todo
    document.body.appendChild(slider);
  
    // Después de un tiempo, mover el slider fuera de la pantalla
    setTimeout(() => {
      slider.style.right = '100%';
    }, 1000); // Ajusta el tiempo según tus necesidades
  
    fetch('assets/imagenes.json')
    .then(response => response.json())
    .then(data => {
        const galeria = document.querySelector('.gallery');
        data.imagenes.forEach(imagen => {
            const imgElement = document.createElement('img');
            imgElement.src = 'assets/' + imagen;
            imgElement.alt = 'Recuerdo';
            galeria.appendChild(imgElement);
        });
    })
    .catch(error => console.error('Error al cargar las imágenes:', error));

});

  document.querySelectorAll('.foto').forEach(item => {
    item.addEventListener('click', event => {
        // Aquí podrías abrir la imagen en un modal o en una vista más grande
        alert('Que bonita foto <3!');
    });
});
