export default function Stat({children}){
    return <div style={{
        position: 'relative',
        width: '100%',
        height: '0.4rem',
        borderRadius: '0.2rem',
        overflow: 'hidden'
    }}>
        <div className="fill" style={{
            background: '#444'
        }}></div>

        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: `${children * 100}%`,
            borderRadius: '0.2rem',
            background: '#fff'
        }}></div>
    </div>
}