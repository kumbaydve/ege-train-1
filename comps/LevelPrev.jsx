import Percentage from "./Percentage";
import Select from "./Select";
import Stat from "./Stat";
import LinkLit from './LinkLit';
import { useRef } from "react";
import { useEffect } from "react";
import PickPraser from "../utility/pick-parser";
import { useState } from "react";

export default function LevelPrev({children}){
    const [stat_ready, setStatReady] = useState(false)
    const stat = useRef(null)

    useEffect(() => {
        const pick_parser = new PickPraser()
        stat.current = pick_parser.getStat(children)
        setStatReady(true)
    }, [])

    return <LinkLit to={`/type?name=${children}`}>

        <h3 className="font-bold">{children.toUpperCase().replace('_', ' / ')}</h3>
        
        <div className="flex flex-wrap justify-center mt-8 mb-2 w-full" style={{
            columnGap: '1rem',
            padding: '0 1rem'
        }}>
            <Select color='#ccc' size='1.25rem'>{['пр.велегия', 'и']}</Select>
            <Select color='#ccc' size='1.25rem'>{['пр.велегия', 'и']}</Select>
            <Select color='#ccc' size='1.25rem'>{['пр.велегия', 'и']}</Select>
        </div>

        <div className="flex items-center w-full gap-6">
            { stat_ready && <Stat>{stat.current}</Stat> }
            { stat_ready && <Percentage className='lil-stat' blur={0.7} opacity={0.7} style={{alignSelf: 'flex-end'}}>{stat.current}</Percentage> }
        </div>
    </LinkLit>
}