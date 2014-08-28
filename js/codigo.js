

///////////////////
//VARIABLES////////
///////////////////

var tablero,
	canvas;


/////////////////
//OBJETOS////////
/////////////////

var fondo = {
	imagenURL: "img/fondo/pueblo.png",
	imagenOK: false
};

var lovino = {
	x: 128,
	y: 224,
	velocidad: 32,

	arribaURL: "img/personaje/lovino-arriba-0.png",
	arribaOK: false,
	abajoURL: "img/personaje/lovino-abajo-0.png",
	abajoOK: false,
	izdaURL: "img/personaje/lovino-izda-0.png",
	izdaOK: false,
	dchaURL: "img/personaje/lovino-dcha-0.png",
	abajoOK: false,

};

var antonio = {
	x: 384,
	y: 224,
	velocidad: 32,

	arribaURL: "img/personaje/antonio-arriba-0.png",
	abajoURL: "img/personaje/antonio-abajo-0.png",
	abajoOK: false,
	izdaURL: "img/personaje/antonio-izda-0.png",
	dchaURL: "img/personaje/antonio-dcha-0.png",

};


/////////////////
//DIBUJAR////////
/////////////////

function confirmarFondo () {
	fondo.imagenOK = true;

	dibujar();
}

function confirmarLovinoUP () {
	lovino.arribaOK = true;

	dibujar();
}

	function confirmarLovinoDOWN () {
	lovino.abajoOK = true;

	dibujar();
}

function confirmarLovinoLEFT () {
	lovino.izdaOK = true;

	dibujar();
}

function confirmarLovinoRIGHT () {
	lovino.dchaOK = true;

	dibujar();
}

function confirmarAntonio () {
	antonio.abajoOK = true;

	dibujar();
}


/////////////////////SPRITE DE PERSONAJE////////////////////////////////
//Antes, en inicio creo el addEventListener

var teclas = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39,
	ENTER: 13
}

var direccion;
var direccionGuardada; //Para que no mire abajo cuando le das a ENTER

function dibujar() {
	//Capa 0: Fondo
	if (fondo.imagenOK) {
		tablero.drawImage(fondo.imagen, 0, 0);
	}

	//Capa 1: Lovino
	var spriteLovi = lovino.abajo;
	
	//Si todo está cargado
	if (lovino.arribaOK && lovino.abajoOK && lovino.izdaOK && lovino.dchaOK) {
		//Cambiamos la dirección
		if (direccion == teclas.UP ) {
			spriteLovi = lovino.arriba;
			direccionGuardada = lovino.arriba;
		}
		else if (direccion == teclas.DOWN ) {
			spriteLovi = lovino.abajo;
			direccionGuardada = lovino.abajo;
		}
		else if (direccion == teclas.LEFT) {
			spriteLovi = lovino.izda;
			direccionGuardada = lovino.izda;
		}
		else if (direccion == teclas.RIGHT ) {
			spriteLovi = lovino.dcha;
			direccionGuardada = lovino.dcha;
		}
		//Para que pulsando enter, el sprite no se mueva
		else if (direccion == teclas.ENTER && direccionGuardada !== undefined) {
			spriteLovi = direccionGuardada;
		}

		//Si aún no te has movido, sale el sprite hacia abajo
		else if (direccionGuardada == undefined) {
			spriteLovi = lovino.abajo;
		}
		//Si presionas cualquier otra tecla, el sprite no se gira
		else {
			spriteLovi = direccionGuardada;
		}
		

		//Dibujamos al personaje
		tablero.drawImage(spriteLovi, lovino.x, lovino.y);
	}


	//
	//Capa 2: ANTO: Te mira y te habla
	var spriteAnto = antonio.abajo;

	if (lovino.y == antonio.y2 && spriteLovi == lovino.arriba && direccion == teclas.ENTER) {
			spriteAnto = antonio.abajo;
			hablar();
	}
		if (lovino.y2 == antonio.y && spriteLovi == lovino.abajo && direccion == teclas.ENTER) {
			spriteAnto = antonio.abajo;
			hablar();
		}
		if (lovino.x == antonio.x2 && spriteLovi == lovino.izda && direccion == teclas.ENTER) {
			spriteAnto = antonio.dcha;
			hablar();
		}
		if (lovino.x2 == antonio.x && spriteLovi == lovino.dcha && direccion == teclas.ENTER) {
			spriteAnto = antonio.izda;
			hablar();
		}
		
	
	tablero.drawImage(spriteAnto, antonio.x, antonio.y);
}


