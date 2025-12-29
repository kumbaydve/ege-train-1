import Glare from "./Glare"

export default function Select({children, color, size}){
    const word = children[0].split('.')

    return <div style={{
        display: 'inline-block',
        zIndex: 1
    }}>
        <span style={{
            color: color ?? '#fff',
            fontSize: size ?? '1.4rem'
        }}>
            {word[0]}
        </span>
        
        <Glare blur={0.3} style={{
            margin: '0 0.2rem'
        }} text={{fontSize: size ?? '1.4rem'}}>{children[1].toUpperCase()}</Glare>

        <span style={{
            color: color ?? '#fff',
            fontSize: size ?? '1.4rem'
        }}>
            {word[1]}
        </span>
    </div>
}