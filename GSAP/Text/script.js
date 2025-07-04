function breakTheText() {
    let h1 = document.querySelector("h1")
    let h1Text = h1.textContent

    let splittedText = h1Text.split("")
    let halfLen = Math.floor(splittedText.length / 2)
    let clutter = ""

    splittedText.forEach((letter, idx) => {
        if(idx < halfLen) {
            clutter += `<span class="first">${letter}</span>`
        } else {
            clutter += `<span class="second">${letter}</span>`
        }
    })

    h1.innerHTML = clutter
}

breakTheText()

// gsap.from("h1 span", {
//     y:50,
//     duration:0.7,
//     opacity:0,
//     delay:0.5,
//     stagger:-0.15,
//     ease:"power3.out",
//     // delay:gsap.utils.random(0, 0.5),
//     // ease:"elastic.out(1,0.3)",
// })

gsap.from("h1 .first", {
    y:80,
    duration:0.6,
    delay:0.5,
    stagger:0.15,
    opacity:0,
})
gsap.from("h1 .second", {
    y:80,
    duration:0.6,
    delay:0.5,
    stagger:-0.15,
    opacity:0,
})