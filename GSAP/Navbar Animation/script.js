let menu = document.querySelector("#nav i")
let cross = document.querySelector(".links i")

const tl = gsap.timeline()

tl.to(".links", {
    right:0,
    duration:0.3,
})

tl.from(".links h4", {
    x:150,
    opacity:0,
    duration:0.5,
    stagger:0.25
})

tl.from(".links i", {
    opacity:0,
    duration:0.3
})

tl.pause() // pause timeline 

menu.addEventListener("click", () => {
    tl.play() // play timeline
})

cross.addEventListener("click", function() {
    tl.reverse() // reverse timeline
})



