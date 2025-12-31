import { useLocation } from "react-router-dom"

import { useState, useRef, useEffect } from "react"
import PickPraser from "../utility/pick-parser"
import WordParser from "../utility/word-parser"
import WordPair from "../comps/WordPair"

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
        fetch(`./data/${level}.txt`)
        .then(res => res.text())
        .then(text => {
            pick_parser.current = new PickPraser()
            word_parser.current = new WordParser(level, batch, text, pick_parser.current)

            word_parser.current.shuffle()

            setIx(0)
        })
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
            <h1>... ПОДОЖДИТЕ ...</h1>
            :
            (
                ix === word_parser.current.words.length ?
                <h1 className="text-white text-5xl">ВСЁ</h1>
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