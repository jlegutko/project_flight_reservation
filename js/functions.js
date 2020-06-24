// Login pop up TODO: zastapic funkcja

document.getElementById('login_btn').addEventListener('click', function(){
    document.querySelector("#login_modal").style.display="flex";
});

document.getElementById('login_closure_btn').addEventListener('click', function(){
    document.querySelector("#login_modal").style.display="none";
});


// Register pop up

document.getElementById('register_btn').addEventListener('click', function(){
    document.querySelector("#registration_modal").style.display="flex";
});

document.getElementById('reg_closure_btn').addEventListener('click', function(){
    document.querySelector("#registration_modal").style.display="none";
});

// Today's date checker and adding min to input
var today = new Date();
var dateInput = document.getElementById('flightDate');
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
dateInput.min = today; 

// One year limit checker and adding max to input
var max_date = yyyy + 1 + '-' + mm + '-' + dd; 
dateInput.max = max_date;
