$(document).ready(() => {
  $(".loading").fadeOut("slow");
  $(".controls-wrapper").hide();

  $("#leaves-color").spectrum({
    preferredFormat: "hex"
  }); 

  $("#branch-color").spectrum({
    preferredFormat: "hex"
  });

  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: 90,
    values: [ 15, 70 ],
    slide: ( event, ui ) => {
      $( "#angle" ).val( ui.values[ 0 ] + " deg - " + ui.values[ 1 ] + " deg");
    }
  });
  $( "#angle" ).val( $( "#slider-range" ).slider( "values", 0 ) +
    " deg - " + $( "#slider-range" ).slider( "values", 1 ) + " deg");
});
