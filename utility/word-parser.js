export default class WordParser{
    constructor(level, batch, text, pick_parser){
        const splited = text.split(/\r?\n|\r/)
        
        this.number_of_batches = parseInt(splited[0])
        this.batch = batch
        this.variants = splited[1].split(' ')

        this.words = []

        if (this.batch === -1){ // all
            for (let i = 2; i < splited.length; ++i){
                const split_ix = splited[i].lastIndexOf(' ')

                this.words.push([level, (i - 2) % this.number_of_batches, splited[i].slice(0, split_ix), splited[i].slice(split_ix + 1)])
            }
        }
        else if (this.batch === -2){ // worst
            this.words = pick_parser.getWorst(level)
        }
        else{ // normal
            for (let i = this.batch + 2; i < splited.length; i += this.number_of_batches){
                const split_ix = splited[i].lastIndexOf(' ')
                
                this.words.push([level, this.batch, splited[i].slice(0, split_ix), splited[i].slice(split_ix + 1)])
            }
        }
    }

    shuffle(){
        let currentIndex = this.words.length
        let randomIndex
        let temporary
    
        while (currentIndex !== 0){
            randomIndex = Math.floor(Math.random() * currentIndex)
            --currentIndex
    
            temporary = this.words[currentIndex]
            this.words[currentIndex] = this.words[randomIndex]
            this.words[randomIndex] = temporary
        }
    }

    pair(ix){
        return this.words[ix]
    }

    ended(ix){
        return ix >= this.words.length
    }
}