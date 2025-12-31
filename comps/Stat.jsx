export default function Stat({children}){
    return <div className="relative w-full h-1.5 rounded-2xl overflow-hidden">
        <div
        className="fill"
        style={{
            background: '#444'
        }}></div>

        <div className="absolute top-0 left-0 bottom-0 rounded-2xl" style={{
            width: `${children * 100}%`,
            background: '#fff'
        }}></div>
    </div>
}