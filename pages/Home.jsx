import OverallStat from '../comps/OverallStat';
import LevelPrevRows from '../comps/LevelPrevRows';
import Select from '../comps/Select';
import { useState, useRef, useEffect } from 'react';
import PickPraser from '../utility/pick-parser';

export default function Home(){
    const [worst_ready, setWorstReady] = useState(false)
    const worst = useRef(null)

    useEffect(() => {
        const pick_parser = new PickPraser()
        const worst_list = pick_parser.getWorst(null, 3)
        
        if (worst_list.length !== 0){
            worst.current = worst_list.map((word) => <Select size='1.7rem'>{word.slice(2)}</Select>)
        }

        setWorstReady(true)
    }, [])

    return <div className='bg'>
        <div className='text-red-600'>DEBUG {navigator.maxTouchPoints}</div>

        <OverallStat/>

        <div
        className='relative flex gap-6'
        style={{
            marginBottom: '13vh'
        }}>

            <div
            className='fill'
            style={{
                background: '#8c00ff70',
                transform: 'scale(1.1)',
                filter: 'blur(2.2rem)'
            }}></div>

            {worst_ready && worst.current}
            
        </div>

        <LevelPrevRows/>
    </div>
}