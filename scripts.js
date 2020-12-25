
const points = {2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 10, Q: 10, K: 10, A: 11}


function Player(status, money) {
    this.status = status;
    this.money = money;
    this.cards = [];
    this.points = 0;
    this.take = function(deck){
        this.cards.push(deck.getCard());
        this.countPoints();
        console.log('Player took cards');
        console.log(this.cards);
        console.log(this.points);
    }
    this.stop = function(){
        
    }
    this.countPoints = function() {
        let aces = 0;
        this.points = 0;
        this.cards.forEach(element => { // element = {number: 5, symbol: aguri}
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
}

function Deck() {
    this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    this.symbols = ['aguri', 'guli', 'jvari', 'kvavi'];
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
        console.log('cards built');
        console.log(this.cards);
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
        console.log('cards shuffled');
        console.log(this.cards);
    }
    this.getCard = function(){
        return this.cards.pop();
    }
}



function checkWin(p1, p2) {
    if(p1.points > 21) {
        console.log('p2 won');
        return;
    }
    if(p2.points > 21) {
        console.log('p1 won');
        return;
    } 
    if(p1.points >= p2.points) {
        console.log('p1 won')
    } else {
        console.log('p2 won');
    }
}

let dealer = new Player('Dealer', 1000000);
let player = new Player('Player', 1000);
let deck = new Deck();

deck.build();
deck.shuffle();