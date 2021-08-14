import { motion } from "framer-motion";

function FadeIn({ className, delay, yOffset, children }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            transition={{
                duration: 0.6,
                ease: [0.43, 0, 0.58, 1],
                delay: delay,
            }}
            variants={{
                visible: { y: 0, x: 0, opacity: 1 },
                hidden: { y: yOffset !== undefined ? yOffset : 25, opacity: 0 },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default FadeIn;
