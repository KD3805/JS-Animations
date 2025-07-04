// gsap.to("#box1", {
//     x:1000,
//     duration:2,
//     delay:1
// })

gsap.to("#box1", {
    x:1200,
    duration:2,
    delay:1,
    backgroundColor:"blue",
    borderRadius:"50%",
    rotate:360,
    scale:0.5,
    repeat:-1, // infinite
    yoyo:true // vice-verca
})

gsap.from("#box2", {
    x:1000,
    y:1000,
    duration:2,
    delay:1,
    rotate:360,
})

// gsap.from("h1", {
//     opacity:0,
//     y:30,
//     duration:1,
//     delay:1,
//     stagger:0.5 // stagger: to perform animation step by step on each element     
// })




// timeline: synchronous concept

// const tl = gsap.timeline();

// tl.from("h2", {
//     y:-20,
//     duration:0.5,
//     delay:0.5,
//     opacity:0
// })

// tl.from("h4", {
//     y:-20,
//     duration:0.5,
//     delay:0.5,
//     opacity:0,
//     stagger:0.1
// })

// tl.from("h1", {
//     y:20,
//     opacity:0,
//     scale:0.2,
//     duration:0.5,
//     // rotate:360
// })




// Scroll Trigger

gsap.from("#page1 #page-box", {
    scale:0,
    delay:0.2,
    duration:2,
    rotate:360
})

// gsap.from("#page2 #page-box", {
//     scale:0,
//     opacity:0,
//     delay:0.2,
//     duration:1,
//     rotate:720,
//     scrollTrigger: {
//         trigger:"#page2 #page-box",
//         scroller: "body",
//         // markers:true,
//         start:"top 60%",
//         end:"top 30%",
//         scrub:2
//     }
// })

// gsap.from("#page2 h1", {
//     x:500,
//     duration:2,
//     opacity:0,
//     scrollTrigger: {
//         trigger:"#page2 h1",
//         scroller: "body",
//         // markers:true,
//         start:"top 50%",
//     }
// })

gsap.to("#page2 .exp", {
    transform: "translateX(-50%)",
    scrollTrigger: {
        trigger: "#page2",
        markers:true,
        scroller:"body", 
        start:"top 0%",
        end:"top -100%",
        scrub:2,
        pin:true
    }
})

// gsap.from("#page2 h2", {
//     x:-500,
//     duration:2,
//     opacity:0,
//     scrollTrigger: {
//         trigger:"#page2 h2",
//         scroller: "body",
//         // markers:true,
//         start:"top 50%",
//     }
// })