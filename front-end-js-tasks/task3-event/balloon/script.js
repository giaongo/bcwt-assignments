"use strict"
const balloon = document.querySelector("#balloon")
const MAX_BALLOON_SIZE = 400
const MIN_BALLOON_SIZE = 30
let currentSize = MIN_BALLOON_SIZE
balloon.style.fontSize = currentSize + "px"
balloon.style.margin = 0

const isBalloonAtMaxLimit = (size) => size >= MAX_BALLOON_SIZE
const handleKeyListener = (event)  => {
    event.preventDefault()
    if (isBalloonAtMaxLimit(currentSize)) {
        balloon.innerText = "💥"
        window.removeEventListener("keydown",handleKeyListener)
    } else {
        if (event.key === "ArrowUp") {
            currentSize *= 1.1 
        } else if(event.key === "ArrowDown") {
            currentSize *= 0.9
        }
       balloon.style.fontSize = currentSize + "px"
    }

}

window.addEventListener("keydown",(event) => handleKeyListener(event))
