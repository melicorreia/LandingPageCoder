let nombreIngresado;
let edadIngresada;

do {
    nombreIngresado = prompt("Ingrese su nombre");
    edadIngresada = prompt ("Ingrese su edad");
    if (nombreIngresado == "" || edadIngresada == "") {
        alert("Complete todos los datos para continuar");
    }
} while (nombreIngresado == "" || edadIngresada == "")


if (edadIngresada >= 18) {
    alert("Hola" + " " + nombreIngresado + " " + "¡Bienvenido/a a nuestro sitio!" + " " + "Usted es mayor de edad, por lo tanto puede acceder a nuestro contenido");
    const claveCorrecta = "claveJs123";
let claveIngresada;

do {
    claveIngresada = prompt("Ingrese su clave para acceder: (Ayudita: la clave es claveJs123)").trim();
    if (claveIngresada !== claveCorrecta) {
        alert("Clave incorrecta, por favor intente nuevamente. Recuerde que el sistema distingue mayúsculas y minúsculas, no usar espacios ni símbolos.");
    }

    else if (claveIngresada == claveCorrecta) {
        alert ("Clave correcta, acceso habilitado");
    }
} while (claveIngresada !== claveCorrecta);
}
    
else if (edadIngresada < 18) {
    alert("Hola" + " " + nombreIngresado + " " + "¡Lo sentimos! Usted es menor de edad, por lo tanto no puede acceder a nuestro contenido");
    window.location.href = "https://www.youtube.com/watch?v=tW6QUJL8V24"; 
}













