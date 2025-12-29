import { useContext, useRef } from 'react'
import { MouseContext } from '../App'

export default function BorderLit({children, style}){
    const mouse_pos = useContext(MouseContext)
    const self = useRef(null)

    return <div ref={self} style={{
        position: 'relative',
        padding: 0.8,
        overflow: 'hidden',
        ...style
    }}>

        <div style={{
            position: 'absolute',
            top: mouse_pos[1] - (self.current ? self.current.getBoundingClientRect().top : 0) - window.scrollY,
            left: mouse_pos[0] - (self.current ? self.current.getBoundingClientRect().left : 0) - window.scrollX,
            width: 'calc(25vh + 25vw)',
            aspectRatio: 1,
            background: '#fff',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(10rem)',
            zIndex: -1
        }}></div>

        {children}

    </div>
}