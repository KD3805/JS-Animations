// Locomotive Scroll
function locoInit() {
  // Initialize Locomotive Scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    smartphone: {
      smooth: true
    },
    tablet: {
      smooth: true
    }
  });

  // Update ScrollTrigger on scroll
  locoScroll.on("scroll", ScrollTrigger.update);

  // Tell ScrollTrigger to use these proxy methods for the "#main" element
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  // Each time the window updates, refresh ScrollTrigger and Locomotive Scroll 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // After everything is set up, refresh ScrollTrigger
  ScrollTrigger.refresh();
}

locoInit();


// page2

function splitToSpan(element) {
  let clutter = "";
  // splitting h1 into words and adding span to each word for animation
  element.textContent.split(" ").forEach(word => {
    clutter += `<span> ${word} </span>`;
  });
  element.innerHTML = clutter;
}
splitToSpan(document.querySelector("#page2 h1"));

// adding animation to each word
gsap.to("#page2 h1 span", {
  scrollTrigger: {
    trigger: "#page2 h1 span",
    start: "top bottom",
    end: "bottom top",
    scroller: "#main",
    scrub: 0.5,
  },
  stagger: 0.2,
  color: "white",
});



// page3 canvas

/**
 * Canvas Animation System
 * This function creates a scroll-based animation sequence using canvas
 * Example: If we have a 1920x1080 canvas and a 800x600 image:
 * - hRatio would be 1920/800 = 2.4
 * - vRatio would be 1080/600 = 1.8
 * - final ratio would be 2.4 to maintain full coverage
 */
