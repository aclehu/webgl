var VSHADER_SOURCE=
//x'=xcosb-ysinb
//y'=xsinb-ycosb
//z'=z
'attribute vec4 a_Position;\n'+
'uniform float u_CosB, u_SinB;\n'+
'void main(){\n'+
' gl_Position.x = a_Position.x*u_CosB - a_Position.y*u_SinB;\n'+
' gl_Position.y = a_Position.x*u_SinB - a_Position.y*u_CosB;\n'+
' gl_Position.z = a_Position.z;\n'+
' gl_Position.w = 1.0;\n'+
'}\n'

var FSHADER_SOURCE=
'void main() {\n'+
'gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n'+
'}\n'

function main(){
var canvas = document.getElementById('webgl')
var gl = canvas.getContext('webgl')
if(!gl){
  return false
}
// const fShader = gl.createShader(gl.FRAGMENT_SHADER)
// const vShader = gl.createShader(gl.VERTEX_SHADER)
// gl.shaderSource(vShader, VSHADER_SOURCE)
// gl.shaderSource(fShader,FSHADER_SOURCE)
// gl.compileShader(vShader)
// gl.compileShader(fShader)
// const program = gl.createProgram()
// gl.attachShader(program, vShader)
// gl.attachShader(program, fShader)
// gl.linkProgram(program)
// gl.useProgram(program)
if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){

}
var n = initVertexBuffers(gl)
if(n<0){
  return
}
gl.clearColor(0.0,0.0,0.0,1.0)
gl.clear(gl.COLOR_BUFFER_BIT)
var tangel=90
var radian=Math.PI*tangel/180.0
var cosB=Math.cos(radian)
var sinB=Math.sin(radian)
var u_CosB = gl.getUniformLocation(gl.program, 'u_CosB')
var u_SinB = gl.getUniformLocation(gl.program, 'u_SinB')
gl.uniform1f(u_CosB, cosB)
gl.uniform1f(u_SinB, sinB)
gl.drawArrays(gl.TRIANGLES,0,n)
function initVertexBuffers(gl){
  var vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);     //坐标点位置
  var n=3;
  var vertexBuffer = gl.createBuffer();
  if(!vertexBuffer){
    return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var a_Position = gl.getAttribLocation(gl.program,'a_Position');
  if(a_Position < 0){
    console.log('Failed to get the storage location of a_Position');
    return;
  }
  gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
  gl.enableVertexAttribArray(a_Position);
 
 

  return n
}
}

