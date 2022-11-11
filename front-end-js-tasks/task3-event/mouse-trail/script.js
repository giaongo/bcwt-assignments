let trailData = []
let mouse = {
    x:0,
    y:0
}

const createTrail = () => {
    for(let i = 0; i < 10; i++) {
        const trail = document.createElement("div")
        trail.className = "trail"
        trailData.push(trail)
    }
}
window.addEventListener("mousemove",event  => {
    mouse.x =  event.pageX 
    mouse.y  = event.pageY
})

// Function to move trail
const moveTrail = () => {
    let x = mouse.x
    let y = mouse.y
    for(let i = 0; i < trailData.length;i++) {
        const currentTrail = trailData[i]
        const nextTrail = trailData[i+1] || trailData[0]
        currentTrail.style.left = x + "px"
        currentTrail.style.top = y + "px"
        document.body.appendChild(currentTrail)
        x += (nextTrail.offsetLeft - currentTrail.offsetLeft) *0.8
        y += (nextTrail.offsetTop - currentTrail.offsetTop)*0.8
    }
}

// Function to activate screen repaint
const animate = () => {
    moveTrail()
    requestAnimationFrame(animate)
}
createTrail()
animate()