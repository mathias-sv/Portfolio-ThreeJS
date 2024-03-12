import { motion } from 'framer-motion';
import {JSlogo} from '../../public/icon/JSlogo';
export const Habilidades = () => {
    const habilidades = [
        {nombre: 'JavaScript', logo: JSlogo, nivel: 'Avanzado'},
        
        
        // Agrega más habilidades aquí
    ];
    const cardVariants = {
        hover: { scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.5)", transition: { duration: 0.3 } },
    };
    return (
        <div className="grid grid-cols-3 gap-4">
            <motion.div 
                className="card py-4 bg-transparent border rounded-lg border-gray-800 flex" 
                variants={cardVariants} 
                initial="hidden" 
                animate="visible"
                whileHover="hover"
            >
                <div className="card-body overflow-visible py-2 flex-shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-brand-javascript"
                        width="100"
                        height="100"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z" />
                        <path d="M7.5 8h3v8l-2 -1" />
                        <path d="M16.5 8h-2.5a.5 .5 0 0 0 -.5 .5v3a.5 .5 0 0 0 .5 .5h1.423a.5 .5 0 0 1 .495 .57l-.418 2.93l-2 .5" />
                    </svg>
                </div>
                <div className="card-header pb-0 pt-2 px-4 flex-col items-start ml-4">
                    <h4 className="font-bold text-large">JavaScript</h4>
                    <small className="text-default-500">Avanzado</small>
                </div>
            </motion.div>
        </div>
    )
}