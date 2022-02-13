import logo from "./logo.svg";
import "./App.css";
import { useSpring, useTransition } from "@react-spring/core";
import { useLocation, Switch, Route } from "wouter";
import {
  Container,
  Jumbo,
  Nav,
  Box,
  Line,
  Cover,
  HeroDiv,
  LandingDiv,
  ContentContainer,
  Heading,
  Paragraph,
  Button,
} from "./SComponents";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  ScrollControls,
  useScroll,
  Scroll,
} from "@react-three/drei";
import TorusWordKnot from "./components/TorusWordKnot";
import { a } from "@react-spring/three";
import { animated } from "@react-spring/web";
import { Suspense, useState, useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { AnimatePresence, motion } from "framer-motion";

const CanvasBox = ({ pages }) => {
  const state = useThree();
  // state.camera.lookAt(new THREE.Vector3(20, 0, 0));
  const switchView = () => {
    // const tl = gsap.timeline();
    // tl.to(".heroDivContainer", {
    //   duration: 1,
    //   ease: "circ.out",
    //   clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    // });
    // .to(
    //   state.camera.position,
    //   {
    //     duration: 4,
    //     ease: "power2.out",
    //     z: 30,
    //     x: -4,
    //   },
    //   ">"
    // )
    // .to(
    //   state.camera.rotation,
    //   {
    //     duration: 4,
    //     ease: "power2.out",
    //     y: Math.PI / 10,
    //   },
    //   0
    // )
    // .to(
    //   ".late-reveal",
    //   {
    //     duration: 3,
    //     clipPath: "polygon(100% 100%, 0 100%, 0 0, 100% 0)",
    //   },
    //   "-=3"
    // );
  };
  let isHidden = false;
  const scroll = useScroll();
  const htmlRef = useRef();
  const heroHtmlRef = useRef();
  const page3Ref = useRef();
  const torusRef = useRef();
  let idx = 0;
  const [desc, setDesc] = useState(descItems[0]);
  useEffect(() => {
    console.log(torusRef);
    const interval = setInterval(() => {
      idx = ++idx % descItems.length;
      setDesc(descItems[idx]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  useFrame(() => {
    const page1Scroll = scroll.range(0 / pages, 1 / pages);
    const page2Scroll = scroll.range(1 / pages, 2 / pages);
    torusRef.current.position.z = page1Scroll * -30 + page2Scroll * +40;
    torusRef.current.position.x = page1Scroll * 14 + page2Scroll * -10;
    torusRef.current.position.y = page2Scroll * 8;
    torusRef.current.rotation.y = -(
      (Math.PI / 10) * page1Scroll +
      (-Math.PI / 10) * page2Scroll
    );

    const v1 = scroll.visible(0 / pages, 1 / (pages * 10));
    if (htmlRef && htmlRef.current)
      htmlRef.current.classList.toggle("show", v1);

    // if (r1 >= 0.1 && !isHidden) {
    //   switchView();
    //   isHidden = true;
    // }
    const v2 = scroll.visible(1 / (pages * 1.25), 1 / pages);

    if (heroHtmlRef && heroHtmlRef.current)
      heroHtmlRef.current.classList.toggle("show", v2);

    const v3 = scroll.visible((2 / pages) * 1.3, 1);
    if (page3Ref && page3Ref.current) {
      page3Ref.current.classList.toggle("show", v3);
    }
  });

  return (
    <>
      <spotLight position={[0, 30, 40]} />
      <spotLight position={[-50, 30, 40]} />
      <TorusWordKnot ref={torusRef} />
      {/* <Environment files="photo_studio_01_1k.hdr" /> */}
      <Scroll
      // style={{ transform: " translate(-50%, -50px)" }}
      >
        <Html ref={htmlRef} className=" heroDivContainer data translate">
          <HeroDiv id="heroDiv">
            <Heading>Jan Hoppel</Heading>
            <Button primary onClick={() => switchView()}>
              Scroll to learn more
            </Button>
          </HeroDiv>
        </Html>
        <Html
          ref={heroHtmlRef}
          className="heroDivContainer data"
          position={[-0.125, -0.025, 0]}
        >
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
        </Html>
        <Html
          style={{ top: "200vh" }}
          className="heroDivContainer translate data"
          ref={page3Ref}
        >
          <Heading>OIDA</Heading>
        </Html>
      </Scroll>

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
