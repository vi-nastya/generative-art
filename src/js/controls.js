$(document).ready(() => {
  $(".controls-wrapper").hide();

  $('.controls__btn--start').click(() => {
    $('.controls-wrapper').slideDown("slow");
    $('.controls__btn--start').hide();
  });

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

// PARAMS
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let currentTree = [];

const START_X = 390;
const START_Y = 550;
const START_LENGTH = 120;
const START_ANGLE = 0;
const START_WIDTH = 10;
const LEAVES_WIDTH = 2;

const removeTree = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  currentTree = [];
}

// buttons
$('.controls__btn--generate').click(() => {
  removeTree();

  const leavesColor = $("#leaves-color").val();
  const branchesColor = $("#branch-color").val();
  const minAngle = $( "#slider-range" ).slider( "values", 0 );
  const maxAngle = $( "#slider-range" ).slider( "values", 1 );

  generateRandomTree(currentTree, START_X, START_Y, START_LENGTH, START_ANGLE, START_WIDTH, minAngle, maxAngle);
  drawTree(ctx, currentTree, LEAVES_WIDTH, leavesColor, branchesColor);
  });

$('.controls__btn--clear').click(() => {
  removeTree();
});

const saveBtn = $('.controls__btn--save');
saveBtn.click(() => {
  saveBtn.attr("href", canvas.toDataURL());
  saveBtn.attr("download", "my-tree.png");
});
