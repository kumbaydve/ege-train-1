import { useState, useRef, useEffect } from 'react'

import LevelPrev from './LevelPrev'

export default function LevelPrevRows(){
    const [is_levels, setIsLevels] = useState(false)
    const levels = useRef(null)

    useEffect(() => {
        fetch('./data/all.txt')
        .then(res => res.text())
        .then(text => {
            if (levels.current) { return }

            setIsLevels(true)

            levels.current = text.split(/\r?\n|\r/).map(name => {
                const level_name = name.split(' ')[0]
                
                return <LevelPrev key={level_name}>{level_name}</LevelPrev>
            })
        })
    }, [])

    return is_levels && <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '1.5rem'
    }}>
        {levels.current}
    </div>
}