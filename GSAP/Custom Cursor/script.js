let main = document.querySelector("#main")
let cursor = document.querySelector("#cursor")
let imageDiv = document.querySelector("#image")

main.addEventListener("mousemove", (dets) => {
    gsap.to(cursor, {
        x:dets.x,
        y:dets.y,
        duration:0.3,
        ease:"power3.out",
    })
})

imageDiv.addEventListener("mouseenter", () => {
    cursor.innerHTML = "View More"
    gsap.to(cursor, {
        scale: 3,
        duration:0.2
    })
})

imageDiv.addEventListener("mouseleave", () => {
    cursor.innerHTML = ""
    gsap.to(cursor, {
        scale: 1,
        duration:0.2
    })
})