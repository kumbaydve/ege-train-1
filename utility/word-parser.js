export default class WordParser{
    constructor(text, start_from, pick_parser, level){
        const splited = text.split(/\r?\n|\r/)

        this.number_of_batches = parseInt(splited[0])
        this.start_from = start_from
        this.variants = splited[1]

        this.pairs = []

        if (start_from === -1){ // all
            for (let i = 2; i < splited.length; ++i){
                this.pairs.push(splited[i].split(' '))
            }
        }
        else if (start_from === -2){ // worst
            this.pairs = pick_parser.getWorst(level)
        }
        else{ // normal
            const delta = parseInt(splited[0])

            for (let i = this.start_from + 2; i < splited.length; i += delta){
                this.pairs.push(splited[i].split(' '))
            }
        }
    }

    shuffle(){
        let currentIndex = this.pairs.length
        let randomIndex
        let temporary
    
        while (currentIndex !== 0){
            randomIndex = Math.floor(Math.random() * currentIndex)
            --currentIndex
    
            temporary = this.pairs[currentIndex]
            this.pairs[currentIndex] = this.pairs[randomIndex]
            this.pairs[randomIndex] = temporary
        }
    }

    pair(ix){
        return this.pairs[ix]
    }

    ended(ix){
        return ix >= this.pairs.length
    }
}