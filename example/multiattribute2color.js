var VSHADER_SOURCE=
//x'=xcosb-ysinb
//y'=xsinb-ycosb
//z'=z
'attribute vec4 a_Position;\n'+
'attribute vec4 a_Color;\n'+
'attribute float a_PointSize;\n'+
'varying vec4 v_Color;\n'+
'void main(){\n'+
' gl_Position = a_Position;\n'+
' gl_PointSize = a_PointSize;\n'+
' v_Color = a_Color;\n'+
'}\n'

var FSHADER_SOURCE=
'precision mediump float;\n'+
'varying vec4 v_Color;\n'+
'void main() {\n'+
'gl_FragColor = v_Color;\n'+
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
gl.drawArrays(gl.POINTS,0,n)
}

function initVertexBuffers(gl){
  var vertices = new Float32Array([0.0, 0.5,10.0, 1.0,0.0,0.0,-0.5, -0.5,20.0,0.0,1.0,0.0, 0.5, -0.5,30.0,0.0,0.0,1.0,]);     //坐标点位置
  var n=3;
  var vertexBuffer = gl.createBuffer();
  if(!vertexBuffer){
    return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var FSIZE = vertices.BYTES_PER_ELEMENT
  var a_Position = gl.getAttribLocation(gl.program,'a_Position');
  if(a_Position < 0){
    console.log('Failed to get the storage location of a_Position');
    return;
  }
  gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*6,0);
  gl.enableVertexAttribArray(a_Position);
  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
  gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT, false,FSIZE*6, FSIZE *2)
  gl.enableVertexAttribArray(a_PointSize)
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color')
  gl.vertexAttribPointer(a_Color,3,gl.FLOAT, false,FSIZE*6, FSIZE *3)
  gl.enableVertexAttribArray(a_Color)
  return n
}
function draw(gl, n, cur, mat, u_xformMatrix){
  mat.setRotate(cur,0,0,1)
  mat.translate(0.35,0,0)
  gl.uniformMatrix4fv(u_xformMatrix,false, mat.elements)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES,0,n)
}
var g_last=Date.now()
var ANGLE_STEP=45.0
function animate(ang){
  var now=Date.now()
  var ela = now-g_last
  g_last=now
  var na=ang+(ANGLE_STEP * ela) /1000.0
  console.log(na%=360)
  return na %=360
}