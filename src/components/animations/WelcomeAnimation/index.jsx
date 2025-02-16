import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import MediaAnimation from '../MediaAnimation'
import './index.css'

const WelcomeAnimation = () => {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const requestRef = useRef();
  const timeRef = useRef(0);
  const pathProgress = useRef(0);
  const permanentPoints = useRef([]);
  const phaseEndPoints = useRef({ entry: null });
  const pulsationStartTime = useRef(null);
  const buttonShown = useRef(false);
  const [showButton, setShowButton] = useState(false);
  const [mediaAnimationComplete, setMediaAnimationComplete] = useState(false);
  const [playMediaAnimation, setPlayMediaAnimation] = useState(false);
  const navigate = useNavigate();

  const handleEnterClick = () => {
    if (mediaAnimationComplete) {
      navigate('/home');
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Optimización del resize: usar requestAnimationFrame para evitar llamadas excesivas
    let resizeFrame = null;
    const setCanvasSize = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize, { passive: true });

    // --------------------------
    // 1. Definir el trazo base (cursiva) de "Te amo"
    // --------------------------
    const baseTextPath = [
      { x: -52, y: -22 },
      { x: -45, y: -23 },
      { x: -37, y: -24 },
      { x: -30, y: -24 },
      { x: -22, y: -24 },
      { x: -15, y: -24 },
      { x: -7, y: -24 },
      { x: 0, y: -24 },
      { x: 7, y: -23 },
      { x: 15, y: -23 },
      { x: 22, y: -22 },
      { x: 30, y: -22 },
      { x: 37, y: -22 },
      { x: -3, y: -22 },
      { x: -2, y: -18 },
      { x: -2, y: -13 },
      { x: -1, y: -9 },
      { x: 0, y: -4 },
      { x: 1, y: 0 },
      { x: 2, y: 4 },
      { x: 3, y: 9 },
      { x: 4, y: 13 },
      { x: 5, y: 18 },
      { x: 6, y: 22 },
      { x: 7, y: 27 },
      { x: 12, y: 24 },
      { x: 18, y: 21 },
      { x: 24, y: 18 },
      { x: 30, y: 15 },
      { x: 36, y: 12 },
      { x: 42, y: 10 },
      { x: 48, y: 9 },
      { x: 52, y: 7 },
      { x: 57, y: 7 },
      { x: 61, y: 9 },
      { x: 64, y: 12 },
      { x: 66, y: 15 },
      { x: 64, y: 18 },
      { x: 61, y: 21 },
      { x: 57, y: 22 },
      { x: 52, y: 24 },
      { x: 48, y: 24 },
      { x: 43, y: 22 },
      { x: 39, y: 21 },
      { x: 48, y: 19 },
      { x: 54, y: 18 },
      { x: 60, y: 16 },
      { x: 66, y: 15 },
      { x: 72, y: 13 },
      { x: 78, y: 10 },
      { x: 84, y: 6 },
      { x: 90, y: 1 },
      { x: 96, y: -3 },
      { x: 102, y: 0 },
      { x: 105, y: 4 },
      { x: 108, y: 9 },
      { x: 109, y: 13 },
      { x: 111, y: 18 },
      { x: 109, y: 22 },
      { x: 106, y: 25 },
      { x: 102, y: 24 },
      { x: 97, y: 22 },
      { x: 93, y: 19 },
      { x: 96, y: 16 },
      { x: 100, y: 15 },
      { x: 105, y: 13 },
      { x: 109, y: 13 },
      { x: 114, y: 13 },
      { x: 118, y: 15 },
      { x: 123, y: 16 },
      { x: 127, y: 15 },
      { x: 127, y: 10 },
      { x: 127, y: 6 },
      { x: 127, y: 1 },
      { x: 127, y: -3 },
      { x: 129, y: 1 },
      { x: 130, y: 6 },
      { x: 132, y: 10 },
      { x: 135, y: 13 },
      { x: 138, y: 16 },
      { x: 141, y: 19 },
      { x: 144, y: 15 },
      { x: 147, y: 10 },
      { x: 150, y: 6 },
      { x: 153, y: 1 },
      { x: 156, y: -3 },
      { x: 159, y: 1 },
      { x: 162, y: 6 },
      { x: 165, y: 10 },
      { x: 168, y: 13 },
      { x: 171, y: 16 },
      { x: 174, y: 19 },
      { x: 177, y: 15 },
      { x: 180, y: 10 },
      { x: 183, y: 6 },
      { x: 186, y: 1 },
      { x: 189, y: 4 },
      { x: 192, y: 7 },
      { x: 195, y: 10 },
      { x: 199, y: 9 },
      { x: 204, y: 6 },
      { x: 208, y: 3 },
      { x: 213, y: 1 },
      { x: 217, y: 0 },
      { x: 222, y: 0 },
      { x: 226, y: 1 },
      { x: 231, y: 4 },
      { x: 234, y: 7 },
      { x: 235, y: 12 },
      { x: 234, y: 16 },
      { x: 231, y: 19 },
      { x: 226, y: 22 },
      { x: 222, y: 24 },
      { x: 217, y: 24 },
      { x: 213, y: 22 },
      { x: 208, y: 19 },
      { x: 204, y: 16 },
      { x: 199, y: 12 },
      { x: 198, y: 7 },
      { x: 195, y: 4 },
      { x: 192, y: 1 },
      { x: 189, y: -1 }
    ];

    // --------------------------
    // 2. Funciones de transformación para generar otras "fuentes"
    // --------------------------
    const transformSans = (path) => {
      const newPath = [];
      for (let i = 0; i < path.length; i += 2) {
        newPath.push({ ...path[i] });
      }
      if (path.length % 2 === 0) {
        newPath.push({ ...path[path.length - 1] });
      }
      return newPath;
    };

    const transformPixel = (path) => {
      return path.map(pt => ({
        x: Math.round(pt.x / 5) * 5,
        y: Math.round(pt.y / 5) * 5,
      }));
    };

    const transformHandwritten = (path) => {
      return path.map((pt, index) => ({
        x: pt.x + Math.sin(index) * 2,
        y: pt.y + Math.cos(index) * 2,
      }));
    };

    const transformBrush = (path) => {
      return path.map(pt => ({
        x: pt.x * 1.05,
        y: pt.y * 0.95,
      }));
    };

    const transformSketch = (path) => {
      return path.map(pt => ({
        x: pt.x + (Math.random() - 0.5) * 4,
        y: pt.y + (Math.random() - 0.5) * 4,
      }));
    };

    // --------------------------
    // 3. Generar un objeto con las 7 versiones de "Te amo"
    // --------------------------
    const textPaths = {
      cursive: baseTextPath,
      sans: transformSans(baseTextPath),
      pixel: transformPixel(baseTextPath),
      handwritten: transformHandwritten(baseTextPath),
      brush: transformBrush(baseTextPath),
      sketch: transformSketch(baseTextPath),
    };

    const activeFont = { current: 'cursive' };
    const switchingFonts = { current: false };

    const getPermanentPointsForFont = (fontKey, width, height) => {
      const path = textPaths[fontKey];
      const centerX = width / 2;
      const centerY = height / 2;
      const textStartX = centerX - 75;
      const textStartY = centerY;
      return path.map(pt => ({ x: textStartX + pt.x, y: textStartY + pt.y }));
    };

    // --------------------------
    // 4. Función de interpolación y generación de puntos según la fase
    // --------------------------
    const lerp = (start, end, t) => start * (1 - t) + end * t;

    const generatePathPoint = (progress, width, height) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const textStartX = centerX - 75;
      const textStartY = centerY;

      if (progress < 0.15) {
        const p = progress / 0.15;
        const startX = width + 100;
        const endX = centerX + 120;
        const x = lerp(startX, endX, p);
        const y = lerp(height * 0.4, centerY, p) + Math.sin(p * Math.PI) * 100;
        if (p > 0.98 && !phaseEndPoints.current.entry) {
          phaseEndPoints.current.entry = { x, y };
        }
        return { x, y, speed: 1.0 };
      } else if (progress < 0.6) {
        const p = (progress - 0.15) / 0.45;
        const entryPoint = phaseEndPoints.current.entry || { x: centerX + 120, y: centerY };
        const currentFontPath = textPaths[activeFont.current];
        const textStartDraw = { 
          x: textStartX + currentFontPath[0].x, 
          y: textStartY + currentFontPath[0].y 
        };
        const spiralEnd = textStartDraw;
        const baseX = lerp(entryPoint.x, spiralEnd.x, p);
        const baseY = lerp(entryPoint.y, spiralEnd.y, p);
        const amplitude = 20 * Math.sin(Math.PI * p);
        const angle = p * Math.PI * 12;
        return { x: baseX + amplitude * Math.cos(angle), y: baseY + amplitude * Math.sin(angle), speed: 1.0 };
      } else {
        const p = (progress - 0.6) / 0.4;
        const textProgress = p;
        const currentFontPath = textPaths[activeFont.current];
        const pathIndex = Math.min(
          Math.floor(textProgress * currentFontPath.length),
          currentFontPath.length - 2
        );
        const subProgress = (textProgress * currentFontPath.length) % 1;
        const current = currentFontPath[pathIndex];
        const next = currentFontPath[pathIndex + 1];
        const x = textStartX + lerp(current.x, next.x, subProgress);
        const y = textStartY + lerp(current.y, next.y, subProgress);
        if (pathIndex > (permanentPoints.current.length - 2)) {
          permanentPoints.current.push({ x, y, timestamp: performance.now() });
        }
        return { x, y, speed: 1.0 };
      }
    };

    // --------------------------
    // 5. Función para dibujar una línea a partir de un conjunto de puntos
    // Optimización: Uso de Path2D para mayor rendimiento
    // --------------------------
    const drawLine = (pointsArray, isTemporary = true) => {
      if (pointsArray.length < 2) return;
      const path = new Path2D();
      path.moveTo(pointsArray[0].x, pointsArray[0].y);
      for (let i = 0; i < pointsArray.length - 1; i++) {
        const xc = (pointsArray[i].x + pointsArray[i + 1].x) / 2;
        const yc = (pointsArray[i].y + pointsArray[i + 1].y) / 2;
        path.quadraticCurveTo(pointsArray[i].x, pointsArray[i].y, xc, yc);
      }
      ctx.strokeStyle = isTemporary ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 1)';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke(path);

      if (isTemporary) {
        const path2 = new Path2D();
        path2.moveTo(pointsArray[0].x, pointsArray[0].y);
        for (let i = 0; i < pointsArray.length - 1; i++) {
          const xc = (pointsArray[i].x + pointsArray[i + 1].x) / 2;
          const yc = (pointsArray[i].y + pointsArray[i + 1].y) / 2;
          path2.quadraticCurveTo(pointsArray[i].x, pointsArray[i].y, xc, yc);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 5;
        ctx.stroke(path2);
      }
    };

    // --------------------------
    // 6. Función que cambia la fuente cada 200ms durante 6 segundos
    // --------------------------
    const startFontSwitching = () => {
      const fonts = Object.keys(textPaths);
      let index = fonts.indexOf('cursive');
      const switchingDuration = 6000;
      const switchInterval = 200;
      const intervalId = setInterval(() => {
        index = (index + 1) % fonts.length;
        activeFont.current = fonts[index];
      }, switchInterval);
      setTimeout(() => {
        clearInterval(intervalId);
        activeFont.current = 'cursive';
        switchingFonts.current = false;
      }, switchingDuration);
    };

    // --------------------------
    // 7. Bucle de animación optimizado para fluidez
    // --------------------------
    const animate = (timestamp) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const finished = pathProgress.current >= 1;

      if (permanentPoints.current.length > 0) {
        if (finished) {
          if (!pulsationStartTime.current) {
            pulsationStartTime.current = timestamp;
          }
          const pulsationDuration = 600;
          const pulsationElapsed = timestamp - pulsationStartTime.current;
          const amplitude = 0.1;
          let scale = 1;
          if (pulsationElapsed < pulsationDuration) {
            scale = 1 + amplitude * Math.sin((pulsationElapsed / pulsationDuration) * Math.PI);
          } else {
            scale = 1;
            if (!buttonShown.current) {
              buttonShown.current = true;
              setShowButton(true);
              setPlayMediaAnimation(true);
              if (!switchingFonts.current) {
                switchingFonts.current = true;
                startFontSwitching();
              }
            }
          }
          const centerX = width / 2;
          const centerY = height / 2;
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.scale(scale, scale);
          ctx.translate(-centerX, -centerY);
          const fontToDraw = switchingFonts.current ? activeFont.current : 'cursive';
          const fontPermanentPoints = getPermanentPointsForFont(fontToDraw, width, height);
          drawLine(fontPermanentPoints, false);
          ctx.restore();
        } else {
          drawLine(permanentPoints.current, false);
        }
      }

      if (!finished) {
        if (!timeRef.current) timeRef.current = timestamp;
        const deltaTime = timestamp - timeRef.current;
        timeRef.current = timestamp;
        const point = generatePathPoint(pathProgress.current, width, height);
        const speedMultiplier = point.speed || 1;
        pathProgress.current += deltaTime * 0.0003 * speedMultiplier;
        points.current.push({ x: point.x, y: point.y, timestamp: performance.now() });
        if (points.current.length > 45) {
          points.current = points.current.slice(-45);
        }
        const now = performance.now();
        points.current = points.current.filter(pt => now - pt.timestamp < 300);
        if (points.current.length > 2) {
          drawLine(points.current);
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
      />
      {playMediaAnimation && (
        <MediaAnimation
          onAnimationComplete={() => {
            setMediaAnimationComplete(true);
          }}
        />
      )}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="button-container">
              <motion.button
                onClick={handleEnterClick}
                className="enter-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Entrar
              </motion.button>
              <div className="arrow-tap">
                <div className="arrow"></div>
                <div className="tap-text">
                  <span>TAP</span>
                  <span>TAP</span>
                  <span>TAP</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WelcomeAnimation;