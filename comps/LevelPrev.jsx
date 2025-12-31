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

        <h3>{children.toUpperCase().replace('_', ' / ')}</h3>
        
        <div style={{
            display: 'flex',
            //flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'center',
            columnGap: '1rem',
            marginTop: '2rem',
            marginBottom: '0.5rem',
            padding: '0 1rem',
            width: '100%'
        }}>
                <Select color='#ccc' size='1.25rem'>{['пр.велегия', 'и']}</Select>
                <Select color='#ccc' size='1.25rem'>{['пр.велегия', 'и']}</Select>
                <Select color='#ccc' size='1.25rem'>{['пр.велегия', 'и']}</Select>

        </div>

        <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: '1.5rem'
        }}>
            { stat_ready && <Stat>{stat.current}</Stat> }
            { stat_ready && <Percentage className='lil-stat' blur={0.7} opacity={0.7} style={{alignSelf: 'flex-end'}}>{stat.current}</Percentage> }
        </div>
    </LinkLit>
}