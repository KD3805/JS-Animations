let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x
    mouse.y = e.y
})

// Reset mouse position when mouse leaves canvas
window.addEventListener('mouseout', () => {
    mouse.x = undefined
    mouse.y = undefined
})

class Circle {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.radius = radius
        this.minRadius = radius // Store original radius
        this.maxRadius = radius * 3 // Max radius when near mouse
        this.color = color
        this.originalColor = color // Store original color

        this.draw = function () {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            ctx.fillStyle = this.color
            ctx.fill()
            ctx.closePath()
        }

        this.update = function () {
            // Bounce off walls
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.dx = -this.dx
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.dy = -this.dy
            }
            this.x += this.dx
            this.y += this.dy

            // Mouse interactivity
            // Check if circle is within 50px of mouse
            if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
                && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                
                // Increase radius up to maxRadius
                if (this.radius < this.maxRadius) {
                    this.radius += 1
                }
                
                // Change color to a glowing effect
                const hue = (Date.now() / 20) % 360
                this.color = `hsla(${hue}, 100%, 50%, 0.8)`
                
            } else {
                // Return to original radius and color when away from mouse
                if (this.radius > this.minRadius) {
                    this.radius -= 1
                }
                this.color = this.originalColor
            }

            this.draw()
        }
    }
}

let circleArray = []

for (let i = 0; i < 500; i++) {
    let radius = Math.random() * 20 + 10
    let x = Math.random() * (canvas.width - radius * 2) + radius
    let y = Math.random() * (canvas.height - radius * 2) + radius
    let dx = (Math.random() - 0.5) * 2
    let dy = (Math.random() - 0.5) * 2

    let r = Math.random() * 255
    let g = Math.random() * 255
    let b = Math.random() * 255
    let opacity = Math.random() * 0.2 + 0.2
    let color = `rgba(${r}, ${g}, ${b}, ${opacity})`
    
    circleArray.push(new Circle(x, y, dx, dy, radius, color))
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }
}
animate()
