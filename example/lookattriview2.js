var VSHADER_SOURCE=
//x'=xcosb-ysinb
//y'=xsinb-ycosb
//z'=z
'attribute vec4 a_Position;\n'+
'attribute vec4  a_Color;\n'+
'uniform mat4  u_ProjMatrix;\n'+
'uniform mat4  u_ViewMatrix;\n'+

'varying vec4 v_Color;\n'+
'void main(){\n'+
' gl_Position = u_ProjMatrix*u_ViewMatrix*a_Position;\n'+
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

var u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix')
var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix')

var viewMatrix = new Matrix4()
var projMatrix = new Matrix4()
viewMatrix.setLookAt(0,0,5,0,0,-100,0,1,0)
projMatrix.setPerspective(30,canvas.width/canvas.clientHeight,1,100)

gl.uniformMatrix4fv(u_ViewMatrix,false,viewMatrix.elements)
gl.uniformMatrix4fv(u_ProjMatrix,false,projMatrix.elements)
gl.clearColor(0,0,0,1)
gl.clear(gl.COLOR_BUFFER_BIT)
gl.drawArrays(gl.TRIANGLES,0,n)
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
    0.75,  1.0, -4.0, 0.4,1.0, 0.4,
   0.25, -1.0,-4.0, 0.4,1.0, 0.4,
    1.25, -1.0,  -4.0, 0.4,1.0, 0.4,

    0.75,1.0,-2.0, 1.0,0.4, 0.4,
    0.25,-1.0,-2.0, 1.0, 1.0, 0.4,
    1.25, -1.0,  -2.0, 1.0, 1.0, 0.4,

    0.75,1.0,0.0, 1.0,0.4, 0.4,
    0.25,-1.0,0.0, 1.0, 1.0, 0.4,
    1.25, -1.0,  0.0, 1.0, 1.0, 0.4,

    -0.75,  1.0, -4.0, 0.4,0.4, 1.0,
    -1.25, -1.0,  -4.0,  0.4,0.4, 1.0,
    -0.25, -1.0,-4.0, 1.0,0.4, 0.4,

    -0.75,  1.0, -2.0, 0.4,0.4, 1.0,
    -1.25, -1.0,  -2.0,  0.4,0.4, 1.0,
    -0.25, -1.0,-2.0, 1.0,0.4, 0.4,

    -0.75,  1.0, 0.0, 0.4,0.4, 1.0,
    -1.25, -1.0, 0.0,  0.4,0.4, 1.0,
    -0.25, -1.0,0.0, 1.0,0.4, 0.4,
]);
var n = 18;//点的个数
//创建缓冲区对象
var vertexBuffer = gl.createBuffer();

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
return n;
}