document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById('game-container');
    const ball = document.getElementById('ball');
    const goal = document.getElementById('goal');
    const containerWidth = gameContainer.clientWidth;
    const containerHeight = gameContainer.clientHeight;
    const ballSize = 50; // Diameter van bal en doel

    // Plaats de bal en het doel op willekeurige posities binnen het game-container
    function placeRandomly(element) {
        const x = Math.floor(Math.random() * (containerWidth - ballSize));
        const y = Math.floor(Math.random() * (containerHeight - ballSize));
        element.style.top = y + 'px';
        element.style.left = x + 'px';
    }

    placeRandomly(ball);
    placeRandomly(goal);

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
                ballTop = Math.min(ballTop + 10, containerHeight - ballSize);
                break;
            case 'ArrowLeft':
                ballLeft = Math.max(ballLeft - 10, 0);
                break;
            case 'ArrowRight':
                ballLeft = Math.min(ballLeft + 10, containerWidth - ballSize);
                break;
        }

        ball.style.top = ballTop + 'px';
        ball.style.left = ballLeft + 'px';

        // Controleer winvoorwaarde
        if (checkCollision(ball, goal)) {
            alert('Gefeliciteerd! Je hebt gewonnen!');
            resetGame();
        }

        // Controleer verliesvoorwaarde
        if (isOutOfBounds(ball)) {
            alert('Helaas! Je hebt verloren. Probeer het opnieuw.');
            resetGame();
        }

        // Controleer of de bal de rand van het game-container raakt
        if (checkContainerCollision(ball)) {
            alert('Helaas! Je hebt verloren. Probeer het opnieuw.');
            resetGame();
        }
    });

    // Controleer of de bal buiten het game-container is
    function isOutOfBounds(ball) {
        const ballRect = ball.getBoundingClientRect();
        const containerRect = gameContainer.getBoundingClientRect();

        return (
            ballRect.top < containerRect.top ||
            ballRect.bottom > containerRect.bottom ||
            ballRect.left < containerRect.left ||
            ballRect.right > containerRect.right
        );
    }

    // Controleer of de bal de rand van het game-container raakt
    function checkContainerCollision(ball) {
        const ballRect = ball.getBoundingClientRect();
        const containerRect = gameContainer.getBoundingClientRect();

        return (
            ballRect.top <= containerRect.top ||
            ballRect.bottom >= containerRect.bottom ||
            ballRect.left <= containerRect.left ||
            ballRect.right >= containerRect.right
        );
    }

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
        placeRandomly(ball);
        placeRandomly(goal);
    }
});
