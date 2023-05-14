textPlayerWins = ["you've saved the galaxy and all its inhabitants from certain doom. now you can finally go take a shower and wash off all that blaster smoke and wookiee fur.", "i'm pretty sure the ewoks are planning a parade in your honour right now. they even made you a life-sized statue made out of bantha fodder.", "well, well, well. looks like we've got a regular han solo on our hands. or maybe a princess leia. either way, i'm glad you're on our side.", "you did it! you saved the galaxy and made it back in time for happy hour at the mos eisley cantina. i'll buy you a round of blue milk to celebrate.", "you've done it! the galaxy is forever in your debt. and i'm pretty sure you've earned yourself a well-deserved vacation on tatooine or some other planet with two suns.", "i'm not sure who's more relieved - the rebels or me. i was starting to worry that i'd have to find a new job if you didn't win."]


function pickRandomLine(dilogueOption) {
    min = 0;
    max = dilogueOption.length;
    randomLineNum = Math.floor(Math.random() * (max - min) + min);

    return dilogueOption[randomLineNum]
}

console.log(pickRandomLine(textPlayerWins));