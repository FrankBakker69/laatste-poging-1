document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById('game-container');

    // Functie om een willekeurige positie binnen het game-container te krijgen
    function getRandomPosition() {
        const containerWidth = gameContainer.clientWidth;
        const containerHeight = gameContainer.clientHeight;
        const size = 50; // Diameter van bal en doel

        const x = Math.floor(Math.random() * (containerWidth - size));
        const y = Math.floor(Math.random() * (containerHeight - size));

        return { x, y };
    }

    // Plaats de bal en het doel op willekeurige posities binnen het game-container
    const ball = document.getElementById('ball');
    const goal = document.getElementById('goal');

    const ballPosition = getRandomPosition();
    const goalPosition = getRandomPosition();

    ball.style.top = ballPosition.y + 'px';
    ball.style.left = ballPosition.x + 'px';

    goal.style.top = goalPosition.y + 'px';
    goal.style.left = goalPosition.x + 'px';

    // Voeg event listener toe voor balbeweging
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        const ballStyle = getComputedStyle(ball);
        let ballLeft = parseInt(ballStyle.left);
        let ballTop = parseInt(ballStyle.top);

        switch (key) {
            case 'ArrowUp':
                ballTop = Math.max(ballTop - 10, 0);
                break;
            case 'ArrowDown':
                ballTop = Math.min(ballTop + 10, gameContainer.clientHeight - 50);
                break;
            case 'ArrowLeft':
                ballLeft = Math.max(ballLeft - 10, 0);
                break;
            case 'ArrowRight':
                ballLeft = Math.min(ballLeft + 10, gameContainer.clientWidth - 50);
                break;
        }

        ball.style.top = ballTop + 'px';
        ball.style.left = ballLeft + 'px';

        // Controleer winvoorwaarde
        if (checkCollision(ball, goal)) {
            alert('Gefeliciflapchinees! Je hebt gewonnen!');
            resetGame();
        }
    });

    // Controleer of er een botsing is tussen de bal en het doel
    function checkCollision(ball, goal) {
        const ballRect = ball.getBoundingClientRect();
        const goalRect = goal.getBoundingClientRect();
        return !(ballRect.right < goalRect.left ||
                 ballRect.left > goalRect.right ||
                 ballRect.bottom < goalRect.top ||
                 ballRect.top > goalRect.bottom);
    }

    // Reset het spel door de bal en het doel opnieuw te positioneren
    function resetGame() {
        const ballPosition = getRandomPosition();
        const goalPosition = getRandomPosition();

        ball.style.top = ballPosition.y + 'px';
        ball.style.left = ballPosition.x + 'px';

        goal.style.top = goalPosition.y + 'px';
        goal.style.left = goalPosition.x + 'px';
    }
});
