import {ReservasService} from "./js/reservasService";

//Inicializamos array de reservas
let reservas = [];

//Creamos el evento click para registrar la reserva
document.getElementById("btRegistrar").addEventListener("click", regitrarReserva);

function regitrarReserva(event){
    event.preventDefault();

    //Limpiamos los estilos sobre los errores de validación
    limpiarErrores();

    //Recogemos el formulario
    let form = document.getElementsByTagName("form")[0]
    
    //Recogemos los campos
    let nombre = form.querySelector("#nombre").value;
    let apellido = form.querySelector("#apellido").value;
    let telefono = Math.trunc(Number(form.querySelector("#telefono").value));
    let email = form.querySelector("#email").value;
    let dias = form.querySelector("#dias").value;
    let habitacion = form.querySelector("#selectHabitaciones").value;

    //Lo guardamos en un objeto
    let reserva = {
        nombre: nombre,
        apellido: apellido, 
        telefono: telefono,
        email: email,
        dias: dias,
        habitacion: habitacion,
        precio: 0
    }

    //Validamos los campos
    if(validarDatos(reserva)){
        
        //Añadimos el objeto al array de reservas
        reservas.push(reserva);
        ReservasService.addReserva(reserva).then(() => {
            //Imprimimos las reservas
            imprimirReserva();
        });
    
    }

}

function validarDatos(reserva){
    let validado = true;

    document.querySelector("#nombre").classList.remove("error");

    if(reserva.nombre == ""){
        document.querySelector("#nombre").classList.add("error");
        validado = false;
    }

    if(reserva.apellido == ""){
        document.querySelector("#apellido").classList.add("error");
        validado = false;
    }

    if(reserva.telefono == "" || isNaN(reserva.telefono)){
        document.querySelector("#telefono").classList.add("error");
        validado = false;
    }

    if(reserva.email == ""){
        document.querySelector("#email").classList.add("error");
        validado = false;
    }

    if(reserva.dias < 1){
        document.querySelector("#dias").classList.add("error");
        validado = false;
    }

    if(reserva.habitacion == "individual"){
        reserva.precio = reserva.dias * 50;
    } else if(reserva.habitacion == "doble") {
        reserva.precio = reserva.dias * 90;
    } else {
        reserva.precio = reserva.dias * 150;
    }
    
    if(validado){
        return true;
    } else{
        return false;
    }

}

function limpiarErrores(){
    let form = document.getElementsByTagName("form")[0]
    let inputs = form.getElementsByTagName("input")
   
    for (let i = 0; i < inputs.length - 1; i++) {
        inputs[i].classList.remove("error");
        
    }
    
}

function imprimirReserva(){
    
    let containerRegistros = document.querySelector(".containerRegistros");
    let imprimir = "";

    for (let i = 0; i < reservas.length; i++) 
    {
        imprimir += `<p>Nombre: ${reservas[i].nombre} - Apellido: ${reservas[i].apellido} - Telefono: ${reservas[i].telefono} - Email: ${reservas[i].email} - Número de días: ${reservas[i].dias} - Habitación: ${reservas[i].habitacion} - Total: ${reservas[i].precio}$ </p>`
    }

    containerRegistros.innerHTML = imprimir;
}