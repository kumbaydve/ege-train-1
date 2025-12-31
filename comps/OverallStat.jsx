import { useState, useRef, useEffect } from 'react'

import Shader from './Shader'
import Percentage from './Percentage'
import PickPraser from '../utility/pick-parser'

export default function OverallStat(){
    const [is_shader, setIsShader] = useState(false)
    const shader = useRef(null)
    const stat = useRef(null)

    useEffect(() => {
        const pick_parser = new PickPraser()
        stat.current = pick_parser.getStat()

        fetch('./data/shader.glsl')
        .then(res => res.text())
        .then(text => {
            if (shader.current) { return }
            
            setIsShader(true)
            console.log('Stat loaded');

            shader.current = <Shader style={{
                width: '100%',
                height: '100%'
            }}>{text}</Shader>}
        )
    }, [])

    return <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%',
        marginTop: '5vh',
        aspectRatio: 2.5
    }}>

        { is_shader && shader.current }
        
        { stat.current && <Percentage className='overall-stat' style={{ position: 'absolute' }}>{stat.current}</Percentage> }

    </div>
}