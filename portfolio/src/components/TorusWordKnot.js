import {
  extend,
  useFrame,
  useThree,
  useLoader,
  createPortal,
} from "@react-three/fiber";
import {
  shaderMaterial,
  TorusKnot,
  Text as R3Text,
  PerspectiveCamera,
  Box,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";
import { useRef, useEffect, useMemo, forwardRef } from "react";
import glsl from "babel-plugin-glsl/macro";

import * as THREE from "three";

const TorusShaderMaterial = shaderMaterial(
  {
    uTime: 1,
    uTexture: new THREE.Texture(),
  },
  glsl`
 varying vec2 vUv;
  varying vec3 vPos;
  uniform float uTime;
  void main() {
    vUv = uv;
    vPos = position;
    // vPos.x = vPos.x + sin(uTime + vPos.y);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPos, 1.);
  }`,
  glsl`
  varying vec2 vUv;
  varying vec3 vPos;

  uniform sampler2D uTexture;
  uniform float uTime;

  void main() {
    float time = uTime * 0.25;
    vec2 repeat = -vec2(12., 3.);
    // To repeat the uvs we need to multiply them by a scalar
    // and then get the fractional part of it so they from 0 to 1
    // To move them continuously we have to add time
    // to the x or y component, to change the direction
    vec2 uv = fract(vUv * repeat - vec2(time, 0.)); // The sign of time change direction of movement

    // Fake shadow
    float shadow = clamp(vPos.z / 5., 0., 1.);
    // shadow = 0.5;

    vec3 texture = texture2D(uTexture, uv).rgb;
    // texture *= vec3(uv.x, uv.y, 1.); // To help visualize the repeated uvs

    gl_FragColor = vec4(texture * shadow, 1.);
  }
`
);

extend({ TorusShaderMaterial });

function SpinningThing() {
  const mesh = useRef();
  useFrame(() => {
    if (mesh && mesh.current)
      mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += 0.01;
  });
  return (
    <R3Text
      color="#000000"
      // maxWidth={60}
      lineHeight={1}
      letterSpacing={0}
      textAlign="left"
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      // anchorX="center"
      // anchorY="middle"
      // position={[-0.965, -0.525, 0]}
      // rotation={[Math.PI, 0, 0]}
      scale={[0.2, 0.9, 1]}
      fontSize={3}
    >
      Developer
    </R3Text>
  );
}
const TorusWordKnot = forwardRef((props, ref) => {
  const state = useThree();
  const shaderRef = useRef();
  const groupRef = useRef();
  const textRef = useRef();
  const cam = useRef();
  const [scene, target] = useMemo(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ffffff");
    const target = new THREE.WebGLMultisampleRenderTarget(1024, 1024, {
      format: THREE.RGBAFormat,
      stencilBuffer: false,
    });
    target.samples = 8;
    return [scene, target];
  }, []);

  useFrame(({ clock, gl }) => {
    if (shaderRef && shaderRef.current)
      shaderRef.current.uTime = clock.getElapsedTime();
    // cam.current.position.z = 5 + Math.sin(clock.getElapsedTime() * 1.5) * 2;

    gl.setRenderTarget(target);

    gl.render(scene, cam.current);
    gl.setRenderTarget(null);
  });

  return (
    <>
      <PerspectiveCamera ref={cam} position={[0, 0, 3]} />
      {createPortal(<SpinningThing />, scene)}
      <TorusKnot args={[9, 3, 768, 3, 2, 10]} ref={ref}>
        {/* <meshStandardMaterial attach="material" map={target.texture} /> */}
        <torusShaderMaterial
          attach="material"
          uTexture={target.texture}
          ref={shaderRef}
        />
      </TorusKnot>

      {/* <OrbitControls /> */}
    </>
  );
});

export default TorusWordKnot;
