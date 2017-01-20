var overlayDiv = document.createElement('div')
overlayDiv.style.width = window.innerWidth
overlayDiv.style.height = window.innerHeight
overlayDiv.style.background = 'black'
overlayDiv.style.position = "absolute"
overlayDiv.style.left = 0
overlayDiv.style.top = 0
overlayDiv.style.opacity = 0.7
function addOverlay() {
    document.body.appendChild(overlayDiv)
}
function dismissOverlay() {
    document.body.removeChild(overlayDiv)
}
