import { useContext, useRef } from 'react'
import { MouseContext } from '../App'

export default function BorderLit({children, style, className}){
    const mouse_pos = useContext(MouseContext)
    const self = useRef(null)

    return <div
    ref={self}
    className={'relative overflow-hidden ' + className}
    style={{
        padding: 0.8,
        ...style
    }}>

        <div
        className='absolute aspect-square'
        style={{
            top: mouse_pos[1] - (self.current ? self.current.getBoundingClientRect().top : 0) - window.scrollY,
            left: mouse_pos[0] - (self.current ? self.current.getBoundingClientRect().left : 0) - window.scrollX,
            width: 'calc(25vh + 25vw)',
            background: '#fff',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(10rem)',
            zIndex: -1
        }}></div>

        {children}

    </div>
}