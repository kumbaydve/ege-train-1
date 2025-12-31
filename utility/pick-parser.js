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
            console.log('queried worst', level);
            if (!this.picks[level]){
                console.log('no level');
                return []
            }

            for (const batch in this.picks[level]){
                for (const word in this.picks[level][batch]){
                    const sum = this.picks[level][batch][word][0].reduce((was, e) => was + e)

                    if (sum < this.picks[level][batch][word][0].length){
                        got_wrong.push([sum, level, batch, word, this.picks[level][batch][word][1]])
                    }
                }
            }
        }
        else{
            for (const level_iter of this.picks){
                for (const batch of this.picks[level_iter]){
                    for (const word in this.picks[level_iter][batch]){
                        const sum = this.picks[level_iter][batch][word][0].reduce((was, e) => was + e)
        
                        if (sum < this.picks[level_iter][batch][word][0].length){
                            got_wrong.push([sum, level_iter, batch, word, this.picks[level_iter][batch][word][1]])
                        }
                    }
                }
            }
        }

        console.log('got wrong:', JSON.stringify(got_wrong));

        got_wrong.sort((a, b) => a[0] - b[0])
        got_wrong = got_wrong.slice(0, worst_picked_limit)
        got_wrong.map(e => e.shift())

        console.log(got_wrong);

        return got_wrong
    }

    getStat(level, batch){
        let successes = 0
        let total = 0
        
        if (level){
            if (!this.picks[level]){
                console.log(this.picks, level);
                console.log('level not spec');
                return 0
            }

            console.log('level spec');

            if (batch){
                if (!this.picks[level][batch]){
                    return 0
                }

                for (const word in this.picks[level][batch]){
                    successes += this.picks[level][batch][word][0].reduce((was, e) => was + e)

                    total += this.picks[level][batch][word][0].length
                }
            }
            else{
                for (const batch in this.picks[level]){
                    for (const word in this.picks[level][batch]){
                        console.log(word);
                        successes += this.picks[level][batch][word][0].reduce((was, e) => was + e)

                        total += this.picks[level][batch][word][0].length
                    }
                }
            }
        }
        else{
            for (const level in this.picks){
                for (const batch in this.picks[level]){
                    for (const word in this.picks[level][batch]){
                        successes += this.picks[level][batch][word][0].reduce((was, e) => was + e)

                        total += this.picks[level][batch][word][0].length
                    }
                }
            }
        }

        console.log(successes / total);

        return successes / total
    }

    update(level, batch, word, letter, pick){
        if (!this.picks[level]){
            this.picks[level] = {}
        }

        if (!this.picks[level][batch]){
            this.picks[level][batch] = {}
        }
        
        if (!this.picks[level][batch][word]){
            this.picks[level][batch][word] = [[], letter]
        }

        this.picks[level][batch][word][0].push(pick == letter ? 1 : 0)
        
        if (this.picks[level][batch][word][0].length > pick_save_limit){
            this.picks[level][batch][word][0].shift()
        }
    }

    save(){
        localStorage.setItem('picks', JSON.stringify(this.picks))
    }
}