import Percentage from "./Percentage";
import Select from "./Select";
import Stat from "./Stat";
import LinkLit from './LinkLit';
import { useRef } from "react";
import { useEffect } from "react";
import PickPraser from "../utility/pick-parser";
import { useState } from "react";
import BASE_URL from "../utility/constants";

export default function LevelPrev({children}){
    const [stat_ready, setStatReady] = useState(false)
    const stat = useRef(null)
    const words = useRef(null)

    useEffect(() => {
        const pick_parser = new PickPraser()
        stat.current = pick_parser.getStat(children)
        const worst = pick_parser.getWorst(children, 3)
        
        if (worst.length !== 0){
            words.current = worst.map((word) => <Select key={word} color='#ccc' size='1.25rem'>{word.slice(2)}</Select>)
        }
        else{
            words.current = <h4 className="text-gray-500">Неправильных слов нет</h4>
        }

        setStatReady(true)
    }, [])

    return <LinkLit to={`${BASE_URL}/type?name=${children}`}>

        <h3 className="font-bold">{children.toUpperCase().replace('_', ' / ')}</h3>
        
        <div className="flex flex-wrap justify-center mt-8 mb-2 w-full" style={{
            columnGap: '1rem',
            padding: '0 1rem'
        }}>
            {stat_ready && words.current}
        </div>

        <div className="flex items-center w-full gap-6">
            {stat_ready && <Stat>{stat.current}</Stat>}
            {stat_ready && <Percentage className='lil-stat' blur={0.7} opacity={0.7} style={{alignSelf: 'flex-end'}}>{stat.current}</Percentage>}
        </div>
    </LinkLit>
}