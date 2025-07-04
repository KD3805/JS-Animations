function page1Animation() {
    const tl = gsap.timeline();

    tl.from("nav h1, nav h4, nav button", {
        y: -30,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        stagger: 0.15,
    }, "nav anim")
    tl.from("nav h1 i", {
        x: -30,
        y: -30,
        opacity: 0,
        duration:1.5,
        delay: 0.6,
        ease: "bounce.out",
    }, "nav anim")

    tl.from(".center-part1 h1, .center-part1 p", {
        x: -150,
        duration: 0.7,
        opacity: 0,
        stagger: 0.15,
    })
    tl.from(".center-part1 button", {
        duration: 0.4,
        opacity: 0,
    })
    tl.from(".center-part2 img", {
        duration: 0.4,
        opacity: 0,
    }, "-=0.5") // for delay in timeline

    tl.from(".section1-bottom img", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        y: 30,
        scrollTrigger: {
            trigger: ".center",
            // markers: true,
            scroller: "body",
            start: "top 10%",
            end: "top 0%",
            scrub: 2,
            // pin:true
        }
    })
}

function page2Animation() {
    const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".section2",
            scroller: "body",
            start: "top 50%",
            // end: "top -50%",
            // markers: true,
            scrub: 2,
            // pin: true
        }
    });
    
    tl2.from(".services", {
        y: 30,
        opacity: 0,
        duration: 0.5,
    })
    
    // line 1
    
    tl2.from(".elem.line1.left", {
        x: -300,
        opacity: 0,
        duration: 1,
    }, "anime1") // pass random text to start line elements at same time 
    tl2.from(".elem.line1.right", {
        x: 300,
        opacity: 0,
        duration: 1,
    }, "anime1") // pass random text to start line elements at same time
    
    // line 2
    
    tl2.from(".elem.line2.left", {
        x: -300,
        opacity: 0,
        duration: 1,
    }, "anime2")
    tl2.from(".elem.line2.right", {
        x: 300,
        opacity: 0,
        duration: 1,
    }, "anime2")
    
    // line 3
    
    tl2.from(".elem.line3.left", {
        x: -300,
        opacity: 0,
        duration: 1,
    }, "anime3")
    tl2.from(".elem.line3.right", {
        x: 300,
        opacity: 0,
        duration: 1,
    }, "anime3")
    
    // line 4

    tl2.from(".elem.line4.left", {
        x: -300,
        opacity: 0,
        duration: 1,
    }, "anime4")
    tl2.from(".elem.line4.right", {
        x: 300,
        opacity: 0,
        duration: 1,
    }, "anime4")
}

page1Animation()

page2Animation()