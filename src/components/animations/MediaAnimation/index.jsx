import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mediaService } from '../../../services/mediaService';

const MediaAnimation = ({ onAnimationComplete }) => {
  const [mediaAsset, setMediaAsset] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const totalCards = 7;
  const scaleFactor = 0.02;

  useEffect(() => {
    const loadMediaAsset = async () => {
      const { data, error } = await mediaService.getAnimationAssets();
      const asset = (data && data.length > 0)
        ? data[0]
        : { url: '/api/placeholder/150/200', description: 'Card placeholder' };

      setMediaAsset(asset);
      setIsLoading(false);
    };

    loadMediaAsset();
  }, []);

  useEffect(() => {
    if (!isLoading && !isAnimationComplete) {
      const timer = setTimeout(() => {
        setIsAnimationComplete(true);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, onAnimationComplete, isAnimationComplete]);

  if (isLoading || !mediaAsset) {
    return null;
  }

  const variants = {
    initial: (index) => ({
      x: window.innerWidth + 100,
      y: window.innerHeight * 0.2,
      scale: 1 + (index * scaleFactor),
      zIndex: index,
      rotate: 0,
    }),
    animate: (index) => ({
      x: 0,
      y: window.innerHeight * 0.15,
      scale: 1 + (index * scaleFactor),
      zIndex: index,
      rotate: 10,
    }),
    exit: (index) => ({
      x: -window.innerWidth - 100,
      y: window.innerHeight * 0.15,
      scale: 1 + (index * scaleFactor),
      zIndex: index,
      rotate: 10,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    }),
  };

  const cardVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  const descriptionVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      transformOrigin: "top"
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        pointerEvents: isAnimationComplete ? 'auto' : 'none',
        zIndex: 100
      }}
    >
      <AnimatePresence>
        {isAnimationComplete ? (
          <motion.div
            key={totalCards - 1}
            custom={totalCards - 1}
            variants={variants}
            initial="initial"
            animate="animate"
            className="absolute"
            style={{
              width: '100px',
              height: '150px',
              transformOrigin: 'center',
              cursor: 'pointer',
            }}
          >
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={cardVariants}
              onClick={() => setShowDescription(prev => !prev)}
              className="relative w-full h-full"
            >
              <motion.div className="w-full h-full rounded-xl overflow-hidden bg-white shadow-lg">
                <img
                  src={mediaAsset.url}
                  alt={mediaAsset.description || 'Animation card'}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>

              <AnimatePresence>
                {showDescription && (
                  <motion.div
                    variants={descriptionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 min-w-48 max-w-64 bg-white rounded-lg shadow-xl p-4 z-50"
                  >
                    <motion.div
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.p
                      className="text-sm text-gray-800 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {mediaAsset.description}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : (
          Array.from({ length: totalCards }).map((_, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 1.2,
                delay: index * 0.05,
                ease: [0.6, 0.01, -0.05, 0.95],
              }}
              className="absolute"
              style={{
                width: '100px',
                height: '150px',
                transformOrigin: 'center',
              }}
            >
              <img
                src={mediaAsset.url}
                alt={mediaAsset.description || 'Animation card'}
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaAnimation;