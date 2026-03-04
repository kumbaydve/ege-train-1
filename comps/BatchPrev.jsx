import Percentage from "./Percentage"
import Stat from "./Stat"
import LinkLit from "./LinkLit"
import { useState, useRef, useEffect } from "react"
import PickPraser from "../utility/pick-parser"

export default function BatchPrev({level, batch, word}){
    const [stat_ready, setStatReady] = useState(false)
    const stat = useRef(null)

    useEffect(() => {
        const pick_parser = new PickPraser()
        stat.current = pick_parser.getStat(level, batch)
        
        setStatReady(true)
    }, [])

    return <LinkLit to={`/batch?level=${level}&batch=${batch}`}>

        <h3>{batch + 1}. {word.split(' ')[0].replace('.', ' ' + word.split(' ')[1] + ' ').toUpperCase()}</h3>

        <div className="flex items-center w-full mt-4 gap-6">
            {stat_ready && <Stat>{stat.current}</Stat>}
            {stat_ready && <Percentage className='lil-stat' blur={0.7} opacity={0.7}>{stat.current}</Percentage>}
        </div>

    </LinkLit>
}