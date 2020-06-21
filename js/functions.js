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
