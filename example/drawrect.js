function main(){
  let canvas = document.getElementById('example');
  if(!canvas){
    return false;
  }
  let ctx=canvas.getContext('2d');
  ctx.fillStyle='rgba(255,0,0,0.5)';
  ctx.fillRect(120,10,150,150);
}