import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'

const Fly = () => {
    
    const randX = gsap.utils.random(-500, 500, 50) // Smoother x movement with smaller steps
    const randY = gsap.utils.random(-300, 300, 25) // Increased y range with moderate steps
    const randRot = gsap.utils.random(-720, 720, 45) // More rotation range for dynamic spins

    const [xValue, setXValue] = useState(0);
    const [yValue, setYValue] = useState(0);
    const [rot, setRot] = useState(0);

    const imageRef = useRef();

    useGSAP(() => {
        gsap.to(imageRef.current, {
            x: xValue,
            y: yValue,
            rotate: rot,
            duration: 0.6,
            ease: "power2.inOut",
        })
    }, { scope: "main", dependencies: [xValue, yValue, randRot] })

    return (
        <main>
            <img 
                onClick={() => {
                    setXValue(randX)
                    setYValue(randY)
                    setRot(randRot)
                }}
                src="https://images.vexels.com/media/users/3/242241/isolated/preview/409d95bf597e130c6c1b1d2ac3f5dbf5-side-fly-geometric-color-stroke.png" 
                ref={imageRef} 
                height={100}
                width={100}
                alt="" 
            />
        </main>
    )
}

export default Fly
