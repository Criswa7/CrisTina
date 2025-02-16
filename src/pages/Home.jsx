import React, { useState, useEffect } from 'react';
import LoveLetterCard from '../components/LoveLetterCard';
import { supabase } from '../config/supabase';

const Home = () => {
  const [duration, setDuration] = useState({ days: 0, months: 0 });
  const startDate = new Date('2024-01-15');
  const [browserType, setBrowserType] = useState('');
  const [partyURL, setPartyURL] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Detectar navegador
    setBrowserType(navigator.userAgent.includes("Edg") ? 'Edge' : 'Chrome');

    // Calcular duración
    const calculateDuration = () => {
      const now = new Date();
      const diffTime = Math.abs(now - startDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const months = Math.floor(diffDays / 30.44);
      setDuration({ days: diffDays, months });
    };

    calculateDuration();
    const timer = setInterval(calculateDuration, 86400000);

    // Obtener URL de la fiesta
    const fetchPartyURL = async () => {
      try {
        const { data, error } = await supabase
          .from('watch_party')
          .select('url')
          .single();

        if (!error && data) {
          setPartyURL(data.url);
        }
      } catch (err) {
        console.error('Error al obtener la URL:', err);
      }
    };

    fetchPartyURL();

    return () => clearInterval(timer);
  }, []);

  const handleInstallExtension = () => {
    const storeUrls = {
      Chrome: 'https://chromewebstore.google.com/detail/fiesta-crunchyroll/doiccohjdlfcjejcpoddcolekfgipkna',
      Edge: 'https://microsoftedge.microsoft.com/addons/detail/fiesta-crunchyroll/eodpggegiabhccedfiecpnpamijcikge'
    };
    window.open(storeUrls[browserType], '_blank');
  };

  const handleCopyURL = async () => {
    try {
      await navigator.clipboard.writeText(partyURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar la URL:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 font-cursive pb-12">
      {/* Header */}
      <div className="container mx-auto px-4 py-8 text-center animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold text-rose-600 mb-4 font-parisienne">
          Felices 13 Meses Mi Amor 💖
        </h1>
        <p className="text-xl text-rose-500 mb-8">Nuestro rinconcito de amor, nuestra web</p>
      </div>

      {/* Sección Crunchyroll y URL */}
      <div className="max-w-2xl mx-auto px-4 mb-12">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12 transform hover:scale-102 transition-all duration-300">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-parisienne text-rose-600">Ver One Piece Juntos 🏴‍☠️</h2>
            
            {/* Instalación de la extensión */}
            <div className="space-y-4">
              <p className="text-lg text-rose-700">
                Para que podamos ver nuestros capítulos perfectamente sincronizados, 
                he añadido una forma fácil de instalar la extensión "Fiesta Crunchyroll" 💕
              </p>
              
              <button
                onClick={handleInstallExtension}
                className="px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full 
                         shadow-lg transform hover:scale-105 transition-all duration-300 
                         font-semibold flex items-center justify-center mx-auto space-x-2"
              >
                <span>Instalar Fiesta Crunchyroll para {browserType}</span>
                <span className="text-xl">🎬</span>
              </button>
              
              <p className="text-sm text-rose-500">
                Nos dirigirá automáticamente a la tienda correcta para tu navegador 💝
              </p>
            </div>

            {/* Sección de URL */}
            {partyURL && (
              <div className="mt-8 space-y-4 pt-8 border-t border-rose-200">
                <p className="text-lg text-rose-700">
                  Con esta URL podremos sincronizar nuestros capítulos:
                </p>
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-rose-50 px-6 py-3 rounded-lg text-rose-700 font-medium break-all max-w-full">
                    {partyURL}
                  </div>
                  <button
                    onClick={handleCopyURL}
                    className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full 
                             shadow-lg transform hover:scale-105 transition-all duration-300 
                             font-semibold flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <span>¡Copiado! 🎉</span>
                      </>
                    ) : (
                      <>
                        <span>Copiar URL</span>
                        <span>📋</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Carta de amor */}
      <LoveLetterCard />

      {/* Sección de próximamente... */}
      <div className="bg-white/80 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-rose-600 mb-8 font-parisienne">
            ¡Pronto vendrán sorpresas maravillosas! 🎁
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-rose-50 rounded-xl shadow-md transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold text-rose-700 mb-2">Un contador de días juntos</h3>
              <p className="text-rose-600">
                Por ejemplo, ya tenemos programado de que llevamos {duration.days} días o {duration.months} meses ❤️
              </p>
            </div>
            <div className="p-4 bg-rose-50 rounded-xl shadow-md transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold text-rose-700 mb-2">Jueguitos</h3>
              <p className="text-rose-600">Para CrisTina</p>
            </div>
            <div className="p-4 bg-rose-50 rounded-xl shadow-md transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold text-rose-700 mb-2">La animación del inicio mejorada</h3>
              <p className="text-rose-600">E interactiva, de hecho vuelve a entrar y dale click en la foto que tenemos ;)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Efectos decorativos */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="absolute text-rose-300 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
              opacity: 0.5
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Estilos globales */}
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

        /* Scrollbar personalizado */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #fff3f3;
        }

        ::-webkit-scrollbar-thumb {
          background: #f43f5e;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #e11d48;
        }
      `}</style>
    </div>
  );
};

export default Home;