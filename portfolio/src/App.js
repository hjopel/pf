import "./App.css";
import { useSpring } from "@react-spring/core";
import { useLocation } from "wouter";
import {
  Container,
  Nav,
  HeroDiv,
  LandingDiv,
  ContentContainer,
  Heading,
  Paragraph,
  Button,
  AboutDiv,
} from "./SComponents";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Html,
  ScrollControls,
  useScroll,
  Scroll,
  Image,
  Text,
} from "@react-three/drei";
import TorusWordKnot from "./components/TorusWordKnot";
// import { a } from "@react-spring/three";
import { useRef, useState, useEffect, Suspense } from "react";
// import gsap from "gsap";
// import * as THREE from "three";
import { AnimatePresence, motion } from "framer-motion";

const CanvasBox = ({ pages }) => {
  const state = useThree();
  const { width: w, height: h } = state.viewport;
  const imageRef = useRef();
  const scroll = useScroll();
  const landingRef = useRef();
  const introRef = useRef();
  const aboutRef = useRef();
  const projectsRef = useRef();
  const torusRef = useRef();
  let idx = 0;
  const [desc, setDesc] = useState(descItems[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      idx = ++idx % descItems.length;
      setDesc(descItems[idx]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  useFrame(() => {
    const page1Scroll = scroll.range(0 / pages, 1 / pages);
    const page2Scroll = scroll.range(1 / pages, 1.5 / pages);
    const thirdScroll = scroll.range(1.7 / pages, 1.8 / pages);
    const v1 = scroll.visible(0 / pages, 1 / (pages * 10));
    const v2 = scroll.visible(1 / (pages * 1.25), 1 / pages);
    const v3 = scroll.visible(1.5 / pages, 1.7 / pages);

    torusRef.current.position.z = page1Scroll * -30 + page2Scroll * +50;
    torusRef.current.position.x = page1Scroll * 14 + page2Scroll * -10;
    torusRef.current.position.y = page2Scroll * 8;
    torusRef.current.rotation.y = -(
      (Math.PI / 10) * page1Scroll +
      (-Math.PI / 10) * page2Scroll
    );
    state.camera.rotation.y = Math.PI * thirdScroll;
    if (landingRef && landingRef.current)
      landingRef.current.classList.toggle("show", v1);

    // if (r1 >= 0.1 && !isHidden) {
    //   switchView();
    //   isHidden = true;
    // }

    if (introRef && introRef.current) {
      introRef.current.classList.toggle("show", v2);
    }

    if (aboutRef && aboutRef.current) {
      aboutRef.current.classList.toggle("show", v3);
    }
  });

  return (
    <>
      <spotLight position={[0, 30, 40]} />
      <spotLight position={[-50, 30, 40]} />
      <TorusWordKnot ref={torusRef} />
      {/* <Environment files="photo_studio_01_1k.hdr" /> */}
      <Scroll html>
        <div className=" heroDivContainer data" ref={landingRef}>
          <HeroDiv id="heroDiv">
            <Heading>Jan Hoppel</Heading>
            <Button primary>Scroll to learn more</Button>
          </HeroDiv>
        </div>

        <div ref={introRef} className="heroDivContainer data ">
          <LandingDiv>
            <Paragraph>Hi, I'm Jan</Paragraph>
            <Heading>I write code</Heading>
            <Paragraph>
              Software developer looking for{" "}
              <AnimatePresence exitBeforeEnter>
                <motion.span
                  key={desc}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.5 } }}
                  exit={{ opacity: 0 }}
                >
                  {desc}
                </motion.span>
              </AnimatePresence>
            </Paragraph>
          </LandingDiv>
        </div>
        <div className="heroDivContainer  data" ref={aboutRef}>
          <AboutDiv>
            <Heading>About me</Heading>
            <Paragraph>
              I'm a 19-year old living in Vienna (soon), who enjoys coding
              full-stack applications as well as experimenting with WebGL (which
              you are seeing right now) while also spending way to much time in
              the gym (according to other people at least).
            </Paragraph>
          </AboutDiv>
        </div>
        <div className="heroDivContainer  data" ref={projectsRef}>
          <AboutDiv>
            <Heading>next</Heading>
          </AboutDiv>
        </div>
      </Scroll>
      <group>{/* <Text scale={[w / 5, h / 5, 1]}>About me</Text> */}</group>
      <Image
        scale={[w / 5, w / 3, 1]}
        position={[-w / 3, -h * 2, 0]}
        url="/hoppel.jpg"
        ref={imageRef}
      />
      {/* <OrbitControls /> */}
    </>
  );
};
const descItems = ["a job", "a project", "something to code"];

function App() {
  const [location] = useLocation();
  const style = useSpring({
    background: location === "/" ? "#16161a" : "#fffffa",
    // color: location === "/" ? "white" : "black",
  });
  const pages = 4;
  return (
    <>
      <Container style={{ ...style }}>
        <ContentContainer></ContentContainer>
      </Container>
      <Suspense fallback={null}>
        <Canvas concurrent camera={{ position: [0, 0, 0.1] }}>
          <ScrollControls pages={pages}>
            <CanvasBox pages={pages} />
          </ScrollControls>
        </Canvas>
      </Suspense>
      <div>
        <Nav />
      </div>
    </>
  );
}

export default App;
