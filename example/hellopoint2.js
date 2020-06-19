var VSHADER_SOURCE=
'attribute vec4 a_Position;\n'+
' attribute float a_PointSize;\n'+
'void main() { \n'+
' gl_Position = a_Position;\n'+
' gl_PointSize = a_PointSize;\n'+
'}\n'
var FSHADER_SOURCE=
  'void main() {\n'+
  'gl_FragColor = vec4(1.0,1.0,0.0,1.0);\n'+
  '}\n'

function main(){
  var canvas = document.getElementById("webgl")
  var gl= getWebGLContext(canvas,true)
  if(!gl){
    return false
  }
  if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
    return 
  }
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
  if(a_Position<0){
    return
  }
  gl.vertexAttrib3f(a_Position,0.0,0.0,0.0)
  gl.vertexAttrib1f(a_PointSize,31.0)
  gl.clearColor(0.0,0.0,0.0,1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

gl.drawArrays(gl.POINTS,0,1)
}