import { PresentationControls, Stage, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

function Model(props) {
  const { scene } = useGLTF("./bitcoin.glb");
  return <primitive object={scene} {...props} />;
}

const OurModel = () => {
  return (
    <div className="h-screen td-model">
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        // style={{ position: "absolute", top: "15%" }}
      >
        {/* <color attach="background" args={["#101010"]} /> */}
        <ambientLight intensity={-1} />

        <PresentationControls
          speed={1.5}
          global
          zoom={0.5}
          polar={[-0.1, Math.PI / 4]}
        >
          <Stage environment={null}>
            <Model scale={0.01} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  );
};

export default OurModel;
