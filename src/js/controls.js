$(document).ready(() => {
  $(".loading").fadeOut("slow");
  $(".controls-wrapper").hide();

  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: 90,
    values: [ 15, 70 ],
    slide: ( event, ui ) => {
      $( "#amount" ).val( ui.values[ 0 ] + " deg - " + ui.values[ 1 ] + " deg");
    }
  });
  $( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) +
    " deg - " + $( "#slider-range" ).slider( "values", 1 ) + " deg");
});
