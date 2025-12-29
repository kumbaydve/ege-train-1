import { useState, useRef, useEffect } from 'react'

import Shader from './Shader'
import Percentage from './Percentage'

export default function OverallStat(){
    const [is_shader, setIsShader] = useState(false)
    const shader = useRef(null)

    useEffect(() => {
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
        
        <Percentage className='overall-stat' style={{ position: 'absolute' }}>{1}</Percentage>

    </div>
}