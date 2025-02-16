import React, { useState, useEffect } from 'react';

const Home = () => {
  const [duration, setDuration] = useState({ days: 0, months: 0 });
  const startDate = new Date('2024-01-15');

  useEffect(() => {
    const calculateDuration = () => {
      const now = new Date();
      const diffTime = Math.abs(now - startDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      // Calculate months (approximate)
      const months = Math.floor(diffDays / 30.44); // Average days in a month
      
      setDuration({ days: diffDays, months });
    };

    calculateDuration();
    // Update every day at midnight
    const timer = setInterval(calculateDuration, 86400000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 font-cursive">
      {/* Encabezado con animación */}
      <div className="container mx-auto px-4 py-8 text-center animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold text-rose-600 mb-4 font-parisienne">
          Felices 13 Meses Mi Amor 💖
        </h1>
        <p className="text-xl text-rose-500 mb-8">Nuestro rinconcito de amor, nuestra web</p>
      </div>

      {/* Carta de amor en formato tarjeta */}
      <div className="max-w-2xl mx-auto px-4 mb-12 animate-float">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12 transform hover:scale-102 transition-all duration-300">
          <div className="space-y-6 text-rose-700">
            <p className="text-2xl font-parisienne text-center mb-6">Mi querida Tinita,</p>
            
            <p className="text-lg leading-relaxed">
            Hoy no solo celebramos 13 meses de estar construyendo esta historia tan bonita juntos, sino también el inicio de algo nuevo y especial. Quise crear este espacio digital para ti, un rinconcito nuestro en internet donde tambien podre expresarte todo lo que significas para mí 💞
            </p>

            <p className="text-lg leading-relaxed">
            Estos 13 meses han sido una aventura increíble mi amor, mi vida ha sido maravillosa, hemos aprendido a convertir la distancia en nuestra aliada, a querernos de formas creativas y diferentes, y a crecer juntos incluso estando separados. Cada día me sorprendo más de lo fuerte que es nuestro amor y de cómo seguimos encontrando nuevas formas de estar cerca a pesar de los kilómetros y me emociona, me llena de vida saber que tambien voy para alla mi amor c: 🌙
            </p>

            <p className="text-lg leading-relaxed">
            Me encanta cómo nos apoyamos mutuamente en nuestros sueños y metas. Tú me inspiras a ser mejor cada día, a superarme profesionalmente, a explorar nuevas habilidades - como este sitio web que hice pensando en ti. Cada paso que doy, cada nueva cosa que aprendo, es un paso más cerca de nuestro sueño de estar juntos en España.
            </p>

            <p className="text-lg leading-relaxed">
            Ver tu sonrisa en las videollamadas, recibir tus mensajes llenos de amor, sentir tu apoyo incondicional en cada proyecto que emprendo - todo eso hace que mi corazón se llene de felicidad y gratitud por tenerte en mi vida. Eres mi compañera, mi confidente, mi motivación y mi amor más bonito.
            </p>
            <p className="text-lg leading-relaxed">
            Este sitio web es un regalo especial para ti, un lugar donde podré expresarte mi amor otra manerita, así como este espacio digital, mi amor por ti sigue creciendo y evolucionando cada día.
            </p>

            <p className="text-lg leading-relaxed">
              Pronto tendremos:
            </p>

            <ul className="list-disc list-inside space-y-2 pl-4 text-rose-600">
              <li>📸 Nuestra galería</li>
              <li>🗓 Un contador de tiempo juntos</li>
              <li>💌 Mensajes secretos solo para ti</li>
              <li>🌍 Nuestro timeline</li>
            </ul>

            <p className="text-lg leading-relaxed">
            Gracias por estos 13 meses maravillosos, por tu amor, tu paciencia, tu apoyo, por ti tal cual eres y por hacer cada día más especial que el anterior. Este es solo el comienzo de todas las cosas bonitas que nos esperan juntos :,,,)
            </p>

            <div className="text-center mt-8">
              <p className="text-xl font-parisienne">Siempre tuyo,</p>
              <p className="text-2xl font-dancing-script text-rose-600">Cristiansito ♡</p>
              <p className="text-sm text-rose-400 mt-2">15 de Febrero, 2024 - Nuestro mes 13</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de próximamente */}
      <div className="bg-white/80 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-rose-600 mb-8 font-parisienne">
            ¡Pronto vendrán sorpresas maravillosas! 🎁
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-rose-50 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-rose-700 mb-2">Un contador de días juntos</h3>
              <p className="text-rose-600">
                Por ejemplo, ya tenemos programado de que llevamos {duration.days} días o {duration.months} meses ❤️
              </p>
            </div>
            <div className="p-4 bg-rose-50 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-rose-700 mb-2">Jueguitos</h3>
              <p className="text-rose-600">Para CrisTina</p>
            </div>
            <div className="p-4 bg-rose-50 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-rose-700 mb-2">La animación del inicio mejorada</h3>
              <p className="text-rose-600">E interactiva, de hecho vuelve a entrar y dale click en la foto que tenemos ;)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Efectos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="absolute text-rose-300 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Parisienne&family=Dancing+Script:wght@700&display=swap');
        
        .font-parisienne {
          font-family: 'Parisienne', cursive;
        }
        .font-dancing-script {
          font-family: 'Dancing Script', cursive;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-fade-in {
          animation: fade-in 1.5s ease-out;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;