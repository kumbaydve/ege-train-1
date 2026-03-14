import { useContext, useRef } from 'react'
import { MouseContext } from '../App'

export default function BorderLit({children, style, className}){
    const mouse_pos = useContext(MouseContext)
    const self = useRef(null)

    return <div
    ref={self}
    className={'relative overflow-hidden ' + className}
    style={navigator.maxTouchPoints === 0 ? {
        padding: 0.8,
        ...style
    }
    :
    {
        border: 'solid 1px #777',
        ...style
    }}>

        {navigator.maxTouchPoints === 0 && <div
        className='absolute aspect-square -z-1 bg-gray-300 -translate-1/2'
        style={{
            top: mouse_pos[1] - (self.current ? self.current.getBoundingClientRect().top : 0) - window.scrollY,
            left: mouse_pos[0] - (self.current ? self.current.getBoundingClientRect().left : 0) - window.scrollX,
            width: 'calc(25vh + 25vw)',
            filter: 'blur(10rem)'
        }}></div>}

        {children}

    </div>
}