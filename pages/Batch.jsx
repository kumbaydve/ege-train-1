import { useLocation } from "react-router-dom"

import { useState, useRef, useEffect } from "react"
import PickPraser from "../utility/pick-parser"
import WordParser from "../utility/word-parser"
import WordPair from "../comps/WordPair"
import LevelCompleted from "../comps/LevelCompleted"

const word_sets = {
    'пре_при': `2
е и
пр.вратный е
пр.грешение е
пр.имущество е
пр.исподняя е
пр.клонный е
пр.кращение е
пр.небрежение е
пр.подавать е
пр.поднести е
пр.проводить е
пр.следовать е
пр.словутый е
пр.смыкаться е
пр.стол е
пр.баутка и
пр.вередливый и
пр.видение и
пр.гожий и
пр.знание и
пр.каз и
пр.ключение и
пр.лежный и
пр.личие и
пр.мета и
пр.митивный и
пр.оритет и
пр.скорбный и
пр.чудливый и`,
    'н_нн': `4
н нн
багря.ый н
верчё.ый парень н
ветре.ый н
воро.ой н
гости.ая н
жёва.ый н
зелё.ый н
клёва.ый н
кова.ый н
конче.ый н
крещё.ый н
муче.ик н
назва.ый брат н
писа.ая красавица н
посажё.ый отец н
прида.ое н
прощё.ое воскресенье н
пря.ый н
пудре.ица н
пья.ый н
ране.ый н
роже.ица н
румя.ый н
сангви.ик н
серебре.ик (монета) н
сви.ой (и другие притяжательные) н
смышлё.ый н
суже.ый н
труже.ик н
ю.ый н
ядрё.ый н
бесприда.ица нн
блаже.ый нн
венча.ый нн
виде.ый нн
деревя.ый нн
жела.ый нн
жема.ый нн
завеща.ый нн
казнё.ый нн
медле.ый нн
невида.ый нн
негада.ый нн
недюжи.ый нн
нежда.ый нн
неожида.ый нн
неслыха.ый нн
нечая.ый нн
обеща.ый нн
окая.ый нн
оловя.ый нн
отчая.ый нн
повере.ый в делах нн
подли.ый нн
преда.ый нн
рождё.ый нн
самонадея.ый нн
свяще.ый нн
слыша.ый нн
ставле.ик нн
стекля.ый нн
стра.ый нн`
}

export default function SelectType(){
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    const [ix, setIx] = useState(-1)
    const [right, setRight] = useState(-1)
    const animating = useRef(false)
    
    const level = params.get('level')
    const batch = parseInt(params.get('batch'))

    const pick_parser = useRef(null)
    const word_parser = useRef(null)

    useEffect(() => {
        const text = word_sets[level]

        pick_parser.current = new PickPraser()
        word_parser.current = new WordParser(level, batch, text, pick_parser.current)

        word_parser.current.shuffle()

        setIx(0)
    }, [])

    const next = () => {
        setIx(was => was + 1)
        setRight(-1)

        animating.current = false
    }

    const pick = (i) => {
        if (animating.current) {return}
        
        if (word_parser.current.pair(ix)[3] == word_parser.current.variants[i]){
            setTimeout(next, 300)
        }
        else{
            if (i === 1) {setRight(0)}
            else {setRight(1)}

            setTimeout(next, 1200)
        }

        animating.current = true
        pick_parser.current.update(level, word_parser.current.pair(ix)[1], word_parser.current.pair(ix)[2], word_parser.current.pair(ix)[3], word_parser.current.variants[i])
        
        if (word_parser.current.ended(ix + 1)){
            pick_parser.current.save()
        }
    }

    return <div
    className='bg'
    style={{
        justifyContent: 'center'
    }}>
        {
            ix === -1 ?
            <h1>...ПОДОЖДИТЕ...</h1>
            :
            (
                ix === word_parser.current.words.length ?
                <LevelCompleted/>
                :
                <WordPair
                word={word_parser.current.pair(ix)[2]}
                variants={word_parser.current.variants}
                pick={pick}
                right={right}/>
            )
        }
    </div>
}