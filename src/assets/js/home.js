function openNav() {
    console.log('muestro barra');
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("social").style.display = "none";
}

function closeNav() {
    console.log('cierro barra');
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("social").style.display = "block";
}


window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("header").style.paddingTop = "0px";
    } else {
        document.getElementById("header").style.paddingTop = "50px";
    }
}


$(document).ready(function() {

    $('#adelante').click(function() {
        console.log($("#contenedor-fichas").scrollLeft());
        let posicion = $("#contenedor-fichas").scrollLeft();
        $("#contenedor-fichas").scrollLeft(posicion + 500);
    });
    $('#atras').click(function() {
        console.log($("#contenedor-fichas").scrollLeft());
        let posicion = $("#contenedor-fichas").scrollLeft();
        $("#contenedor-fichas").scrollLeft(posicion - 500);
    });

    $('#adelante-r').click(function() {
        console.log($("#contenedor-fichas-r").scrollLeft());
        let posicion = $("#contenedor-fichas-r").scrollLeft();
        $("#contenedor-fichas-r").scrollLeft(posicion + 500);
    });
    $('#atras-r').click(function() {
        console.log($("#contenedor-fichas-r").scrollLeft());
        let posicion = $("#contenedor-fichas-r").scrollLeft();
        $("#contenedor-fichas-r").scrollLeft(posicion - 500);
    });

    $(window).scroll(function() {


        var windowHeight = $(window).scrollTop();

        var seccionNube = $("#contenedor-nube").offset();
        var seccionMapa = $("#contenedor-mapa").offset();
        var seccionDocumentos = $("#contenedor-ultimos-documentos").offset();
        var seccionFooter = $("#footer").offset();
        var menuFlotante = $("#menu-documentos").offset();
        var menuBuscador = $("#menu-buscador").offset();
        var menuNube = $("#menu-nube").offset();
        var menuPais = $("#menu-pais").offset();
        seccionNube = seccionNube.top;
        seccionDocumentos = seccionDocumentos.top;
        seccionMapa = seccionMapa.top;
        menuFlotante = menuFlotante.top;
        seccionFooter = seccionFooter.top;
        menuBuscador = menuBuscador.top;
        menuNube = menuNube.top;
        menuPais = menuPais.top;
        //console.log(menuFlotante);

        comparaPosicion(menuFlotante, seccionNube, seccionMapa, seccionDocumentos, seccionFooter, 'menu-documentos', 'documentos');
        comparaPosicion(menuBuscador, seccionNube, seccionMapa, seccionDocumentos, seccionFooter, 'menu-buscador', 'buscador');
        comparaPosicion(menuNube, seccionNube, seccionMapa, seccionDocumentos, seccionFooter, 'menu-nube', 'nube');
        comparaPosicion(menuPais, seccionNube, seccionMapa, seccionDocumentos, seccionFooter, 'menu-pais', 'pais');



        /*$("#wordCloud").jQWCloud({
			words: [],
			cloud_color: '#4d4d4d',		
			minFont: 10,
			maxFont: 100,
			//fontOffset: 5,
			//cloud_font_family: 'Owned',
			//verticalEnabled: false,
			padding_left: 1,
			//showSpaceDIV: true,
			//spaceDIVColor: 'red',
			word_common_classes: 'WordClass',		
//			word_mouseEnter :function(){
//				$(this).css("text-decoration","underline");
//				
//			},
			word_mouseOut :function(){
				$(this).css("text-decoration","none");	
				
			},
			word_mouseOver: function(){
				$(this).css('cursor', 'pointer');
				console.log($(this).text());
			},
			word_click: function(){ 			
				alert("You have selected:" +$(this).text());
				
			},		              
//			beforeCloudRender: function(){
//			       date1=new Date();
//		 	},
//		 	afterCloudRender: function(){
//					var date2=new Date();
//					console.log("Cloud Completed in "+(date2.getTime()-date1.getTime()) +" milliseconds");
//				}
		});*/


    });

    function comparaPosicion(menuFlotante, seccion1, seccion2, seccion3, seccion4, id, img) {
        //console.log('posisciones==' + seccion1 + ", "+ seccion2 + ", "+ seccion3 + ", "+ seccion4);
        if ((menuFlotante >= seccion1 && menuFlotante <= seccion2) || (menuFlotante >= seccion3 && menuFlotante <= seccion4)) {
            //console.log('aqui cambio..');
            $("#" + id).css('background-image', 'url(assets/img/' + img + '-a.png)');
        } else {
            $("#" + id).css('background-image', 'url(assets/img/' + img + '.png)');
        }
    }

    $("#btn-buscador").click(function() {
        $('html, body').animate({
            scrollTop: $("#contenedor-banner").offset().top
        });
    });

    $("#btn-nube").click(function() {
        $('html, body').animate({
            scrollTop: $("#contenedor-nube").offset().top
        });
    });

    $("#btn-pais").click(function() {
        $('html, body').animate({
            scrollTop: $("#contenedor-mapa").offset().top
        });
    });

    $("#btn-documentos").click(function() {
        $('html, body').animate({
            scrollTop: $("#contenedor-ultimos-documentos").offset().top
        });
    });

});
let palabras2 = [];
// $.ajax({url: "assets/js/json/palabrasAncestral.json", success: function(result){
//     console.log(result);
//     palabras2 = result;
//     $("#wordCloud").jQWCloud({

