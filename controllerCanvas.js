	var canvasLimites; // los margenes del canvas
    var flagPaint=false; // nos dice si pintar o no
    var actualPos; // la posición actual donde hice click
	var canvas;
   	var contexto;
   	var camino;
   	var errores=0;





function pick(event) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = contexto.getImageData(x, y, 1, 1);
  var data = pixel.data;
   var rgba = 'rgba(' + data[0] + ',' + data[1] +
             ',' + data[2] + ',' + data[3] + ')';
	if(data[0]==0 && data[1]==0 &&	data[2]==0 && data[3]==255){
			errores=errores+1;
			if(errores==1)
				animateprogress("#html5",30);	
			if(errores==2)
				animateprogress("#html5",70);
			if(errores==3)
				animateprogress("#html5",100);
	}	
}


function definirChoques(camino, pX, pY){
	for (var i = 0; i < camino.length; i=i+4) {
		if(camino[i]<pX &&camino[i+1]<pY && (camino[i+2]+camino[i])>pX &&(camino[i+3]+camino[i+1])>pY){
			errores=errores+1;
			if(errores==1)
				animateprogress("#html5",30);	
			if(errores==10)
				animateprogress("#html5",70);
			if(errores==20)
				animateprogress("#html5",100);
		}
	}
}

function puntaje(pX,PY){
	if(pX>300){
		animateprogress("#puntaje",30);
	}
	if(pX>600){
		animateprogress("#puntaje",60);
	}
	if(pX>700){
		animateprogress("#puntaje",100);
	}
}


function main(){
	 	camino=[0,0,800,10,
	 		   790,0,10,280,
	 		   790,320,10,80,
	 		   0,390,800,10,
      		   0,200,10,200,
      		   0,0,10,150,
      		   200,0,10,100,
      		   100,50,100,10,
      		   200,90,100,10,
	    0,150,50,10,
      	50,150,10,50,
      	50,200,50,10,
      	100,200,10,100,
      	50,300,200,10,
      	0,330,270,10,
      	270,280,10,60,
      	30,120,150,10,
      	100,120,10,50,
      	180,120,10,150,
      	180,150,200,10,
      	370,50,10,130,
      	400,50,10,130,
      	300,50,200,10,
      	400,150,300,10,
      	450,150,10,130,
      	270,270,250,10];
		canvas  = document.getElementById("canvas2D");
   		contexto = canvas.getContext("2d");
      	canvasLimites=canvas.getBoundingClientRect(); // obtenemos los limites del canvas
        canvas.addEventListener('mousedown',cambiarEstado,false);
        canvas.addEventListener('mouseup',cambiarEstado,false);
        canvas.addEventListener('mousemove',pintarLinea,false);
      //  canvas.addEventListener('mousemove',pick,false);
        canvas.style.cursor="hand";
        dibujarLaberinto();
      }

      function dibujarLaberinto(){

      	for (var i = 0; i < camino.length; i=i+4) {
      		contexto.fillRect(camino[i],camino[i+1],camino[i+2],camino[i+3]);
      	};
      	
      }
      function cambiarEstado(){
        flagPaint=!flagPaint;
        actualPos=obtenerCoordenadas(event);
      }

      function pintarLinea(event){
        if(flagPaint){
          var coordenadas=obtenerCoordenadas(event);
          contexto.beginPath(); // comenzamos a dibujar
          contexto.moveTo(actualPos.x, actualPos.y); // ubicamos el cursor en la posicion (10,10)
          contexto.lineTo(coordenadas.x,coordenadas.y);
          actualPos={
                      x:coordenadas.x,
                      y:coordenadas.y
                    };
          definirChoques(camino,actualPos.x,actualPos.y);
          puntaje(actualPos.x,actualPos.y);
          contexto.strokeStyle = "red"; // color de la linea
          contexto.stroke(); // dibujamos la linea
       }
     }

      function obtenerCoordenadas(event){
        var posX;
        var posY;
 
        if (event.pageX || event.pageY) {
          posX = event.pageX- canvasLimites.left;
          posY = event.pageY- canvasLimites.top;
        }
        else {
          posX = event.clientX - canvasLimites.left;
          posY = event.clientY - canvasLimites.top;
        }
 
       return {x:posX,
               y:posY
              };
     }
     
     function erase(){
       contexto.clearRect(0, 0, canvas.width, canvas.height);
     }	



