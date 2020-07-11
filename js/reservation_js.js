
//first continental airplane

function airplaneAreaLocal(airplane, amount, letters){
    var z=0;
    for(var k=0; k<2; k++){
        var column = document.createElement("div");
            airplane.appendChild(column);
            column.classList.add('airplane_column');
            column.id = i;
        for(var i=0; i<21; i++){
            var row = document.createElement("div");
            column.appendChild(row);
            row.classList.add('airplane_row');
            row.id = i;
            if(k==0){
                if(i==0){
                    var seatIndex = document.createElement("span");
                    row.appendChild(seatIndex);
                }else{
                    var seatIndex = document.createElement("span");
                    row.appendChild(seatIndex);
                    seatIndex.classList.add("number_list")
                    seatIndex.innerHTML = i;
                }
            }
            for(var j=0; j<amount; j++){
                if(i==0){
                    var indexBottom = document.createElement("span");
                    row.appendChild(indexBottom);
                    indexBottom.innerHTML = letters[z];
                    z++;
                }else{
                    var seat = document.createElement("input");
                    row.appendChild(seat);
                    seat.classList.add('seat');
                    seat.classList.add('airplane_area_first');
                    seat.id = k + '_' + i + '_' + j;
                    seat.type = 'button';
                }
                
            }
        }
        
    }
}


var localLetters = ['A','B','C','D'];
var continentalLetters = ['A','B','C','D','E','F'];
var intercontinentalLetters = ['A','B','C','D','E','F','G','H'];
var amount;

// making airplane model
var airplaneType = document.getElementById("flightDestination").value;

var airplaneFront = document.getElementById("airplane_area");

if(airplaneType == "local"){
    airplaneLocal = document.createElement("div");
    airplaneLocal.classList.add("airplane_model_local");
    airplaneFront.appendChild(airplaneLocal);
    airplaneAreaLocal(airplaneLocal, 2, localLetters);
}else if(airplaneType == "continental"){
    airplaneLocal = document.createElement("div");
    airplaneLocal.classList.add("airplane_model_continental");
    airplaneFront.appendChild(airplaneLocal);
    airplaneAreaLocal(airplaneLocal, 3, continentalLetters);
}else{
    airplaneLocal = document.createElement("div");
    airplaneLocal.classList.add("airplane_model_intercontinental");
    airplaneFront.appendChild(airplaneLocal);
    airplaneAreaLocal(airplaneLocal, 4, intercontinentalLetters);
}

//Reserved seats table
var seatsTab=[];

var idTab = document.querySelectorAll('.seats_id');

idTab.forEach(elem => {
    var idElem = elem.textContent.toString().split(",");
    idElem.forEach(item =>{
        seatsTab.push(item.toString());
    })
})

document.querySelectorAll('.seat').forEach(item => {
    if (seatsTab.includes(item.id)) {
        item.classList.add("item_reserved");
        item.classList.remove("seat");
        item.classList.remove("airplane_area_first");
    }
});
// Pricing connected with inputs
var seatsAmount = parseInt(document.getElementById("seats_amount").textContent);
var adultAmount = parseInt(document.getElementById('seatsAmountAdult').value); 
var kidAmount = parseInt(document.getElementById('seatsAmountKid').value); 
var babyAmount = parseInt(document.getElementById('seatsAmountBaby').value);
//suming up the inputs with seats
var seatSum = 0;
var lagguage_flag = 0;
var lagguagePrice = document.getElementById("lagguage_price");
//eventListener for buttons with lagguage type - lagguage plus
var lagguagePlus = document.getElementById("lagguage_plus");
// append lagguage option to order details
var lagguaggeSpan = document.getElementById('lagguage_span');

lagguagePlus.addEventListener("click",function(){
    lagguagePlus.classList.add("clicked_lagguage");
    document.getElementById("option_plus").classList.add("choosen_option");
    document.getElementById("option_reg").classList.remove("choosen_option");
    document.getElementById("lagguage_regular").classList.remove("clicked_lagguage");
    lagguaggeSpan.innerHTML = '<i class="fas fa-suitcase-rolling"></i> Lagguage option: plus + ' + parseInt(lagguagePrice.textContent)+'$';
    lagguage_flag = 1;
 });
//eventListener for buttons with lagguage type - lagguage regular
var lagguageRegular = document.getElementById("lagguage_regular");
lagguageRegular.addEventListener("click",function(){
   lagguageRegular.classList.add("clicked_lagguage");
   document.getElementById("option_reg").classList.add("choosen_option");
   document.getElementById("option_plus").classList.remove("choosen_option");
   document.getElementById("lagguage_plus").classList.remove("clicked_lagguage");
   lagguaggeSpan.innerHTML = '<i class="fas fa-suitcase-rolling"></i> Lagguage option: regular';
   lagguage_flag = 1;
});

