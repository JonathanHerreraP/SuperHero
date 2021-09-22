$(document).ready(function(){
    let regex = /\d+/gm
    let ingresoOK = true
    $("#boton").click(function(){
        let ingreso = $("#input").val()
    // Se realiza chequeo de ingreso, solo numeros    
        if (regex.test(ingreso)==false || ingreso<1 || ingreso>731 ){
            document.querySelector("#error").innerHTML="Debe escribir solo numeros entre el 1 y el 731"
            
        }
     // si el input esta correcto, se accede a la API SuperHero   
        else{
            document.querySelector("#error").innerHTML=""
            console.log(ingreso)
            document.querySelector("#input").innerHTML=""
            $.ajax({
                type: "get",
                url: (`https://superheroapi.com/api.php/1754531141421195/${ingreso}`),
                dataType: "json",
                success: function (success) {
    // se rellena la informacion dinamicamente con la API                
                    console.log(success)
                    document.getElementById("imag").src=(`${success.image.url}`)
                    document.getElementById("nombre").innerHTML=(`Nombre: ${success.name}`);
                    document.getElementById("fullname").innerHTML=(`Nombre completo: ${success.biography["full-name"]}`);
                    document.getElementById("alterego").innerHTML=(`Alter-egos: ${success.biography["alter-egos"]}`);
                    document.getElementById("alias").innerHTML=(`Alias: ${success.biography.aliases}`);
                    document.getElementById("genero").innerHTML=(`Género: ${success.appearance.gender}`);
                    document.getElementById("raza").innerHTML=(`Raza: ${success.appearance.race}`);
                    document.getElementById("peso").innerHTML=(`Peso: ${success.appearance.weight}`);
                    document.getElementById("altura").innerHTML=(`Altura: ${success.appearance.height}`);
                    document.getElementById("ocupacion").innerHTML=(`Ocupación: ${success.work.occupation}`);
                    document.getElementById("coneccion").innerHTML=(`Conecciones: ${success.connections["group-affiliation"]}`);
                    
    // Se genera el grafico de torta con datos dinamicos de la API                
                    var chart = new CanvasJS.Chart("chartContainer", {
                        theme: "light2", // "light1", "light2", "dark1", "dark2"
                        exportEnabled: true,
                        animationEnabled: true,
                        title: {
                            text: "Stats SuperHero"
                        },
                        data: [{
                            type: "pie",
                            startAngle: 25,
                            toolTipContent: "<b>{label}</b>: {y}%",
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - {y}%",
                            dataPoints: [
                                { y: (success.powerstats.intelligence), label: "Inteligencia" },
                                { y: (success.powerstats.strength), label: "Fuerza" },
                                { y: (success.powerstats.speed), label: "Velocidad" },
                                { y: (success.powerstats.durability), label: "Durabilidad" },
                                { y: (success.powerstats.power), label: "Poder" },
                                { y: (success.powerstats.combat), label: "Combate" },
                              
                            ]
                        }]
                    });
                    chart.render();
                }
            });
        } 
        
         //token = 1754531141421195

    })
    
   
})




