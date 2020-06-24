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

var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix')


var mvpMatrix = new Matrix4()

mvpMatrix.setPerspective(30,1,1,100)
mvpMatrix.lookAt(3,3,7,0,0,0,0,1,0)
gl.uniformMatrix4fv(u_MvpMatrix,false,mvpMatrix.elements)

gl.clearColor(0,0,0,1)
gl.enable(gl.DEPTH_TEST)
colorCube()
gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
var n = initVertexBuffers(gl)

gl.drawArrays(gl.TRIANGLES,0,36)

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
function colorCube()
{
    quad( 1, 0, 3, 2 );//第一个面
    quad( 2, 3, 7, 6 );//第二个面
    quad( 3, 0, 4, 7 );//第三个面
    quad( 6, 5, 1, 2 );//第四个面
    quad( 4, 5, 6, 7 );//第五个面
    quad( 5, 4, 0, 1 );//第六个面
}
var points = [];//顶点容器
var colors = [];//颜色容器
function quad(a,b,c,d){
  var vertices=[
    vec4(-1.0,-1.0,1.0,1.0),
    vec4(-1.0,1.0,1.0,1.0),
    vec4(1.0,1.0,1.0,1.0),
    vec4(1.0,-1.0,1.0,1.0),
    vec4(-1.0,-1.0,-1.0,1.0),
    vec4(-1.0,1.0,-1.0,1.0),
    vec4(1.0,1.0,-1.0,1.0),
    vec4(1.0,-1.0,-1.0,1.0),

  ]
  var cubeColors=[
    [ 0.0, 0.0, 0.0, 1.0 ],  // 黑
    [ 1.0, 0.0, 0.0, 1.0 ],  // 红
    [ 1.0, 1.0, 0.0, 1.0 ],  // 黄
    [ 0.0, 1.0, 0.0, 1.0 ],  // 绿
    [ 0.0, 0.0, 1.0, 1.0 ],  // 蓝
    [ 1.0, 0.0, 1.0, 1.0 ],  // 品红
    [ 0.0, 1.0, 1.0, 1.0 ],  // 青色
    [ 1.0, 1.0, 1.0, 1.0 ]  //白色

  ]
  var indices = [ a, b, c, a, c, d ];//顶点索引顺序
    //存取顶点余顶点索引信息算法
  for ( var i = 0; i < indices.length; ++i ) {
      points.push( vertices[indices[i]] );
      //quad(1,0,3,2)按照indice的索引，另points.push(vertices[1],vertices[0],
      // vertices[3],vertices[1],vertices[3],vertices[2]);
      //再执行quad()......,直到六个quad()全执行完
      colors.push(cubeColors[a]);
  }
}
function initVertexBuffers(gl){
  
var n = 8;//点的个数
//创建缓冲区对象
var vertexBuffer = gl.createBuffer();
var indexBuffer =gl.createBuffer()
var cBuffer = gl.createBuffer()

gl.bindBuffer(gl.ARRAY_BUFFER,cBuffer);
//向缓冲区写入数据
gl.bufferData(gl.ARRAY_BUFFER,flatten(colors),gl.STATIC_DRAW);
//将缓冲区对象绑定到目标
gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
//向缓冲区写入数据
gl.bufferData(gl.ARRAY_BUFFER,flatten(points),gl.STATIC_DRAW);

var FSIZE = vertices.BYTES_PER_ELEMENT;

//获取坐标点
var a_Position = gl.getAttribLocation(gl.program, "a_Position");
//将缓冲区对象分配给a_Position变量
gl.vertexAttribPointer(a_Position, 4, gl.FLOAT, false, 0, 0);
//连接a_Position变量与分配给它的缓冲区对象
gl.enableVertexAttribArray(a_Position);

//获取Color坐标点
var a_Color = gl.getAttribLocation(gl.program, "a_Color");
//将缓冲区对象分配给a_Position变量
gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false,0,0);
//连接a_Position变量与分配给它的缓冲区对象
gl.enableVertexAttribArray(a_Color);

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)
return indices.length;
}