//El texto que muestra
var t = 0;
var textosArray = ["Debería limpiar mi casa, ¿no crees?", "Bah, me da pereza."];

function mostrarTexto () {
	if (t < 2) {
		pintarBurbuja();
		mostrarCara();

		tablero. textBaseline = 'middle';
  		tablero.fillStyle = 'black'; 
		tablero.fillText(textosArray[t], 160, 320); // text and position
		t++;	
	}
	else {
	detener = false;
	t = 0;
	}
}


//Detiene al personaje y al sprite mientras habla si es true
var detener = false;

function hablar() {
	detener = true;
	mostrarTexto();
}

//Dibuja la burbuja de diálogo. La inicio dentro de mostrarTexto
function pintarBurbuja () {
	tablero.beginPath();
    tablero.strokeStyle = "#604e40";
    tablero.moveTo(64, 305);
    tablero.arc(81,305,17, (Math.PI), (Math.PI * 1.5), false);
    tablero.lineTo(431, 288);
    tablero.lineTo(416, 271);
    tablero.lineTo(448, 288);
    tablero.arc(463,305,17, (Math.PI * 1.5), (Math.PI * 0), false);
    tablero.lineTo(480, 367);
    tablero.arc(463,367,17, (Math.PI * 0), (Math.PI * 0.5), false);
    tablero.lineTo(81, 384);
    tablero.arc(81,367,17, (Math.PI * 0.5), (Math.PI * 1), false);
 	tablero.lineTo(64, 288);
 	tablero.fillStyle = "white";
    tablero.fill();
    tablero.closePath();
    tablero.stroke()
}

var cara = {
	caraURL: "img/personaje/cara-antonio.png"
};
function mostrarCara() {
	tablero.drawImage(cara.imagen, 81, 305);
}


////////////////////
//MOVIMIENTO////////
////////////////////

var codigo;
function moverLovino(datos) {
	codigo = datos.keyCode;

	
		if (codigo == teclas.UP  && detener == false) {
			comprobarColision();
			ejecutarColision();

			if(ejecutarColision() !== true) {
				
			lovino.y -= lovino.velocidad;
			lovino.x2 = lovino.x + 32;
			lovino.y2 = lovino.y + 32;
			}
		}

		else if (codigo == teclas.DOWN  && detener == false) {

			comprobarColision();
			ejecutarColision();

			if(ejecutarColision() !== true) {
			lovino.y += lovino.velocidad;
			lovino.x2 = lovino.x + 32;
			lovino.y2 = lovino.y + 32;
			}
		}

		else if (codigo == teclas.LEFT  && detener == false) {

			comprobarColision();
			ejecutarColision();

			if(ejecutarColision() !== true) {
				lovino.x -= lovino.velocidad;
				lovino.x2 = lovino.x + 32;
				lovino.y2 = lovino.y + 32;
			}
		}

		else if (codigo == teclas.RIGHT  && detener == false) {

			comprobarColision();
			ejecutarColision();

			if(ejecutarColision() !== true) {
				lovino.x += lovino.velocidad;

				
				lovino.x2 = lovino.x + 32;
				lovino.y2 = lovino.y + 32;
				//alert(antonio.x);
				//alert(lovino.x2);
			}
		}


		if (detener == false) {
		direccion = codigo;
}

	dibujar();
}



//////////////////
//OBSTÁCULOS//////
//////////////////

var bordes = {
	ancho: [32, 512],
	alto: [32, 384]
};

var piscina = {
	ancho: [32, 128],
	alto: [256, 352]
};

var casaRoja = {
	ancho: [64, 224],
	alto: [64, 224]
};

var casaAzul = {
	ancho: [320, 480],
	alto: [64, 224]
};

var lago = {
	ancho1: [416, 448],
	alto1: [288, 320],

	ancho2: [448, 512],
	alto2: [256, 352],

	ancho3: [480, 512],	
	alto3: [352, 384]

};


//////////////////
//COLISIÓN////////
//////////////////


