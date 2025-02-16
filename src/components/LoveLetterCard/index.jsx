import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoveLetterCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const previewContent = `Hoy no solo celebramos 13 meses de estar construyendo esta historia tan bonita juntos, sino también el inicio de algo nuevo y especial. Quise crear este espacio digital para ti, un rinconcito nuestro en internet donde tambien podre expresarte todo lo que significas para mí 💞`;

  return (
    <>
      <motion.div
        className="max-w-2xl mx-auto px-4 mb-12 cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12">
          <div className="space-y-6 text-rose-700">
            <p className="text-2xl font-parisienne text-center mb-6">Mi querida Tinita,</p>
            <p className="text-lg leading-relaxed">{previewContent}</p>
            <div className="text-center text-rose-500 mt-4">
              <p>Click para abrir la carta completa 💌</p>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="fixed inset-4 md:inset-10 z-50 overflow-y-auto"
            >
              <div className="min-h-full flex items-center justify-center p-4">
                <motion.div 
                  className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl w-full relative"
                  layoutId="letter-content"
                >
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-rose-500 hover:text-rose-600 text-2xl"
                  >
                    ×
                  </button>

                  <div className="space-y-8 text-rose-700">
                    <motion.p 
                      className="text-3xl font-parisienne text-center mb-8"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Mi querida Tinita,
                    </motion.p>

                    <motion.div
                      className="space-y-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
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

                      <div className="space-y-4">
                        <p className="text-lg leading-relaxed">
                          Pronto tendremos:
                        </p>

                        <ul className="list-disc list-inside space-y-2 pl-4 text-rose-600">
                          <li>📸 Nuestra galería</li>
                          <li>🗓 Un contador de tiempo juntos</li>
                          <li>💌 Mensajes secretos solo para ti</li>
                          <li>🌍 Nuestro timeline</li>
                        </ul>
                      </div>

                      <p className="text-lg leading-relaxed">
                        Gracias por estos 13 meses maravillosos, por tu amor, tu paciencia, tu apoyo, por ti tal cual eres y por hacer cada día más especial que el anterior. Este es solo el comienzo de todas las cosas bonitas que nos esperan juntos :,,,)
                      </p>

                      <div className="text-center mt-12">
                        <p className="text-xl font-parisienne">Siempre tuyo,</p>
                        <p className="text-2xl font-dancing-script text-rose-600">Cristiansito ♡</p>
                        <p className="text-sm text-rose-400 mt-2">15 de Febrero, 2024 - Nuestro mes 13</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoveLetterCard;