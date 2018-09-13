$(function(){
    $('#start').on('click', function(e){
        var parameters = { 
            id_a1: $('#id_a1').val(),
            id_a2: $('#id_a2').val()
         };
           $.get( '/start',parameters, function(data) {
               console.log(data);
            $('#img_a1').attr("src",data.image_A);
            $('#price_a1').text("$" + data.price_A);
            $('#title_a1').text("$" + data.title_A);
            

            $('#img_b1').attr("src",data.image_B);
            $('#price_b1').text("$" + data.price_B);
            $('#title_b1').text("$" + data.title_B);
         });     
    });
   });