function comprobarColision() {

	//Comprobamos si chocan la dcha de la pisci con la izda de Lovino, etc
	//
	//PISCINA
	colPiscinaArriba = piscina.alto[0] - lovino.y2; //Me choco en el borde de arriba
	colPiscinaAbajo = piscina.alto[1] - lovino.y;	//...abajo
	colPiscinaIzda = piscina.ancho[0] - lovino.x2;	//...izquierda
	colPiscinaDcha = piscina.ancho[1] - lovino.x;	//...derecha
	
	//
	//BORDES: Los bordes (del canvas) van del revés:
	colBordesArriba = bordes.alto[0] - lovino.y;
	colBordesAbajo = bordes.alto[1] - lovino.y2;
	colBordesIzda = bordes.ancho[0] - lovino.x;
	colBordesDcha = bordes.ancho[1] - lovino.x2;

	//
	//CASA ROJA
	colCasaRojaArriba = casaRoja.alto[0] - lovino.y2;
	colCasaRojaAbajo = casaRoja.alto[1] - lovino.y;
	colCasaRojaIzda = casaRoja.ancho[0] - lovino.x2;
	colCasaRojaDcha = casaRoja.ancho[1] - lovino.x;

	//CASA AZUL
	colCasaAzulArriba = casaAzul.alto[0] - lovino.y2;
	colCasaAzulAbajo = casaAzul.alto[1] - lovino.y;
	colCasaAzulIzda = casaAzul.ancho[0] - lovino.x2;
	colCasaAzulDcha = casaAzul.ancho[1] - lovino.x;

	//
	//LAGO
	colLagoArriba1 = lago.alto1[0] - lovino.y2;
	colLagoArriba2 = lago.alto2[0] - lovino.y2;
	colLagoAbajo1 = lago.alto1[1] - lovino.y;
	colLagoAbajo2 = lago.alto2[1] - lovino.y;
	colLagoIzda1 = lago.ancho1[0] - lovino.x2;
	colLagoIzda2 = lago.ancho2[0] - lovino.x2;
	colLagoIzda3 = lago.ancho3[0] - lovino.x2;

	//
	//ANTONIO
	antonio.x2 = antonio.x + 32;
	antonio.y2 = antonio.y + 32;
	antonio.ancho = [antonio.x, antonio.x2];
	antonio.alto = [antonio.y, antonio.y2];
	colAntonioArriba = antonio.alto[0] - lovino.y2;
	colAntonioAbajo = antonio.alto[1] - lovino.y;
	colAntonioIzda = antonio.ancho[0] - lovino.x2;
	colAntonioDcha = antonio.ancho[1] - lovino.x;
	
}

