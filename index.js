var canvas = document.getElementById("blur-canvas")
var rangeBar = document.getElementById('rangeBar')
var image = new Image()
image.src = "ford.jpg"
var tasks = []
var isBlurring = false

function blurImage(k_lim) {
  addOverlay()
  setTimeout(function(){
    isBlurring = true
    console.log("Started blurring")
    var k_size = 2*k_lim+1
    var w = image.width,h = image.height
    canvas.width = w
    canvas.height = h
    var ctx = canvas.getContext('2d')
    ctx.clearRect(0,0,w,h)
    ctx.drawImage(image,0,0)

    var imdata = ctx.getImageData(0,0,w,h)
    var data = imdata.data
    var pixel_index = 0
    var xs = [],ys=[]

    for(var i=0;i<data.length;i+=4) {
        var x = pixel_index%w
        var y = Math.floor(pixel_index/w)
        var sum_r = 0,sum_g = 0,sum_b = 0,sum_a = 0
        for(var x_l=x-k_lim;x_l<=x+k_lim;x_l++) {
            for(var y_l=y-k_lim;y_l<=y+k_lim;y_l++) {
                var x_i = -1,y_i = -1
                if(x_l>=0 && x_l<w) {
                    x_i = x_l
                }
                if(y_l>=0 && y_l<h) {
                    y_i = y_l
                }
                if(x_i !=-1 && y_i!=-1) {
                    var n = (y_i*w+x_i)*4
                    sum_r+=data[n]
                    sum_g+=data[n+1]
                    sum_b += data[n+2]
                    sum_a += data[n+3]
                }
            }
        }
        //xs.push([sum_r/9,sum_g/9,sum_b/9])
        data[i] = sum_r/(k_size*k_size)
        data[i+1] = sum_g/(k_size*k_size)
        data[i+2] = sum_b/(k_size*k_size)
        data[i+3] = sum_a/(k_size*k_size)
        pixel_index++
    }

    console.log(pixel_index)
    console.log(`${pixel_index} ${w}*${h}`)
    imdata.data = data
    console.log(imdata)
    ctx.putImageData(imdata,0,0)
    console.log("stopped blurring")
    isBlurring = false
    dismissOverlay()
  },100)

}
image.onload = ()=>{
    rangeBar = document.getElementById('rangeBar')
    rangeBar.max = Math.min(image.width,image.height)/10
    rangeBar.onchange = ()=>{
        console.log(rangeBar.value)
        console.log(typeof(rangeBar.value))
        if(!isBlurring) {
            blurImage(parseInt(rangeBar.value))
        }
    }

    blurImage(3)
}
