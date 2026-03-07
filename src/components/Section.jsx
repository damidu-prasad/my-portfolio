import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section = ({ tag, title, children, className = "" }) => {
    const sectionRef = useRef();
    const contentRef = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(contentRef.current.children, {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={className}>
            <div className="content-wrapper" ref={contentRef}>
                {tag && <div className="status-tag">{tag}</div>}
                {title && <h2>{title}</h2>}
                {children}
            </div>
        </section>
    );
};

export default Section;