function ejecutarColision() {
	//
	//BORDES (Recordar que en los bordes, las teclas tb van al revés)
	if ( colBordesArriba == 0 && codigo == teclas.UP)  {
		return true;
	}
	if ( colBordesAbajo == 0 && codigo == teclas.DOWN)  {
		return true;
	}
	if ( colBordesIzda == 0 && codigo == teclas.LEFT)  {
		return true;
	}
	if ( colBordesDcha == 0 && codigo == teclas.RIGHT)  {
		return true;
	}
	

	//
	//PISCINA
	if ( colPiscinaArriba == 0 && (piscina.ancho[0] <= lovino.x && lovino.x < piscina.ancho[1] )  && codigo == teclas.DOWN )  {
		return true;
	}
	if ( colPiscinaAbajo == 0 && (piscina.ancho[0] <= lovino.x && lovino.x < piscina.ancho[1] )  && codigo == teclas.UP )  {
		return true;
	}
	if ( colPiscinaIzda == 0 && (piscina.alto[0] <= lovino.y && lovino.y < piscina.alto[1] )  && codigo == teclas.RIGHT )  {
		return true;
	}
	if ( colPiscinaDcha == 0 && (piscina.alto[0] <= lovino.y && lovino.y < piscina.alto[1] )  && codigo == teclas.LEFT )  {
		return true;
	}

	//
	//CASA ROJA
	if ( colCasaRojaArriba == 0 && (casaRoja.ancho[0] <= lovino.x && lovino.x < casaRoja.ancho[1] )  && codigo == teclas.DOWN )  {
		return true;
	}
	if ( colCasaRojaAbajo == 0 && (casaRoja.ancho[0] <= lovino.x && lovino.x < casaRoja.ancho[1] )  && codigo == teclas.UP )  {
		return true;
	}
	if ( colCasaRojaIzda == 0 && (casaRoja.alto[0] <= lovino.y && lovino.y < casaRoja.alto[1] )  && codigo == teclas.RIGHT )  {
		return true;
	}
	if ( colCasaRojaDcha == 0 && (casaRoja.alto[0] <= lovino.y && lovino.y < casaRoja.alto[1] )  && codigo == teclas.LEFT )  {
		return true;
	}

	//
	//CASA AZUL
	if ( colCasaAzulArriba == 0 && (casaAzul.ancho[0] <= lovino.x && lovino.x < casaAzul.ancho[1] )  && codigo == teclas.DOWN )  {
		return true;
	}
	if ( colCasaAzulAbajo == 0 && (casaAzul.ancho[0] <= lovino.x && lovino.x < casaAzul.ancho[1] )  && codigo == teclas.UP )  {
		return true;
	}
	if ( colCasaAzulIzda == 0 && (casaAzul.alto[0] <= lovino.y && lovino.y < casaAzul.alto[1] )  && codigo == teclas.RIGHT )  {
		return true;
	}
	if ( colCasaAzulDcha == 0 && (casaAzul.alto[0] <= lovino.y && lovino.y < casaAzul.alto[1] )  && codigo == teclas.LEFT )  {
		return true;
	}

	//
	//LAGO
	if ( colLagoArriba1 == 0 && (lago.ancho1[0] <= lovino.x && lovino.x < lago.ancho1[1] )  && codigo == teclas.DOWN )  {
		return true;
		alert("1");
	}
	if ( colLagoArriba2 == 0 && (lago.ancho2[0] <= lovino.x && lovino.x < lago.ancho2[1] )  && codigo == teclas.DOWN )  {
		return true;
	}
	if ( colLagoAbajo1 == 0 && (lago.ancho1[0] <= lovino.x && lovino.x < lago.ancho1[1] )  && codigo == teclas.UP )  {
		return true;
	}
	if ( colLagoAbajo2 == 0 && (lago.ancho2[0] <= lovino.x && lovino.x < lago.ancho2[1] )  && codigo == teclas.UP )  {
		return true;
	}
	if ( colLagoIzda1 == 0 && (lago.alto1[0] <= lovino.y && lovino.y < lago.alto1[1] )  && codigo == teclas.RIGHT )  {
		return true;
	}
	if ( colLagoIzda2 == 0 && (lago.alto2[0] <= lovino.y && lovino.y < lago.alto2[1] )  && codigo == teclas.RIGHT )  {
		return true;
	}
	if ( colLagoIzda3 == 0 && (lago.alto3[0] <= lovino.y && lovino.y < lago.alto3[1] )  && codigo == teclas.RIGHT )  {
		return true;
	}

	//
	//ANTO
	if (colAntonioArriba == 0 && (antonio.ancho[0] <= lovino.x && lovino.x < antonio.ancho[1])  && codigo == teclas.DOWN) {
		return true;
	}
	if (colAntonioAbajo == 0 && (antonio.ancho[0] <= lovino.x && lovino.x < antonio.ancho[1])  && codigo == teclas.UP) {
		return true;
	}
	if (colAntonioIzda == 0 && (antonio.alto[0] <= lovino.y && lovino.y < antonio.alto[1])  && codigo == teclas.RIGHT) {
		return true;
	}
	if (colAntonioDcha == 0 && (antonio.alto[0] <= lovino.y && lovino.y < antonio.alto[1])  && codigo == teclas.LEFT) {
		return true;
	}
}






///////////////////////////////////////
//LO QUE SE PLASMA EN EL CANVAS////////
///////////////////////////////////////

function inicio() {
	canvas = document.getElementById("canvas");
	tablero = canvas.getContext("2d");
	tablero.font = 'italic 18px Arial';

	//
	//MOVER LOVINO
	document.addEventListener("keydown", moverLovino);

	//
	//FONDO
	fondo.imagen = new Image();
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = confirmarFondo;

	//
	//LOVINO
	lovino.arriba = new Image();
	lovino.arriba.src = lovino.arribaURL;
	lovino.arriba.onload = confirmarLovinoUP;

	lovino.abajo = new Image();
	lovino.abajo.src = lovino.abajoURL;
	lovino.abajo.onload = confirmarLovinoDOWN;

	lovino.izda = new Image();
	lovino.izda.src = lovino.izdaURL;
	lovino.izda.onload = confirmarLovinoLEFT;

	lovino.dcha = new Image();
	lovino.dcha.src = lovino.dchaURL;
	lovino.dcha.onload = confirmarLovinoRIGHT;


	//
	//ANTONIO
	antonio.arriba = new Image();
	antonio.arriba.src = antonio.arribaURL;

	antonio.abajo = new Image();
	antonio.abajo.src = antonio.abajoURL;
	antonio.abajo.onload = confirmarAntonio;

	antonio.izda = new Image();
	antonio.izda.src = antonio.izdaURL;

	antonio.dcha = new Image();
	antonio.dcha.src = antonio.dchaURL;


	cara.imagen = new Image();
	cara.imagen.src = cara.caraURL;

}

