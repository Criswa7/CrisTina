import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

// Importar audio
import audioSrc from '../../assets/mojandoasientos/audio/mojandoasientos.mp3';

const QuinceMeses = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [finalMessageIndex, setFinalMessageIndex] = useState(0);
  const audioRef = useRef(null);
  const messageTimerRef = useRef(null);
  
  // Base para imágenes (ruta relativa)
  const IMAGE_BASE_PATH = '../../assets/mojandoasientos/lyrics/';
  
  // Mensaje final dividido en partes para la animación
  const finalMessage = [
    "Mi Re re reeeina,",
    "te amo muchísimo",
    "Te adoro",
    "Te aprecio,",
    "Te admiro,",
    "Te me haces la persona más preciosa",
    "Gracias por ser mi Re re reeeina",
    "estos 15 meses",
    "❤️",
    "Te amo ❤️"
  ];
  
  // Mapeo de índices a nombres de archivo
  const imageFiles = {
    1: "1tu-me-diste-14-4-2025.png",
    2: "2el-cuadre-14-4-2025.png",
    3: "3no-le-diste-14-4-2025.png",
    4: "4a-ninguno-14-4-2025.png",
    5: "5yo-te-mandaba-14-4-2025.png",
    6: "6krippy-14-4-2025.png",
    7: "7y-tu-foticos-14-4-2025.png",
    8: "8del-culo-14-4-2025.png",
    9: "9contigo-en-14-4-2025.png",
    10: "10noche-buena-14-4-2025.png",
    11: "11me-14-4-2025.png",
    12: "12llevaste-pa-14-4-2025.png",
    13: "13donde-14-4-2025.png",
    14: "14tu-abuela-14-4-2025.png",
    15: "15te-perdiste-en-la-uni-14-4-2025.png",
    16: "16de-buena-14-4-2025.png",
    17: "17tu-sabe-que-14-4-2025.png",
    18: "18en-Envigado-cooperan-14-4-2025.png",
    19: "19Y-me-dijeron-14-4-2025.png",
    20: "20que-estas-14-4-2025.png",
    21: "21soltera-14-4-2025.png",
    22: "22quiero-bajarte-14-4-2025.png",
    23: "23esa-bellaquera-14-4-2025.png",
    24: "24Yo-s-que-14-4-2025.png",
    25: "25tengo-chavo-14-4-2025.png",
    26: "26en-la-cartera-14-4-2025.png", 
    27: "27pero-quiero-14-4-2025.png",
    28: "28parchar-14-4-2025.png",
    29: "29contigo-14-4-2025.png",
    30: "30en-el-Lleras-14-4-2025.png",
    31: "31Re-14-4-2025.png",
    32: "32Re-14-4-2025.png",
    33: "33Reeeeeina-14-4-2025.png",
    34: "34Mi-14-4-2025.png",
    35: "35amor-14-4-2025.png",
    36: "36yo-14-4-2025.png",
    37: "37te-extra-o-14-4-2025.png",
    38: "38beb-14-4-2025.png",
    39: "39Qu-14-4-2025.png",
    40: "40hijueputa-14-4-2025.png",
    41: "41chimba-14-4-2025.png",
    42: "42seria-14-4-2025.png",
    43: "43vernos-14-4-2025.png",
    44: "44otra-vez-14-4-2025.png"
  };
  
  // Precarga de imágenes
  useEffect(() => {
    // Precargamos las imágenes para que aparezcan instantáneamente
    Object.values(imageFiles).forEach(file => {
      try {
        // Usamos importación dinámica para precargar
        const img = new Image();
        img.src = new URL(`${IMAGE_BASE_PATH}${file}`, import.meta.url).href;
      } catch (error) {
        console.error(`Error precargando imagen ${file}:`, error);
      }
    });
  }, []);
  
  // Función para obtener la URL completa de la imagen
  const getImageUrl = (filename) => {
    try {
      return new URL(`${IMAGE_BASE_PATH}${filename}`, import.meta.url).href;
    } catch (error) {
      console.error(`Error obteniendo URL para ${filename}:`, error);
      return '';
    }
  };
  
  // Timestamps para cada imagen (en segundos)
  const lyricTimings = [
    { time: 0, image: 1 },    // "Tú"
    { time: 0.7, image: 2 },  // "el cuadre"
    { time: 1.2, image: 3 },  // "no le diste"
    { time: 1.7, image: 4 },  // "a ninguno"
    { time: 2.4, image: 5 },  // "Yo te mandaba"
    { time: 3.0, image: 6 },  // "krippy"
    { time: 3.5, image: 7 },  // "y tú foticos"
    { time: 4.5, image: 8 },  // "del culo"
    { time: 5.6, image: 9 },  // "contigo en"
    { time: 6.1, image: 10 }, // "noche buena"
    { time: 7.7, image: 11 }, // "me"
    { time: 8.0, image: 12 }, // "llevaste pa"
    { time: 8.3, image: 13 }, // "donde"
    { time: 9.0, image: 14 }, // "tu abuela"
    { time: 10.0, image: 15 }, // "te perdiste en la uni"
    { time: 11.4, image: 16 }, // "de buena"
    { time: 13.0, image: 17 }, // "tú sabe que"
    { time: 13.5, image: 18 }, // "en Envigado cooperan"
    { time: 14.8, image: 19 }, // "Y me dijeron"
    { time: 15.9, image: 20 }, // "que estas"
    { time: 16.7, image: 21 }, // "soltera"
    { time: 17.6, image: 22 }, // "quiero bajarte"
    { time: 18.7, image: 23 }, // "esa bellaquera"
    { time: 19.8, image: 24 }, // "Yo sé que"
    { time: 20.6, image: 25 }, // "tengo chavo"
    { time: 21.0, image: 26 }, // "en la cartera"
    { time: 22.8, image: 27 }, // "pero quiero"
    { time: 23.1, image: 28 }, // "parchar"
    { time: 23.4, image: 29 }, // "contigo"
    { time: 24.0, image: 30 }, // "en el Lleras"
    { time: 25.0, image: 31 }, // "Re"
    { time: 25.5, image: 32 }, // "Re"
    { time: 25.9, image: 33 }, // "Reeeeeina"
    { time: 27.2, image: 34 }, // "Mi"
    { time: 27.6, image: 35 }, // "amor"
    { time: 27.9, image: 36 }, // "yo" 
    { time: 28.2, image: 37 }, // "te extraño"
    { time: 29.4, image: 38 }, // "bebé"
    { time: 30.5, image: 39 }, // "Qué"
    { time: 31.1, image: 40 }, // "hijueputa"
    { time: 31.7, image: 41 }, // "chimba"
    { time: 32.5, image: 42 }, // "sería"
    { time: 33.6, image: 43 }, // "vernos"
    { time: 34.4, image: 44 }, // "otra vez"
  ];
  
  // Actualizar la imagen basada en el tiempo actual de reproducción
  useEffect(() => {
    if (!audioRef.current || !isPlaying) return;
    
    const updateLyricImage = () => {
      const currentTime = audioRef.current.currentTime;
      
      // Encontrar la imagen actual basada en el tiempo
      let foundImage = null;
      for (let i = lyricTimings.length - 1; i >= 0; i--) {
        if (currentTime >= lyricTimings[i].time) {
          foundImage = lyricTimings[i].image;
          break;
        }
      }
      
      setCurrentImageIndex(foundImage);
    };
    
    // Configurar intervalo para verificar el tiempo
    const interval = setInterval(updateLyricImage, 50); // Más frecuente para mejor sincronización
    
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  // Limpiar timers cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
      }
    };
  }, []);
  
  // Función para mostrar el mensaje final palabra por palabra
  const showFinalMessageAnimation = () => {
    setShowFinalMessage(true);
    setFinalMessageIndex(0);
    
    const animateFinalMessage = (index) => {
      if (index < finalMessage.length) {
        setFinalMessageIndex(index + 1);
        messageTimerRef.current = setTimeout(() => {
          animateFinalMessage(index + 1);
        }, 1200); // Tiempo entre cada frase
      }
    };
    
    // Comenzar la animación después de un breve retraso
    messageTimerRef.current = setTimeout(() => {
      animateFinalMessage(0);
    }, 500);
  };
  
  // Función para reiniciar
  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentImageIndex(null);
    setShowContent(true);
    setFadeOut(false);
    setShowFinalMessage(false);
    setFinalMessageIndex(0);
    
    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
    }
  };
  
  // Iniciar reproducción con efecto de desvanecimiento
  const startPlayback = () => {
    setFadeOut(true);
    
    // Después de la animación de desvanecimiento
    setTimeout(() => {
      setShowContent(false);
      
      // Pequeña pausa antes de comenzar
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0; // Asegurar que empiece desde el principio
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              console.error("Error al reproducir el audio:", error);
              setShowContent(true);
              setFadeOut(false);
            });
        }
      }, 500);
    }, 1000); // Duración del desvanecimiento
  };
  
  // Generar divs de fondo para el efecto collage
  const backgroundElements = Array.from({ length: 15 }).map((_, index) => {
    // Valores aleatorios para cada elemento pero fijos por index
    const width = 100 + (index * 15) % 200;
    const height = 80 + (index * 12) % 150;
    const top = (index * 7) % 90;
    const left = (index * 6) % 90;
    const rotate = (index * 3 - 20) % 40;
    const hue1 = (index * 25) % 360;
    const hue2 = (hue1 + 180) % 360;
    
    return (
      <div 
        key={index}
        className={`background-element ${fadeOut ? 'fade-out' : ''}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          top: `${top}%`,
          left: `${left}%`,
          background: `linear-gradient(${index * 30}deg, hsla(${hue1}, 100%, 50%, 0.3), hsla(${hue2}, 100%, 50%, 0.3))`,
          transform: `rotate(${rotate}deg)`
        }}
      />
    );
  });
  
  return (
    <div className="anniversary-container">
      {/* Fondo con efecto de recortes de revista */}
      <div className="background-container">
        <div className={`background-gradient ${fadeOut ? 'fade-out' : ''}`}></div>
        {backgroundElements}
      </div>
      
      {/* Pantalla de inicio */}
      {showContent && (
        <div className={`content-container ${fadeOut ? 'fade-out' : ''}`}>
          {/* Título */}
          <h1 className="title">Nuestros 15 Meses</h1>
          
          {/* Descripción */}
          <p className="description">
            Un pequeño regalo por nuestro aniversario, con todo mi amor.
          </p>
          
          {/* Botón para reproducir */}
          <button 
            onClick={startPlayback}
            className="start-button"
          >
            o.O
          </button>
        </div>
      )}
      
      {/* Visualización de la letra con imágenes */}
      {!showContent && !showFinalMessage && (
        <div className="lyrics-container">
          {/* Imagen de la letra actual */}
          <div className="image-container">
            {currentImageIndex && (
              <img 
                src={getImageUrl(imageFiles[currentImageIndex])}
                alt="Letra de canción"
                className="lyric-image"
              />
            )}
          </div>
        </div>
      )}
      
      {/* Mensaje final con animación */}
      {showFinalMessage && (
        <div className="final-message-container">
          <div className="final-message-content">
            {finalMessage.slice(0, finalMessageIndex).map((line, index) => (
              <div 
                key={index} 
                className="final-message-line"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  fontSize: line.includes("❤️") ? "3rem" : undefined
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Elemento de audio oculto */}
      <audio 
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        onEnded={() => {
          setIsPlaying(false);
          // Transición suave a mensaje final
          setCurrentImageIndex(null);
          setTimeout(() => {
            showFinalMessageAnimation();
          }, 1000);
        }}
        className="hidden-audio"
      />
      
      {/* Botón para reiniciar (siempre visible cuando está reproduciendo o mostrando mensaje final) */}
      {(isPlaying || showFinalMessage) && (
        <button 
          onClick={handleReset}
          className="reset-button"
          style={{ 
            zIndex: 999
          }}
        >
          Reiniciar
        </button>
      )}
    </div>
  );
};

export default QuinceMeses;