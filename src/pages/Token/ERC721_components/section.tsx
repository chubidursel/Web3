import { useAnimation, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function Section({ children }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  
    const control = useAnimation();
    useEffect(() => {
      if (isInView) {
        control.start("visible");
      } else {
        control.start("hidden");
      }
    }, [control, isInView]);
  
    return (
      <section ref={ref}>
        <motion.span
          initial="hidden"
          animate={control}
        >
          {children}
        </motion.span>
      </section>
    );
  }
  
 
export default Section;