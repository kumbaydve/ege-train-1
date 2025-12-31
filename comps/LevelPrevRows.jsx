import { useState, useRef, useEffect } from 'react'

import LevelPrev from './LevelPrev'

export default function LevelPrevRows(){
    const [levels_ready, setLevelsReady] = useState(false)
    const levels = useRef(null)

    useEffect(() => {
        fetch('./data/all.txt')
        .then(res => res.text())
        .then(text => {
            setLevelsReady(true)

            levels.current = text.split(/\r?\n|\r/).map(name => {
                const level_name = name.split(' ')[0]
                
                return <LevelPrev key={level_name}>{level_name}</LevelPrev>
            })
        })
    }, [])

    return levels_ready && <div className='flex flex-wrap justify-center gap-6 p-6'>
        {levels.current}
    </div>
}