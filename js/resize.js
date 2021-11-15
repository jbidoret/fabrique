
// Permet au poster de rester dans un ratio “A3” 
var atrois = {
  w : 3508 / 3,
  h : 4961 / 3,
  getRatio : function(){ return this.w / this.h }
};

function resize(poster){
  
  var padding = 100;
  var ww = window.innerWidth - padding, 
      wh = window.innerHeight - padding,
      ratio = ww/wh, 
      scale = 1;
  if(ratio > atrois.getRatio()){
      scale = wh / atrois.h;
  } else {
      scale = ww / atrois.w;    
  }
  document.documentElement.style.setProperty('--scale', scale);
  poster.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
}
