const pick_save_limit = 3

export default class PickPraser{
    constructor(){
        this.picks = {}

        const local_picks = localStorage.getItem('picks')

        if (local_picks){
            this.picks = JSON.parse(local_picks)
        }
    }

    getWorst(level, worst_picked_limit=10){
        let got_wrong = []

        if (level){
            if (!this.picks[level]){
                this.picks[level] = {}
            }

            for (const word in this.picks[level]){
                const sum = this.picks[level][word][0].reduce((was, e) => was + e)

                if (sum < this.picks[level][word][0].length){
                    got_wrong.push([sum, word, this.picks[level][word][1]])
                }
            }
        }
        else{
            for (const level_iter of this.picks){
                for (const word in this.picks[level_iter]){
                    const sum = this.picks[level_iter][word][0].reduce((was, e) => was + e)
    
                    if (sum < this.picks[level_iter][word][0].length){
                        got_wrong.push([sum, word, this.picks[level_iter][word][1]])
                    }
                }
            }
        }

        got_wrong.sort((a, b) => a[0] - b[0])
        got_wrong = got_wrong.slice(0, worst_picked_limit)
        got_wrong.map(e => e.shift())

        return got_wrong
    }

    getStat(level, batch){
        if (level){
            if (batch){
                
            }
        }
    }

    update(level, word, letter, pick){
        if (!this.picks[level]){
            this.picks[level] = {}
        }

        if (!this.picks[level][word]){
            this.picks[level][word] = [[], letter]
        }

        this.picks[level][word][0].push(pick == letter ? 1 : 0)
        
        if (this.picks[level][word][0].length > pick_save_limit){
            this.picks[level][word][0].shift()
        }
    }

    save(){
        localStorage.setItem('picks', JSON.stringify(this.picks))
    }
}