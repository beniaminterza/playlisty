import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

function SlideInWhenVisible({ isLeft, className, children }) {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            transition={{ duration: 1, ease: [0.43, 0, 0.58, 1] }}
            variants={{
                visible: { y: 0, x: 0, opacity: 1 },
                hidden: { x: isLeft ? -500 : 500, opacity: 0 },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default SlideInWhenVisible;
