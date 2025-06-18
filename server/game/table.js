const seats = [null, null, null, null, null];

function assignSeat(username) {
    for (let i = 0; i < seats.length; i++) {
        if (seats[i] === null) {
            seats[i] = {
                username,
                hand: [],
                balance: 1000,
                score: 0,
                hasStood: false,
                hasBusted: false,
                hasBlackjack: false,
            };
        return i;
    }
    }
return null; // no seats available
}

function clearSeat(index) {
    seats[index] = null;
}

export { seats, assignSeat, clearSeat };