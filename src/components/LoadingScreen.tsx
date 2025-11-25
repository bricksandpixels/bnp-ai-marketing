import type React from "react";
import { motion } from "motion/react"
import icon from "@/assets/Images/icon.webp"

const LoadingScreen: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    return (
        <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
            className={isLoading ? 'fixed left-0 top-0 w-full h-full bg-linear-to-br from-g1 to-g2 flex justify-center items-center' : ''}>
            {
                isLoading && (<>
                    <div className="absolute h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[1.5rem_1.5rem] opacity-1"></div>
                    <div className="absolute left-0 top-0 w-full h-full bg-dark -z-1"></div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isLoading ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="isolate w-full h-full rounded-xl shadow-lg flex items-center justify-center">
                        <img src={icon} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24" />
                        {/* <div className="w-28 h-28 rounded-full border-2 animate-spin border-x-white border-t-white border-b-transparent">
                </div> */}
                    </motion.div>
                </>)
            }
        </motion.div>
    )
}

export default LoadingScreen