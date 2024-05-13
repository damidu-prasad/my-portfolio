import React from "react";

import CountUp from "react-countup";

import { useInView } from "react-intersection-observer";

import { motion } from "framer-motion";

import { fadeIn } from "../variants";
import { Link } from "react-scroll";

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  return (
    <section id="about" className="section">
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-10 lg:flex-row lg:items-center lg:gap-x-20 lg:gap-y-0 h-screen">
          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1 bg-about bg-contain bg-no-repeat h-[640px] mix-blend-lighten bg-top"
          ></motion.div>
          <motion.div
            variants={fadeIn("left", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1"
          >
            <h2 className="h2 text-accent">About me.</h2>
            <h3 className="h3 mb-4">
              I'm a Freelance front-end developer with over 1 year of
              experiance.
            </h3>
            <p className="mb-6">
              Hello! I'm DAMINDU PRASAD, a passionate Software Engineering
              undergraduate at Java Institute for Advanced Technology. With a
              strong foundation in Java and a curiosity-driven approach to
              learning, I'm dedicated to crafting innovative solutions that make
              a meaningful impact..
            </p>
            <div className="flex gap-x-6 lg:gap-x-10 mb-12">
              <div>
                <div
                  ref={ref}
                  className="text-[40px] font-tertiary text-gradient mb-2"
                >
                  {inView ? <CountUp start={0} end={1} duration={3} /> : null}
                </div>
                <div className="font-primary text-sm tracking-[2px]">
                  Years of <br />
                  Experience
                </div>
              </div>
              <div>
                <div
                  ref={ref}
                  className="text-[40px] font-tertiary text-gradient mb-2"
                >
                  {inView ? <CountUp start={0} end={6} duration={3} /> : null}
                </div>
                <div className="font-primary text-sm tracking-[2px]">
                  Completed <br />
                  Projects
                </div>
              </div>
              <div>
                <div
                  ref={ref}
                  className="text-[40px] font-tertiary text-gradient mb-2"
                >
                  {inView ? <CountUp start={0} end={4} duration={3} /> : null}
                </div>
                <div className="font-primary text-sm tracking-[2px]">
                  Satisfyed <br />
                  Clients
                </div>
              </div>
            </div>
            <div className="flex gap-x-8 items-center">
              <Link to="contact">
                {" "}
                <button className="btn btn-lg">Contact me</button>
              </Link>

              <button className="text-gradient btn-link" onClick={() => {}}>
                My Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
