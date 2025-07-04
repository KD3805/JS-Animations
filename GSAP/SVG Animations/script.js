let initPath = `M 10 100 Q 500 100 990 100`
let currPath = `M 10 100 Q 250 100 490 100`

let string = document.querySelector("#string")

string.addEventListener("mousemove", (dets) => {
    currPath = `M 10 100 Q ${dets.x} ${dets.y} 990 100`

    gsap.to("svg path", {
        attr: { d: currPath },
        duration:0.3,
        ease:"power3.out"
    })
})

string.addEventListener("mouseleave", () => {
    gsap.to("svg path", {
        attr: { d: initPath },
        duration: 1.5,
        ease: "elastic.out(1,0.2)"
    })
})