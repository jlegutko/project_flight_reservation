//first continental airplane
function airplaneArea(airplane){
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
var airplaneBack = document.getElementById("airplane_back");
if(airplaneType == "local"){
    airplaneArea(airplaneFront);
    airplaneArea(airplaneBack);
}else if(airplaneType == "continental"){
    airplaneArea(airplaneFront);
    airplaneArea(airplaneFront);
    airplaneArea(airplaneBack);
}else{
    airplaneArea(airplaneFront);
    airplaneArea(airplaneFront);
    airplaneArea(airplaneBack);
    airplaneArea(airplaneBack);
}


//suming up the inputs with seats
var seatSum = 0;
function myFunction(val) {
    console.log(val);
    seatSum = parseInt(document.getElementById('seatsAmountAdult').value) + parseInt(document.getElementById('seatsAmountKid').value) 
    + parseInt(document.getElementById('seatsAmountBaby').value)
    if (seatSum > 9){
        document.getElementById('values').innerHTML = "Nie mozna wiecej niz 9!"
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
var seatsIds = document.getElementById("lagguage_type").after(input);
input.name="seatIds";
input.id="seatIds";

document.querySelectorAll('.seat').forEach(item => {
    item.addEventListener('click', event => {
        input.value = selectedSeats;
    });
});

var reservedSeats = document.getElementById("reservedSeats").textContent;