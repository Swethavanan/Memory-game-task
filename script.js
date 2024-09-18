document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.flip-card-game');
    const restartButton = document.querySelector('.restart');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;

    // Shuffle cards on page load
    shuffleCards();

    // Restart button functionality
    restartButton.addEventListener('click', () => {
        resetBoard();
        shuffleCards();
    });

    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.style.transform = 'rotateY(180deg)';

        if (!hasFlippedCard) {
            // First card 
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        // Second card 
        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        // Compare data attributes of the flipped cards
        let isMatch = firstCard.querySelector('img').src === secondCard.querySelector('img').src;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedPairs++;

        if (matchedPairs === cards.length / 2) {
            setTimeout(() => alert('You won🥳✨!'), 400); 
        }

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.style.transform = 'rotateY(0deg)';
            secondCard.style.transform = 'rotateY(0deg)';
            resetBoard();
        }, 800);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function shuffleCards() {
        const container = document.querySelector('.container');
        matchedPairs = 0;
        cards.forEach(card => {
            card.style.transform = 'rotateY(0deg)';
            card.addEventListener('click', flipCard);
        });
        for (let i = container.children.length; i >= 0; i--) {
            container.appendChild(container.children[Math.random() * i | 0]);
        }
    }
});