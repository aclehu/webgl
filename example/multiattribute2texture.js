var VSHADER_SOURCE=
//x'=xcosb-ysinb
//y'=xsinb-ycosb
//z'=z
'attribute vec4 a_Position;\n'+
'attribute vec2  a_TextCoord;\n'+
'varying vec2  v_TextCoord;\n'+
'void main(){\n'+
' gl_Position = a_Position;\n'+
' v_TextCoord = a_TextCoord;\n'+
'}\n'

var FSHADER_SOURCE=
'precision mediump float;\n'+
'uniform sampler2D u_Sampler;\n'+
'varying vec2 v_TextCoord;\n'+
'void main() {\n'+
'gl_FragColor = texture2D(u_Sampler, v_TextCoord);\n'+
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

initTextures(gl,n)
// gl.clearColor(0.0,0.0,0.0,1.0)
// gl.clear(gl.COLOR_BUFFER_BIT)
// gl.drawArrays(gl.TRIANGLES,0,n) //TRIANGLES
}

function initVertexBuffers(gl){
  //顶点坐标和颜色
  var vertices = new Float32Array([
    -0.5,  0.5,   0.0, 1.0,
    -0.5, -0.5,   0.0, 0.0,
    0.5,  0.5,   1.0, 1.0,
    0.5, -0.5,   1.0, 0.0
]);
var n = 4;//点的个数
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
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*4, 0);
//连接a_Position变量与分配给它的缓冲区对象
gl.enableVertexAttribArray(a_Position);

//获取Color坐标点
var a_TextCoord = gl.getAttribLocation(gl.program, "a_TextCoord");
//将缓冲区对象分配给a_Position变量
gl.vertexAttribPointer(a_TextCoord, 2, gl.FLOAT, false, FSIZE*4, FSIZE*2);
//连接a_Position变量与分配给它的缓冲区对象
gl.enableVertexAttribArray(a_TextCoord);
return n;
}
function initTextures(gl,n){
  var texture = gl.createTexture()
  var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler')
  var image = new Image()
  image.onload= function(){
 
    loadTexture(gl, n, texture, u_Sampler, image)
  }
  image.src='./texture/ADSWD176.jpg' // 图片必须是2的N次方
  return true
}
function loadTexture(gl,n,texture, u_Sampler, image){

    // 对纹理图形进行y轴反转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    // 开启0号纹理单元
    gl.activeTexture(gl.TEXTURE0);

    // 向target绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // 配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    // 配置纹理对象
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    // 将0号纹理单元传递给取样器变量
    gl.uniform1i(u_Sampler, 0);

  gl.clearColor(0.0,0.0,0.0,1.0)
 gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}
