
$(document).ready(function(){$(".alert").addClass("in").fadeOut(14500);

/* swap open/close side menu icons */
$('[data-toggle=collapse]').click(function(){
  	// toggle icon
  	$(this).find("i").toggleClass("glyphicon-chevron-right glyphicon-chevron-down");
});
});

// Get the modal
var modal = document.getElementById('myModal');
// var trainingModal   = document.getElementById("trainingModal")
// Get the button that opens the modal
var btn = document.getElementById("btnAdmin");
var btn2 = document.getElementById("btnAdmin2");
var newTraining = document.getElementById ("newTrainingBttn");
// show the modal
btn.onclick = function() {
  console.log('hola');
  modal.style.display = "block";
  return false;
};
btn2.onclick = function() {
  modal.style.display = "block";
  return false;
};

// newTraining.onclick = function () {
//   trainingModal.style.display = "block";
//   return  false;
// }
// // When the user clicks on <span> (x), close the modal
var close = document.getElementById("close");
close.onclick = function() {
    modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
