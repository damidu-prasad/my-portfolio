import React from "react";

import Image from "../assets/avatar.svg";
import { TypeAnimation } from "react-type-animation";
import {
  FaGithub,
 
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaTelegram,
  FaReddit,
  FaDiscord,
 
} from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { Link } from "react-scroll";

const Banner = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = "../assets/CV.pdf"; // Set the href to the path of your PDF file
    link.download = 'Damidu-prasad-cv.pdf'; // Set the download attribute with the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <section
      id="home"
      className="min-h-[85vh] lg:min-h-[78vh] flex items-center "
    >
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12">
          <div className="flex-1 text-center font-secondary lg:text-left">
            <motion.h1
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="text-[55px] font-bold leading-[0.8] lg:text-[110px]"
            >
              DAMINDU <span>PRASAD</span>
            </motion.h1>
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="mb-6 text-[36px] lg:text-[60px] font-secondary font-semibold uppercase leading-[1]"
            >
              <span className="text-white mr-4">I am a </span>
              <TypeAnimation
                sequence={[
                  "Developer",
                  2000,
                  "Designer",
                  2000,
                  "Creator",
                  2000,
                ]}
                speed={50}
                className="text-accent"
                wrapper="span"
                repeat={Infinity}
              />
            </motion.div>
            <motion.p
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              Hello! I'm DAMINDU PRASAD, a passionate Software Engineering
              undergraduate at Java Institute for Advanced Technology. With a
              strong foundation in Java and a curiosity-driven approach to
              learning, I'm dedicated to crafting innovative solutions that make
              a meaningful impact.
            </motion.p>
            <motion.div
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="flex max-w-max gap-x-6 items-center mb-4 mx-auto lg:mx-0"
            >
               <Link to="contact"  className="btn btn-lg  flex items-center justify-center">Contact me</Link>
              
              <button onClick={handleDownload} className="text-gradient btn-link">
                Download My Cv
              </button>
            </motion.div>
            <motion.div
              variants={fadeIn("up", 0.7)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="flex text-[20px] gap-x-6 max-w-max mx-auto lg:mx-0"
            >
             
              <a href="https://github.com/damidu-prasad">
                <FaGithub />
              </a>
              <a href="https://web.facebook.com/profile.php?id=61556843999136">
                <FaFacebook />
              </a>
              <a href="www.daminduprasad.site">
                <FaLinkedin />
              </a>
              <a href="www.daminduprasad.site">
                <FaWhatsapp />
              </a>
              <a href="www.daminduprasad.site">
                <FaTwitter />
              </a>
              <a href="www.daminduprasad.site">
                <FaInstagram />
              </a>
              <a href="www.daminduprasad.site">
                <FaTiktok />
              </a>
              <a href="www.daminduprasad.site">
                <FaTelegram />
              </a>
              <a href="https://www.reddit.com/user/Consistent_Eye_3360/">
                <FaReddit />
              </a>
              <a href="www.daminduprasad.site">
                <FaDiscord />
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeIn("down", 0.5)}
            initial="hidden"
            whileInView={"show"}
            className="hidden lg:flex flex-1 max-w-[320px] lg:max-w-[482px]"
          >
            <img src={Image} alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