function canvas() {
  // Initialize canvas and context
  const canvas = document.querySelector("#page3>canvas");
  const context = canvas.getContext("2d");

  // Set initial dimensions
  // Example: On a 1920x1080 screen, canvas will be 1920px × 1080px
  canvas.width = window.innerWidth;   // e.g., 1920px
  canvas.height = window.innerHeight; // e.g., 1080px

  // Responsive handling
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  /**
   * Frame sequence management
   * Example: frames00007.png → frames00202.png
   * Pattern: Increments by 3 (007, 010, 013, ...)
   */
  function files(index) {
    var data = `
    ./assets/images/frames00007.png
    ./assets/images/frames00010.png
    ./assets/images/frames00013.png
    ./assets/images/frames00016.png
    ./assets/images/frames00019.png
    ./assets/images/frames00022.png
    ./assets/images/frames00025.png
    ./assets/images/frames00028.png
    ./assets/images/frames00031.png
    ./assets/images/frames00034.png
    ./assets/images/frames00037.png
    ./assets/images/frames00040.png
    ./assets/images/frames00043.png
    ./assets/images/frames00046.png
    ./assets/images/frames00049.png
    ./assets/images/frames00052.png
    ./assets/images/frames00055.png
    ./assets/images/frames00058.png
    ./assets/images/frames00061.png
    ./assets/images/frames00064.png
    ./assets/images/frames00067.png
    ./assets/images/frames00070.png
    ./assets/images/frames00073.png
    ./assets/images/frames00076.png
    ./assets/images/frames00079.png
    ./assets/images/frames00082.png
    ./assets/images/frames00085.png
    ./assets/images/frames00088.png
    ./assets/images/frames00091.png
    ./assets/images/frames00094.png
    ./assets/images/frames00097.png
    ./assets/images/frames00100.png
    ./assets/images/frames00103.png
    ./assets/images/frames00106.png
    ./assets/images/frames00109.png
    ./assets/images/frames00112.png
    ./assets/images/frames00115.png
    ./assets/images/frames00118.png
    ./assets/images/frames00121.png
    ./assets/images/frames00124.png
    ./assets/images/frames00127.png
    ./assets/images/frames00130.png
    ./assets/images/frames00133.png
    ./assets/images/frames00136.png
    ./assets/images/frames00139.png
    ./assets/images/frames00142.png
    ./assets/images/frames00145.png
    ./assets/images/frames00148.png
    ./assets/images/frames00151.png
    ./assets/images/frames00154.png
    ./assets/images/frames00157.png
    ./assets/images/frames00160.png
    ./assets/images/frames00163.png
    ./assets/images/frames00166.png
    ./assets/images/frames00169.png
    ./assets/images/frames00172.png
    ./assets/images/frames00175.png
    ./assets/images/frames00178.png
    ./assets/images/frames00181.png
    ./assets/images/frames00184.png
    ./assets/images/frames00187.png
    ./assets/images/frames00190.png
    ./assets/images/frames00193.png
    ./assets/images/frames00196.png
    ./assets/images/frames00199.png
    ./assets/images/frames00202.png
    `;
    return data.split("\n")[index].trim();
  }

  /**
   * Animation Configuration
   * frameCount: 67 frames total
   * Time calculation example:
   * - At 30fps: 67 frames = 2.23 seconds of animation
   * - Scroll duration extends this using ScrollTrigger
   */
  const frameCount = 67;
  const images = [];
  const imageSeq = {
    frame: 1,
  };

  /**
   * Image Preloader
   * Loading progress example:
   * - Each image load: progress = (loadedImages / frameCount) * 100
   * - e.g., 30/67 ≈ 44.78% loaded
   */
  let loadedImages = 0;
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.onload = () => {
      loadedImages++;
      // Calculate loading progress
      const progress = (loadedImages / frameCount) * 100;
      if (loadedImages === frameCount) {
        render();
      }
    };
    img.src = files(i);
    images.push(img);
  }

  /**
   * GSAP Animation Configuration
   * Scroll Calculations:
   * - Total scroll distance = 250% of viewport height
   * - Example: On 1080px viewport, animation spans 2700px of scroll
   * - Scrub 0.5 means 500ms smoothing
   */
  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 0.5,
      trigger: "#page3",
      start: "top top",
      end: "250% top",
      scroller: "#main",
    },
    onUpdate: render,
  });

  /**
   * Render Function
   * Handles frame updates based on scroll position
   * Example: At 50% scroll progress with 67 frames
   * Current frame ≈ 33 (Math.round(67 * 0.5))
   */
  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  /**
   * Image Scaling and Centering Algorithm
   * 
   * Mathematical Formula Breakdown:
   * 1. Scaling Ratios:
   *    hRatio = canvasWidth / imageWidth
   *    vRatio = canvasHeight / imageHeight
   * 
   * 2. Centering Offsets:
   *    centerX = (canvasWidth - scaledImageWidth) / 2
   *    centerY = (canvasHeight - scaledImageHeight) / 2
   * 
   * Example Calculation:
   * Canvas: 1920x1080
   * Image: 800x600
   * 
   * hRatio = 1920/800 = 2.4
   * vRatio = 1080/600 = 1.8
   * ratio = Math.max(2.4, 1.8) = 2.4
   * 
   * Scaled image size: 800 * 2.4 = 1920px width
   *                    600 * 2.4 = 1440px height
   * 
   * Center offset X = (1920 - 1920) / 2 = 0px
   * Center offset Y = (1080 - 1440) / 2 = -180px
   */
  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;

    // Calculate scaling ratios
    var hRatio = canvas.width / img.width;   // Horizontal scale
    var vRatio = canvas.height / img.height; // Vertical scale
    var ratio = Math.max(hRatio, vRatio);    // Use larger ratio for full coverage

    // Calculate centering offsets
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;

    // Clear previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw scaled and centered image
    ctx.drawImage(
      img,
      0, 0,                  // Source position (top-left of image)
      img.width, img.height, // Source dimensions (original image size)
      centerShift_x, centerShift_y,       // Destination position (centered)
      img.width * ratio, img.height * ratio // Destination dimensions (scaled)
    );
  }

  /**
   * ScrollTrigger Pin Configuration
   * Pin Duration = (End - Start) * ViewportHeight
   * Example: 250% - 0% = 250% of viewport height
   * If viewport is 1080px: Pin duration = 2700px of scroll
   */
  ScrollTrigger.create({
    trigger: "#page3",
    pin: true,
    scroller: "#main",
    start: "top top",
    end: "250% top",
  });
}

// Initialize canvas system
canvas();


// page4

splitToSpan(document.querySelector("#page4 h1"));

// adding animation to each word
gsap.to("#page4 h1 span", {
  scrollTrigger: {
    trigger: "#page4 h1 span",
    start: "top bottom",
    end: "bottom top",
    scroller: "#main",
    scrub: 0.5,
  },
  stagger: 0.2,
  color: "white",
});



