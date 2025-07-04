import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const App = () => {

  const gsapRef = useRef()  
  const container1Ref = useRef()  
  const container2Ref = useRef()  
  const box1Ref = useRef()  
  const box2Ref = useRef()  
  const circle1Ref = useRef()  
  const circle2Ref = useRef()  

  useGSAP(() => {
    gsap.to(gsapRef.current, {
      x: 1000,
      duration: 1,
      ease: "power2.inOut",
      delay:0.5
    })

    gsap.from(container1Ref.current, {
      // y: 10,
      duration: 3,
      ease: "power2.inOut",
      // delay:0.5,
      rotate: 90,
      // skewX: 90,
      // skewY: 90,
      transformOrigin: "bottom right",
      // opacity: 0,
      // scale: 0,
      borderRadius: 0,
    }, "man1")

    gsap.from(container2Ref.current, {
      // y: 10,
      duration: 3,
      ease: "power2.inOut",
      delay:1.5,
      rotate: 90,
      skewX: 90,
      skewY: 90,
      // transformOrigin: "bottom right",
      opacity: 0,
      scale: 0,
      borderRadius: 0,
    }, "man2")

    gsap.from(box1Ref.current, {
      y: 10,
      duration: 3,
      ease: "power2.inOut",
      delay:0.5,
      opacity: 0,
      rotate: 360,
      scale: 0
    }, "man1")

    gsap.from(circle1Ref.current, {
      x: -1000,
      y: 0,
      duration: 2.5,
      // ease: "circ.out",
      ease: "expo.out",
      delay:3.5,
      rotate: 360,
      scale: 0,
      opacity: 0,
    }, "man1")

  })

  return (
    <main>
      {/* <div ref={gsapRef} className="box"></div> */}

      <div ref={container1Ref} className="container">
        <div ref={circle1Ref} className="circle"></div>
        <div ref={box1Ref} className="box"></div>
      </div>
      <div ref={container2Ref} className="container">
        <div className="circle"></div>
        <div className="box"></div>
      </div>
    </main>
  )
}

export default App
