function seleccionarGanador() {
    const textarea = document.getElementById("participantes");
    const participantes = textarea.value.split("\n").filter(nombre => nombre.trim() !== "");

    if (participantes.length === 0) {
        Swal.fire({
            title: "Error",
            text: "Por favor, ingrese al menos un participante",
            confirmButtonText: "Aceptar"
        });
        return;
    }

    const indiceGanador = Math.floor(Math.random() * participantes.length);
    const ganador = participantes[indiceGanador];

    Swal.fire({
        title: "¡Felicidades!",
        text: `El ganador es: ${ganador} 👏`,
        footer: `Sorteo certificado por Lowin Picker`,
        imageUrl: "/img/celebracion.png",
        confirmButtonText: "Aceptar"
    });
}

const currentMode = localStorage.getItem('theme') || 'light';

if (currentMode === 'dark') {
document.body.classList.add('dark-mode');
} else {
document.body.classList.remove('dark-mode');
}

const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('change', () => {

const currentMode = document.body.classList.contains('dark-mode') ? 'light' : 'dark';

localStorage.setItem('theme', currentMode);

if (currentMode === 'dark') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}
});