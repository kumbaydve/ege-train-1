export default function WordPair({word, variants, pick, right}){
    const common_class = "px-16 py-5 rounded-2xl text-white text-4xl cursor-pointer relative max-w-dvw"

    return <div className="flex flex-wrap justify-center gap-6">
        <div
        onClick={() => pick(0)}
        className={common_class}
        style={{
            background: 'linear-gradient(135deg, #ffae00, #ff6600)'
        }}>
            
            <div className="absolute top-0 left-0 bottom-0 right-0 -z-1" style={{
                background: right === -1  ? '#ff660090' : (right === 0 ? '#00ff48' : '#ff0048'),
                filter: `blur(${right === -1 ? 2.5 : 5}rem)`,
                transition: 'all 0.2s ease'
            }}></div>

            {word.replace('.', ' ' + variants[0] + ' ')}

        </div>

        <div
        onClick={() => pick(1)}
        className={common_class}
        style={{
            background: 'linear-gradient(135deg, #5e00ff, #9d00ff)'
        }}>

            <div className="absolute top-0 left-0 bottom-0 right-0 -z-1" style={{
                background: right === -1 ? '#8c00ffa0' : (right === 1 ? '#00ff48' : '#ff0048'),
                filter: `blur(${right === -1 ? 2.5 : 5}rem)`,
                transition: 'all 0.2s ease'
            }}></div>

            {word.replace('.', ' ' + variants[1] + ' ')}

        </div>
    </div>
}