// page5 canvas
function canvas1() {
  const canvas = document.querySelector("#page5>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
./assets/images/bridges00004.png
./assets/images/bridges00007.png
./assets/images/bridges00010.png
./assets/images/bridges00013.png
./assets/images/bridges00016.png
./assets/images/bridges00019.png
./assets/images/bridges00022.png
./assets/images/bridges00025.png
./assets/images/bridges00028.png
./assets/images/bridges00031.png
./assets/images/bridges00034.png
./assets/images/bridges00037.png
./assets/images/bridges00040.png
./assets/images/bridges00043.png
./assets/images/bridges00046.png
./assets/images/bridges00049.png
./assets/images/bridges00052.png
./assets/images/bridges00055.png
./assets/images/bridges00058.png
./assets/images/bridges00061.png
./assets/images/bridges00064.png
./assets/images/bridges00067.png
./assets/images/bridges00070.png
./assets/images/bridges00073.png
./assets/images/bridges00076.png
./assets/images/bridges00079.png
./assets/images/bridges00082.png
./assets/images/bridges00085.png
./assets/images/bridges00088.png
./assets/images/bridges00091.png
./assets/images/bridges00094.png
./assets/images/bridges00097.png
./assets/images/bridges00100.png
./assets/images/bridges00103.png
./assets/images/bridges00106.png
./assets/images/bridges00109.png
./assets/images/bridges00112.png
./assets/images/bridges00115.png
./assets/images/bridges00118.png
./assets/images/bridges00121.png
./assets/images/bridges00124.png
./assets/images/bridges00127.png
./assets/images/bridges00130.png
./assets/images/bridges00133.png
./assets/images/bridges00136.png
./assets/images/bridges00139.png
./assets/images/bridges00142.png
./assets/images/bridges00145.png
./assets/images/bridges00148.png
./assets/images/bridges00151.png
./assets/images/bridges00154.png
./assets/images/bridges00157.png
./assets/images/bridges00160.png
./assets/images/bridges00163.png
./assets/images/bridges00166.png
./assets/images/bridges00169.png
./assets/images/bridges00172.png
./assets/images/bridges00175.png
./assets/images/bridges00178.png
./assets/images/bridges00181.png
./assets/images/bridges00184.png
./assets/images/bridges00187.png
./assets/images/bridges00190.png
./assets/images/bridges00193.png
./assets/images/bridges00196.png
./assets/images/bridges00199.png
./assets/images/bridges00202.png
`;
    return data.split("\n")[index];
  }

  const frameCount = 67;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page5`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page5",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas1()



// page6

splitToSpan(document.querySelector("#page6 h1"));

// adding animation to each word
gsap.to("#page6 h1 span", {
  scrollTrigger: {
    trigger: "#page6 h1 span",
    start: "top bottom",
    end: "bottom top",
    scroller: "#main",
    scrub: 0.5,
  },
  stagger: 0.2,
  color: "white",
});



// page7 canvas

function canvas2() {
  const canvas = document.querySelector("#page7>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `

https://thisismagma.com/assets/home/lore/seq/1.webp?2
https://thisismagma.com/assets/home/lore/seq/2.webp?2
https://thisismagma.com/assets/home/lore/seq/3.webp?2
https://thisismagma.com/assets/home/lore/seq/4.webp?2
https://thisismagma.com/assets/home/lore/seq/5.webp?2
https://thisismagma.com/assets/home/lore/seq/6.webp?2
https://thisismagma.com/assets/home/lore/seq/7.webp?2
https://thisismagma.com/assets/home/lore/seq/8.webp?2
https://thisismagma.com/assets/home/lore/seq/9.webp?2
https://thisismagma.com/assets/home/lore/seq/10.webp?2
https://thisismagma.com/assets/home/lore/seq/11.webp?2
https://thisismagma.com/assets/home/lore/seq/12.webp?2
https://thisismagma.com/assets/home/lore/seq/13.webp?2
https://thisismagma.com/assets/home/lore/seq/14.webp?2
https://thisismagma.com/assets/home/lore/seq/15.webp?2
https://thisismagma.com/assets/home/lore/seq/16.webp?2
https://thisismagma.com/assets/home/lore/seq/17.webp?2
https://thisismagma.com/assets/home/lore/seq/18.webp?2
https://thisismagma.com/assets/home/lore/seq/19.webp?2
https://thisismagma.com/assets/home/lore/seq/20.webp?2
https://thisismagma.com/assets/home/lore/seq/21.webp?2
https://thisismagma.com/assets/home/lore/seq/22.webp?2
https://thisismagma.com/assets/home/lore/seq/23.webp?2
https://thisismagma.com/assets/home/lore/seq/24.webp?2
https://thisismagma.com/assets/home/lore/seq/25.webp?2
https://thisismagma.com/assets/home/lore/seq/26.webp?2
https://thisismagma.com/assets/home/lore/seq/27.webp?2
https://thisismagma.com/assets/home/lore/seq/28.webp?2
https://thisismagma.com/assets/home/lore/seq/29.webp?2
https://thisismagma.com/assets/home/lore/seq/30.webp?2
https://thisismagma.com/assets/home/lore/seq/31.webp?2
https://thisismagma.com/assets/home/lore/seq/32.webp?2
https://thisismagma.com/assets/home/lore/seq/33.webp?2
https://thisismagma.com/assets/home/lore/seq/34.webp?2
https://thisismagma.com/assets/home/lore/seq/35.webp?2
https://thisismagma.com/assets/home/lore/seq/36.webp?2
https://thisismagma.com/assets/home/lore/seq/37.webp?2
https://thisismagma.com/assets/home/lore/seq/38.webp?2
https://thisismagma.com/assets/home/lore/seq/39.webp?2
https://thisismagma.com/assets/home/lore/seq/40.webp?2
https://thisismagma.com/assets/home/lore/seq/41.webp?2
https://thisismagma.com/assets/home/lore/seq/42.webp?2
https://thisismagma.com/assets/home/lore/seq/43.webp?2
https://thisismagma.com/assets/home/lore/seq/44.webp?2
https://thisismagma.com/assets/home/lore/seq/45.webp?2
https://thisismagma.com/assets/home/lore/seq/46.webp?2
https://thisismagma.com/assets/home/lore/seq/47.webp?2
https://thisismagma.com/assets/home/lore/seq/48.webp?2
https://thisismagma.com/assets/home/lore/seq/49.webp?2
https://thisismagma.com/assets/home/lore/seq/50.webp?2
https://thisismagma.com/assets/home/lore/seq/51.webp?2
https://thisismagma.com/assets/home/lore/seq/52.webp?2
https://thisismagma.com/assets/home/lore/seq/53.webp?2
https://thisismagma.com/assets/home/lore/seq/54.webp?2
https://thisismagma.com/assets/home/lore/seq/55.webp?2
https://thisismagma.com/assets/home/lore/seq/56.webp?2
https://thisismagma.com/assets/home/lore/seq/57.webp?2
https://thisismagma.com/assets/home/lore/seq/58.webp?2
https://thisismagma.com/assets/home/lore/seq/59.webp?2
https://thisismagma.com/assets/home/lore/seq/60.webp?2
https://thisismagma.com/assets/home/lore/seq/61.webp?2
https://thisismagma.com/assets/home/lore/seq/62.webp?2
https://thisismagma.com/assets/home/lore/seq/63.webp?2
https://thisismagma.com/assets/home/lore/seq/64.webp?2
https://thisismagma.com/assets/home/lore/seq/65.webp?2
https://thisismagma.com/assets/home/lore/seq/66.webp?2
https://thisismagma.com/assets/home/lore/seq/67.webp?2
https://thisismagma.com/assets/home/lore/seq/68.webp?2
https://thisismagma.com/assets/home/lore/seq/69.webp?2
https://thisismagma.com/assets/home/lore/seq/70.webp?2
https://thisismagma.com/assets/home/lore/seq/71.webp?2
https://thisismagma.com/assets/home/lore/seq/72.webp?2
https://thisismagma.com/assets/home/lore/seq/73.webp?2
https://thisismagma.com/assets/home/lore/seq/74.webp?2
https://thisismagma.com/assets/home/lore/seq/75.webp?2
https://thisismagma.com/assets/home/lore/seq/76.webp?2
https://thisismagma.com/assets/home/lore/seq/77.webp?2
https://thisismagma.com/assets/home/lore/seq/78.webp?2
https://thisismagma.com/assets/home/lore/seq/79.webp?2
https://thisismagma.com/assets/home/lore/seq/80.webp?2
https://thisismagma.com/assets/home/lore/seq/81.webp?2
https://thisismagma.com/assets/home/lore/seq/82.webp?2
https://thisismagma.com/assets/home/lore/seq/83.webp?2
https://thisismagma.com/assets/home/lore/seq/84.webp?2
https://thisismagma.com/assets/home/lore/seq/85.webp?2
https://thisismagma.com/assets/home/lore/seq/86.webp?2
https://thisismagma.com/assets/home/lore/seq/87.webp?2
https://thisismagma.com/assets/home/lore/seq/88.webp?2
https://thisismagma.com/assets/home/lore/seq/89.webp?2
https://thisismagma.com/assets/home/lore/seq/90.webp?2
https://thisismagma.com/assets/home/lore/seq/91.webp?2
https://thisismagma.com/assets/home/lore/seq/92.webp?2
https://thisismagma.com/assets/home/lore/seq/93.webp?2
https://thisismagma.com/assets/home/lore/seq/94.webp?2
https://thisismagma.com/assets/home/lore/seq/95.webp?2
https://thisismagma.com/assets/home/lore/seq/96.webp?2
https://thisismagma.com/assets/home/lore/seq/97.webp?2
https://thisismagma.com/assets/home/lore/seq/98.webp?2
https://thisismagma.com/assets/home/lore/seq/99.webp?2
https://thisismagma.com/assets/home/lore/seq/100.webp?2
https://thisismagma.com/assets/home/lore/seq/101.webp?2
https://thisismagma.com/assets/home/lore/seq/102.webp?2
https://thisismagma.com/assets/home/lore/seq/103.webp?2
https://thisismagma.com/assets/home/lore/seq/104.webp?2
https://thisismagma.com/assets/home/lore/seq/105.webp?2
https://thisismagma.com/assets/home/lore/seq/106.webp?2
https://thisismagma.com/assets/home/lore/seq/107.webp?2
https://thisismagma.com/assets/home/lore/seq/108.webp?2
https://thisismagma.com/assets/home/lore/seq/109.webp?2
https://thisismagma.com/assets/home/lore/seq/110.webp?2
https://thisismagma.com/assets/home/lore/seq/111.webp?2
https://thisismagma.com/assets/home/lore/seq/112.webp?2
https://thisismagma.com/assets/home/lore/seq/113.webp?2
https://thisismagma.com/assets/home/lore/seq/114.webp?2
https://thisismagma.com/assets/home/lore/seq/115.webp?2
https://thisismagma.com/assets/home/lore/seq/116.webp?2
https://thisismagma.com/assets/home/lore/seq/117.webp?2
https://thisismagma.com/assets/home/lore/seq/118.webp?2
https://thisismagma.com/assets/home/lore/seq/119.webp?2
https://thisismagma.com/assets/home/lore/seq/120.webp?2
https://thisismagma.com/assets/home/lore/seq/121.webp?2
https://thisismagma.com/assets/home/lore/seq/122.webp?2
https://thisismagma.com/assets/home/lore/seq/123.webp?2
https://thisismagma.com/assets/home/lore/seq/124.webp?2
https://thisismagma.com/assets/home/lore/seq/125.webp?2
https://thisismagma.com/assets/home/lore/seq/126.webp?2
https://thisismagma.com/assets/home/lore/seq/127.webp?2
https://thisismagma.com/assets/home/lore/seq/128.webp?2
https://thisismagma.com/assets/home/lore/seq/129.webp?2
https://thisismagma.com/assets/home/lore/seq/130.webp?2
https://thisismagma.com/assets/home/lore/seq/131.webp?2
https://thisismagma.com/assets/home/lore/seq/132.webp?2
https://thisismagma.com/assets/home/lore/seq/133.webp?2
https://thisismagma.com/assets/home/lore/seq/134.webp?2
https://thisismagma.com/assets/home/lore/seq/135.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2

`;
    return data.split("\n")[index];
  }

  const frameCount = 136;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page7`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page7",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas2()

gsap.to(".page7-cir", {
  scrollTrigger: {
    trigger: `.page7-cir`,
    start: `top center`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5,
    reverse: true
  },
  scale: 1.5
})

gsap.to(".page7-cir-inner", {
  scrollTrigger: {
    trigger: `.page7-cir-inner`,
    start: `top center`,
    end: `bottom top`,
    scroller: `#main`,
    scrub: .5,
    reverse: true
  },
  backgroundColor: `#0a3bce91`,
})



// page8 video
const tl = gsap.timeline()

tl.from("#page8>video", {
  scrollTrigger: {
    trigger: `#page8`,
    start:"top 0%",
    end:"top -100%",  
    scroller: `#main`,
    scrub: .5,
    reverse: true,
    pin: true,
    markers: true,
  },
  opacity: 0,
  scale: 1.5,
})

