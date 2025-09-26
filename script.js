document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendar-grid');
    let totalSquares = 24; // Número de casillas para el calendario (puedes aumentar este número)

    for (let i = 1; i <= totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.textContent = i;

        // Agregar la casilla al grid
        calendarGrid.appendChild(square);
    }
});
