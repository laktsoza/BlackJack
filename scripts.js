
const points = {2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 10, Q: 10, K: 10, A: 11}


function Player(status, money, elemendId) {
    this.status = status;
    this.money = money;
    this.cards = [];
    this.points = 0;
    this.cardSpace = document.getElementById(elemendId);

    this.take = function(deck){
        let lastCard = deck.getCard();
        this.cards.push(lastCard);
        this.countPoints();
        this.showCard(lastCard);
    }
    this.stop = function(){
        
    }
    this.countPoints = function() {
        let aces = 0;
        this.points = 0;
        this.cards.forEach(element => { 
            let point = points[element.number];

            if(element.number == 'A') {
                aces++;
            } 
            this.points += point;
            while(this.points > 21 && aces > 0) {
                this.points -= 10;
                aces--;
            }
            
        });
    }
    this.showCard = function(card){
        let img = document.createElement('img');
        img.src = './images/png/' + card.number + card.symbol + '.png';
        this.cardSpace.appendChild(img);
    }
}

function Deck() {
    this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    this.symbols = ['D', 'H', 'S', 'C'];
    this.cards = [];
    this.build = function(){
        for(let i = 0; i < this.values.length; i++){
            for(let k = 0; k < this.symbols.length; k++){
                let obj = {};
                obj.number = this.values[i];
                obj.symbol = this.symbols[k];
                this.cards.push(obj);
            }
        }
        
    }

    this.shuffle = function() {
        let shuffledCards = [];
        while (this.cards.length){
            let randomIndex = Math.floor((Math.random() * this.cards.length));
            shuffledCards.push(this.cards[randomIndex]);
            this.cards[randomIndex] = this.cards[this.cards.length - 1];
            this.cards.pop();
        }
        this.cards = shuffledCards;
    }
    this.getCard = function(){
        return this.cards.pop();
    }
}



let player1 = new Player('Player', 1000, 'card-space1');
let player2 = new Player('Dealer', 1000, 'card-space2');

let deck = new Deck();

deck.build();
deck.shuffle();

setTimeout(() => {
    player1.take(deck);
    player2.take(deck);
}, 1000);
setTimeout(() => {
    player1.take(deck);
    player2.take(deck);
}, 2000);

const takeBtn1 = document.getElementById('btn1');
const stopBtn1 = document.getElementById('stop1');

const takeBtn2 = document.getElementById('btn2');
const stopBtn2 = document.getElementById('stop2');

stopBtn1.addEventListener('click', () => {
    takeBtn1.style.display = 'none';
    stopBtn1.style.display = 'none';
    takeBtn2.style.display = 'inline-block';
    stopBtn2.style.display = 'inline-block';
});

stopBtn2.addEventListener('click', () => {
    takeBtn2.style.display = 'none';
    stopBtn2.style.display = 'none';
    endGame();
})


takeBtn1.addEventListener('click', () => {
    player1.take(deck);
    if(player1.points > 20) {
        if(player1.points > 21) {
            endGame();
        } else {
            takeBtn1.style.display = 'none';
            stopBtn1.style.display = 'none';
        }
        
    }
});
takeBtn2.addEventListener('click', () => {
    player2.take(deck);
    if(player2.points > 20) {
        if(player2.points > 21) {
            endGame();
        } else {
            takeBtn2.style.display = 'none';
            stopBtn2.style.display = 'none';
            takeBtn2.style.display = 'inline-block';
            stopBtn2.style.display = 'inline-block';
        }
    }
});

function endGame() {
    const center = document.querySelector('.center');
    const p = center.children[0];
    if(player1.points > 21) {
        p.textContent = 'player2 won';
    } else {
        if(player2.points > 21) {
            p.textContent = 'pkayer1 won';
        } else {
            if(player1.points >= player2.points) {
                p.textContent = 'player1 won'
            } else {
                p.textContent = 'player2 won';
            }
        } 
    }
    
    let a = document.createElement('a');
    a.href = '';
    a.textContent = 'new game';
    center.appendChild(a);

    takeBtn1.style.display = 'none';
    takeBtn2.style.display = 'none';
    stopBtn1.style.display = 'none';
    stopBtn2.style.display = 'none';
}

