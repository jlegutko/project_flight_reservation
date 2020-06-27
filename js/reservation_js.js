//first continental airplane
function airplaneAreaLocal(airplane){
    for(var k=0; k<2; k++){
        var column = document.createElement("div");
            airplane.appendChild(column);
            column.classList.add('airplane_column');
            column.id = i;
        for(var i=0; i<15; i++){
            var row = document.createElement("div");
            column.appendChild(row);
            row.classList.add('airplane_row');
            row.id = i;
            if(k==1){
                if(i==0){
                    var seatIndex = document.createElement("span");
                    row.appendChild(seatIndex);
                }else{
                    var seatIndex = document.createElement("span");
                    row.appendChild(seatIndex);
                    seatIndex.innerHTML = i;
                }
            }
            for(var j=0; j<2; j++){
                if(i==0){
                    var indexBottom = document.createElement("span");
                    row.appendChild(indexBottom);
                    indexBottom.innerHTML = 'A';
                }else{
                    var seat = document.createElement("input");
                    row.appendChild(seat);
                    seat.classList.add('seat');
                    seat.id = k + '_' + i + '_' + j;
                    seat.type = 'button';
                }
                
            }
        }
        
    }
}

function airplaneAreaContinental(airplane){
    for(var k=0; k<3; k++){
        var column = document.createElement("div");
            airplane.appendChild(column);
            column.classList.add('airplane_column');
            column.id = i;
        for(var i=0; i<15; i++){
            var row = document.createElement("div");
            column.appendChild(row);
            row.classList.add('airplane_row');
            row.id = i;
            for(var j=0; j<3; j++){
                var seat = document.createElement("input");
                row.appendChild(seat);
                seat.classList.add('seat');
                seat.id = k + '_' + i + '_' + j;
                seat.type = 'button';
            }
        }
    }
}

function airplaneAreaContinental(airplane){
    for(var k=0; k<2; k++){
        var column = document.createElement("div");
            airplane.appendChild(column);
            column.classList.add('airplane_column');
            column.id = i;
        for(var i=0; i<8; i++){
            var row = document.createElement("div");
            column.appendChild(row);
            row.classList.add('airplane_row');
            row.id = i;
            for(var j=0; j<3; j++){
                var seat = document.createElement("input");
                row.appendChild(seat);
                seat.classList.add('seat');
                seat.id = k + '_' + i + '_' + j;
                seat.type = 'button';
            }
        }
    }
}

function airplaneAreaIntercontinental(airplane){
    for(var k=0; k<2; k++){
        var column = document.createElement("div");
            airplane.appendChild(column);
            column.classList.add('airplane_column');
            column.id = i;
        for(var i=0; i<8; i++){
            var row = document.createElement("div");
            column.appendChild(row);
            row.classList.add('airplane_row');
            row.id = i;
            for(var j=0; j<3; j++){
                var seat = document.createElement("input");
                row.appendChild(seat);
                seat.classList.add('seat');
                seat.id = k + '_' + i + '_' + j;
                seat.type = 'button';
            }
        }
    }
}

// making airplane model
var airplaneType = document.getElementById("flightDestination").value;

var airplaneFront = document.getElementById("airplane_front");

if(airplaneType == "local"){
    airplaneAreaLocal(airplaneFront);
    var index =  document.createElement("input");
    "airplane_map"
}else if(airplaneType == "continental"){
    airplaneAreaContinental(airplaneFront);
}else{
    airplaneAreaIntercontinental(airplaneFront);
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
    }
});
// Pricing connected with inputs
var adultPrice = parseInt(document.getElementById("adult_price").textContent);
var kidPrice = parseInt(document.getElementById("kid_price").textContent);
var babyPrice = parseInt(document.getElementById("baby_price").textContent);
var lagguagePrice = parseInt(document.getElementById("lagguage_price").textContent);
var seatsAmount = parseInt(document.getElementById("seats_amount").textContent);

var adultAmount = parseInt(document.getElementById('seatsAmountAdult').value); 
var kidAmount = parseInt(document.getElementById('seatsAmountKid').value); 
var babyAmount = parseInt(document.getElementById('seatsAmountBaby').value);
//suming up the inputs with seats
var seatSum = 0;
function myFunction(val) {
    console.log(val);
    seatSum = parseInt(document.getElementById('seatsAmountAdult').value) + parseInt(document.getElementById('seatsAmountKid').value) 
    + parseInt(document.getElementById('seatsAmountBaby').value);
    // Creating overall of the pricing
    var sampleDiv = document.createElement("div");
    document.getElementById("lagguage_option").after(sampleDiv);

    sampleDiv.innerHTML = "Price: " + parseInt(document.getElementById("adult_price").textContent) * parseInt(document.getElementById('seatsAmountAdult').value) + " " + (kidPrice * kidAmount) + " " + (babyPrice * babyAmount);
    sampleDiv.classList.add("item_header");

    if((adultAmount!=0 || kidAmount!=0 || babyAmount!=0) && (selectedSeats.length == seatSum)){
        //button appears when all form is filled and seats are marked
        document.getElementById("order").classList.remove("hidden_input");
    }
    if (seatSum > 9){
        console.log("nieeeee");
    }
}

//adding Event listener to each seat and counting how many seats selected, if 9 break
var selectedSeats=[];

document.querySelectorAll('.seat').forEach(item => {
    item.addEventListener('click', event => {

        if (item.classList.contains("seat_booked")) {
            item.classList.remove("seat_booked");
            item.classList.add("seat_free");
        } else {
            item.classList.add("seat_booked");
            item.classList.remove("seat_free");
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
var seatsIds = document.getElementById("plus").after(input);
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
    var orderHeader = document.getElementById('order_header');
    orderHeader.classList.remove("hidden_input");
}