//         words: palabras2,
//         cloud_color: '#4d4d4d',		
//         minFont: 5,
//         maxFont: 40,
//         padding_left: 1,
//         fontOffset: 2,
//         word_common_classes: 'WordClass',
//         word_mouseOut :function(){
//             $(this).css("text-decoration","none");	

//         },
//         word_mouseOver: function(){
//             $(this).css('cursor', 'pointer');
//             console.log($(this).text());
//         },
//         word_click: function(){ 			
//             alert("You have selected:" +$(this).text());

//         },
//         afterCloudRender: function(){
//             console.log('despues de');
//         }
//     });
//   }});

// // var palabras2 = [];
// 	$scope.nube = function () {
//         console.log('obtener datos nube');
//         $http({
//             method: 'Get',
//             url: 'assets/js/json/palabrasAncestral.json',
//             withCredentials: true,
//             headers: {
//                 'X-Requested-With': 'XMLHttpRequest'
//             }		
//         }).then(function (response) {
//         	console.log(response.data);
//         	palabras2 = response.data;
// //        	console.log($scope.palabras);
// //        	for(i = 0; i < palabras.length; i++){
// //        		console.log(palabras[i]);
// //        		var nombre = Object.keys(palabras[i]).toString();
// //        		console.log(nombre);
// //        		console.log(palabras[i][nombre]);
// //        		var peso= palabras[i][nombre];
// //        		var prueba = {word: nombre, weight: peso};
// //        		palabras2.push(prueba);
// //        		console.log("final palabras");
// //        		console.log(prueba);
// //        	}
//         	console.log(palabras2);
//         	$("#wordCloud").jQWCloud({
//     			words: palabras2,
//     			cloud_color: '#4d4d4d',		
//     			minFont: 10,
//     			maxFont: 40,
//     			padding_left: 1,
//     			fontOffset: 2,
//     			word_common_classes: 'WordClass',
//     			word_mouseOut :function(){
//     				$(this).css("text-decoration","none");	

//     			},
//     			word_mouseOver: function(){
//     				$(this).css('cursor', 'pointer');
//     				console.log($(this).text());
//     			},
//     			word_click: function(){ 			
//     				alert("You have selected:" +$(this).text());

//     			},
//     			afterCloudRender: function(){
//     				console.log('despues de');
//     			}
//     		});
//         });
//     }