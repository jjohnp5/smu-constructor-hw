exports.letter = function(s){
    this.val = s;
    this.guessed = false;
    this.placeholder = function(){
        return this.guessed ? this.val : "_";
    }
    this.checkArgument = function(j){
        if(!this.guessed){
            if(this.val.toLowerCase() === j.toLowerCase()){
                this.guessed = true
                return true;
            }else{
                this.guessed = false
                return false;
            }
        }
        return false;
    }
}