var selectedSeats=[];
var priceTable = [];
var adultPrice = 0;
var kidPrice = 0;
var overallPrice = 0;
var babyPrice = 0;

document.getElementById('seatsAmountAdult').addEventListener("change",function(){
    adultPrice = parseInt(document.getElementById("adult_price").textContent) * parseInt(document.getElementById('seatsAmountAdult').value);
});
document.getElementById('seatsAmountKid').addEventListener("change",function(){
    kidPrice = parseInt(document.getElementById("kid_price").textContent) * parseInt(document.getElementById('seatsAmountKid').value)
});
document.getElementById('seatsAmountBaby').addEventListener("change",function(){
    babyPrice = parseInt(document.getElementById("baby_price").textContent) * parseInt(document.getElementById('seatsAmountBaby').value);
});



function myFunction(val) {
    seatSum = parseInt(document.getElementById('seatsAmountAdult').value) + parseInt(document.getElementById('seatsAmountKid').value) 
    + parseInt(document.getElementById('seatsAmountBaby').value);
    // Creating overall of the pricing
    adultPrice = parseInt(document.getElementById("adult_price").textContent) * parseInt(document.getElementById('seatsAmountAdult').value);
    kidPrice = parseInt(document.getElementById("kid_price").textContent) * parseInt(document.getElementById('seatsAmountKid').value);
    babyPrice = parseInt(document.getElementById("baby_price").textContent) * parseInt(document.getElementById('seatsAmountBaby').value);
    overallPrice = adultPrice + kidPrice + babyPrice;
    document.getElementById("container-price").innerHTML= "Price for tickets: " + adultPrice + "+" + kidPrice + "+" + babyPrice + "+" + "=" + overallPrice + "$";
}

//adding Event listener to each seat and counting how many seats selected, if 9 break


document.querySelectorAll('.seat').forEach(item => {
    item.addEventListener('click', event => {

        if (item.classList.contains("seat_booked")) {
            item.classList.remove("seat_booked");
            item.classList.add("airplane_area_first");
        } else {
            item.classList.add("seat_booked");
            item.classList.remove("airplane_area_first");
        }
        //((item.classList.contains("seat_booked")) ? ((item.classList.toggle("seat_free")) && (selectedSeats = selectedSeats - 1)) :
        //((item.classList.toggle("seat_booked") && (selectedSeats = selectedSeats - 1))));

    })
});

// function that removes elements from array by name of parameter
function arrayRemove(arr, value) { return arr.filter(function(ele){ return ele != value; });}

// blocking the possibility to choose more seats than in form
document.querySelectorAll('.seat').forEach(item => {
    item.addEventListener('click', event => {
        if (selectedSeats.length>=seatSum) {
            item.classList.remove("seat_booked");
            item.classList.add("airplane_area_first");
        }
    });
});

// Saving ids to array selectedSeats
document.querySelectorAll('.seat').forEach(item => {
    item.addEventListener('click', event => {
        if (item.classList.contains("seat_booked")) {
            selectedSeats.push(item.id);
        } else {
            selectedSeats = arrayRemove(selectedSeats, item.id);
        }
    });
});

var input = document.createElement("input");
var seatsIds = document.getElementById("lagguage_plus").after(input);
input.name="seatIds";
input.id="seatIds";
input.classList.add("hidden_input");

document.querySelectorAll('.seat').forEach(item => {
    item.addEventListener('click', event => {
        input.value = selectedSeats;
    });
});


// Creating overall of the order
var orderDiv = document.createElement("div");

//after button appear, clicking to see order details
function showOrderDetails() {
    document.querySelectorAll('.item_header').forEach(item => {
        if(item.classList.contains("hidden_input")){
            item.classList.remove("hidden_input");
        }
    });
    document.querySelectorAll('.item_label').forEach(item => {
        if(item.classList.contains("hidden_input")){
            item.classList.remove("hidden_input");
        }
    });
    document.querySelectorAll('.item_input').forEach(item => {
        if(item.classList.contains("hidden_input")){
            item.classList.remove("hidden_input");
        }
    });
}

// appearing of correct selection

document.querySelectorAll('.seat').forEach(item => {
    item.addEventListener('click', event => {
        if (selectedSeats.length == seatSum) {
            document.getElementById('correct_selection').classList.add("fas");
            document.getElementById('correct_selection').classList.add("fa-check");
            document.getElementById('correct_selection').classList.remove("hidden_input");
        } else {
            document.getElementById('correct_selection').classList.add("hidden_input");
            document.getElementById('correct_selection').classList.remove("fas");
            document.getElementById('correct_selection').classList. remove("fa-check");
        }
    });
});


