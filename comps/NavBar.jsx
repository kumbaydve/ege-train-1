import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import BASE_URL from "../utility/constants"

const pages = [
    ['ТЕСТЫ', ''],
    ['ТЕОРИЯ', '/theory']
]

export default function NavBar({ix}){
    const [anchors_ready, setAnchorsReady] = useState(false)
    const anchors = useRef(null)

    useEffect(() => {
        anchors.current = pages.map((pair, i) => <Link to={BASE_URL + pair[1]} key={pair[0]} className={`text-2xl ${i === ix ? 'text-gray-200' : 'text-gray-400'}`}>{pair[0]}</Link>)

        setAnchorsReady(true)
    }, [])

    return <nav className="fixed w-full flex justify-center gap-10 p-2 backdrop-hue-rotate-180" style={{
        backdropFilter: 'blur(0.7rem) grayscale(0.3)'
    }}>
        {anchors_ready && anchors.current}
    </nav>
}