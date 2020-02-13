$(document).ready(() => {
  $(".loading").fadeOut("slow");
  $(".controls-wrapper").hide();

  $('.controls__generate-btn').click(() => {
    $('.controls-wrapper').slideDown("slow");
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawRandomTree(390, 550, 120, 0, 10);
  });
});
