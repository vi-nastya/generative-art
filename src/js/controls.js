$('.controls__generate-btn').click(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawRandomTree(390, 550, 120, 0, 10);
});

$(document).ready(function(){
  $(".loading").hide();
});
