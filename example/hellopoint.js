var VSHADER_SOURCE=
  'void main() {\n'+
  'gl_Position = vec4(0.5,0.5,0.0,1.0);\n'+
  'gl_PointSize = 100.0;\n'+
  '}\n';

  var FSHADER_SOURCE=
  'void main() {\n'+
  'gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n'+
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
  gl.clearColor(0.0,0.0,0.0,1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

gl.drawArrays(gl.POINTS,0,1)
}