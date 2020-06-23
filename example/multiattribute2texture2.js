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
'uniform sampler2D u_Sampler0;\n'+
'uniform sampler2D u_Sampler1;\n'+
'varying vec2 v_TextCoord;\n'+
'void main() {\n'+
' vec4 c0=texture2D(u_Sampler0, v_TextCoord);\n'+
' vec4 c1=texture2D(u_Sampler1, v_TextCoord);\n'+
'gl_FragColor = c0*c1;\n'+
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
  var texture0= gl.createTexture()
  var texture1=gl.createTexture()
  var u_Sampler0=gl.getUniformLocation(gl.program, 'u_Sampler0')
  var u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1')

  var image0 = new Image()
  var image1 = new Image()
  image0.onload= function(){
 
    loadTexture(gl, n, texture0, u_Sampler0, image0,0)
  }
  image0.src='./texture/a2ll1814.jpg' // 图片必须是2的N次方
  image1.onload= function(){
 
    loadTexture(gl, n, texture1, u_Sampler1, image1,1)
  }
  image1.src='./texture/ADSWD176.jpg' // 图片必须是2的N次方
  return true
}
var g_texUnit0=false, g_texUnit1=false
function loadTexture(gl,n,texture, u_Sampler, image,texUnit){

    // 对纹理图形进行y轴反转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    if(texUnit===0){
      gl.activeTexture(gl.TEXTURE0)
      g_texUnit0=true
    }else{
      gl.activeTexture(gl.TEXTURE1)
      g_texUnit1=true
    }
    // 向target绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // 配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    // 配置纹理对象
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    // 将0号纹理单元传递给取样器变量
    gl.uniform1i(u_Sampler, texUnit);
if(g_texUnit0&&g_texUnit1){
  gl.clearColor(0.0,0.0,0.0,1.0)
 gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}

}
