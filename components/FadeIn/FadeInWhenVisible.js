import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

function FadeInWhenVisible({
    className,
    threshold,
    top,
    delay,
    yOffset,
    children,
}) {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: threshold });

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
            transition={{
                duration: 0.6,
                ease: [0.43, 0, 0.58, 1],
                delay: delay,
            }}
            variants={{
                visible: { y: 0, x: 0, opacity: 1 },
                hidden: { y: yOffset !== undefined ? yOffset : 50, opacity: 0 },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default FadeInWhenVisible;
