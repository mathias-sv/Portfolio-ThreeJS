import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <AnimatePresence wait>
      <motion.div 
        className="loading-screen bg-white dark:bg-purpleosc-950 flex items-center justify-center h-screen w-screen fixed top-0 left-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} // Cambiado a 0 para que se desvanezca al salir
        transition={{ duration: 0.5 }}
      >
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="icon icon-tabler icon-tabler-code-dots text-black dark:text-white animate-fill w-32 h-32 m-auto"
          viewBox="0 0 24 24" 
          strokeWidth="2" 
          stroke="currentColor" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ y: 100, opacity: 0 }}
          animate={{ 
            y: [0, 0, 100],
            opacity: [0, 1, 0]
          }}
          exit={{ y: 0, opacity: 0 }} 
          transition={{ 
            y: { type: 'spring', stiffness: 0, repeat: Infinity },
            opacity: { duration: 1, repeat: Infinity }
          }}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 8l-4 4l4 4" /><path d="M17 8l4 4l-4 4" /><path d="M14 4l-4 16" />
        </motion.svg>
      </motion.div>
    </AnimatePresence>
  );
}