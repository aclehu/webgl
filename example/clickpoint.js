var VSHADER_SOURCE=
'attribute vec4 a_Position;\n'+
'void main(){\n'+
' gl_Position = a_Position;\n'+
' gl_PointSize = 10.0;\n'+
'}\n'

var FSHADER_SOURCE=
'void main() {\n'+
'gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n'+
'}\n'

function main(){
var canvas = document.getElementById('webgl')
var gl = getWebGLContext(canvas)
if(!gl){
  return false
}
if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
  return 
}
var a_Position = gl.getAttribLocation(gl.program,'a_Position')
canvas.onmousedown=function(ev){
  click(ev,gl,canvas,a_Position)
}
var g_points=[]
function click(ev,gl,canvas,a_Position){
  var x = ev.clientX
  var y = ev.clientY
  var rect = ev.target.getBoundingClientRect()
  x = ((x-rect.left)-canvas.height/2)/(canvas.height/2)
  y = (canvas.width/2-(y-rect.top))/(canvas.width/2)
  g_points.push(x)
  g_points.push(y)
  gl.clear(gl.COLOR_BUFFER_BIT)
  var len= g_points.length
  for(let i =0;i<len;i+=2){
    gl.vertexAttrib3f(a_Position,g_points[i],g_points[i+1],0.0)
    gl.drawArrays(gl.POINTS,0,1)
  }
}
gl.clearColor(0.0,0.0,0.0,1.0)
gl.clear(gl.COLOR_BUFFER_BIT)
}
