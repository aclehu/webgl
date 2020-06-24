var VSHADER_SOURCE=
//x'=xcosb-ysinb
//y'=xsinb-ycosb
//z'=z
'attribute vec4 a_Position;\n'+
'attribute vec4  a_Color;\n'+
'uniform mat4  u_MvpMatrix;\n'+

'varying vec4 v_Color;\n'+
'void main(){\n'+
' gl_Position = u_MvpMatrix*a_Position;\n'+
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
var nf =document.getElementById('nearfar')
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
var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix')


var mvpMatrix = new Matrix4()

mvpMatrix.setPerspective(30,1,1,100)
mvpMatrix.lookAt(3,3,7,0,0,0,0,1,0)
gl.uniformMatrix4fv(u_MvpMatrix,false,mvpMatrix.elements)

gl.clearColor(0,0,0,1)
gl.enable(gl.DEPTH_TEST)

gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
gl.drawElements(gl.TRIANGLES,n,gl.UNSIGNED_BYTE,0)

}
var g_near =0.0, g_far =0.5
function keydown(ev,gl,n,u_ProjMatrix,viewMatrix,nf ){
 switch (ev.keyCode) {
   case 39:
     g_near+=0.01
     break;
     case 37:
        g_near-=0.01
      break;
    case 40:
        g_far+=0.01
    break;
    case 38:
        g_far-=0.01
        break;
   default:
     break;
 }
  draw(gl,n,u_ProjMatrix,viewMatrix,nf)
}
function draw(gl,n,u_ProjMatrix,viewMatrix,nf){
  viewMatrix.setOrtho(-0.5,0.5,-0.5,0.5,g_near,g_far)
  gl.uniformMatrix4fv(u_ProjMatrix,false, viewMatrix.elements)
  gl.clearColor(0.0,0.0,0.0,1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  nf.innerHTML=`near:${Math.round(g_near*100)/100},far:${Math.round(g_far*100)/100}`
  gl.drawArrays(gl.TRIANGLES,0,n)
}
function initVertexBuffers(gl){
  //顶点坐标和颜色
  var vertices = new Float32Array([
    1.0,  1.0, 1.0, 1.0, 1.0,1.0,
    -1.0,1.0,1.0, 1.0, 1.0,1.0,
     -1.0, -1.0,  1.0,1.0, 0.0, 0.0,
     1.0,  -1.0,  1.0, 1.0,0.0, 0.0,
     1.0,-1.0,-1.0, 1.0, 1.0,1.0,
     1.0, 1.0,  -1.0,1.0, 0.0, 0.0,
     -1.0,  1.0,  -1.0, 1.0,0.0, 0.0,
     -1.0, -1.0,  -1.0,1.0, 1.0, 0.0,

]);
var indices =new Uint8Array([
  0,1,2,0,2,3,
  0,3,4,0,4,5,
  0,5,6,0,6,1,
  1,6,7,1,7,2,
  7,4,3,7,3,2,
  4,7,6,4,6,5
])
var n = 8;//点的个数
//创建缓冲区对象
var vertexBuffer = gl.createBuffer();
var indexBuffer =gl.createBuffer()

//将缓冲区对象绑定到目标
gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
//向缓冲区写入数据
gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

var FSIZE = vertices.BYTES_PER_ELEMENT;

//获取坐标点
var a_Position = gl.getAttribLocation(gl.program, "a_Position");
//将缓冲区对象分配给a_Position变量
gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE*6, 0);
//连接a_Position变量与分配给它的缓冲区对象
gl.enableVertexAttribArray(a_Position);

//获取Color坐标点
var a_Color = gl.getAttribLocation(gl.program, "a_Color");
//将缓冲区对象分配给a_Position变量
gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE*6, FSIZE*3);
//连接a_Position变量与分配给它的缓冲区对象
gl.enableVertexAttribArray(a_Color);

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)
return indices.length;
}