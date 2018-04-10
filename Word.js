const letter = require('./Letter.js');

exports.word = function(word){
    let w = word.split('');
    let currentGuessed = 0;
    let guessStatus = false;
    this.word = w.map(d => {
        return new letter.letter(d);
    });
    this.toString = function(){
        return this.word.map(i=>i.placeholder()).join('');
    }
    this.updateLetter = function(c){
        this.word.forEach(x=>{
            if(x.checkArgument(c)){
                currentGuessed++;
            }
        })
    }
    this.getCurrentGuessed = function(){
        return currentGuessed;
    }
    this.setGuessStatus = function(){
        if(word === this.toString()){
            guessStatus = true;
        }else{
            guessStatus = false;
        }
    }
    this.getGuessStatus = function(){
        return guessStatus;
    }
}