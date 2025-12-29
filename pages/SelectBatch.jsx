import { useLocation } from "react-router-dom"

import BatchPrev from "../comps/BatchPrev"
import { useState, useRef, useEffect } from "react"
import LinkLit from "../comps/LinkLit"

export default function SelectType(){
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    const [is_batches, setIsBatches] = useState(false)
    const batches = useRef(null)
    const name = params.get('name')

    useEffect(() => {
        fetch(`./data/${name}.txt`)
        .then(res => res.text())
        .then(text => {
            if (batches.current) { return }

            const words = text.split('\n')
            const n = parseInt(words[0])

            setIsBatches(true)

            batches.current = words.slice(2, n + 2).map((word, i) => <BatchPrev key={i} level={name} ix={i} word={word}/>)
        })
    }, [])

    return <div className="bg" style={{
        justifyContent: 'center'
    }}>
        <div style={{
            display: 'flex',
            gap: '1.5rem'
        }}>
            <LinkLit to={`/batch?level=${name}&batch=-1`}><h3>ВСЕ</h3></LinkLit>
            <LinkLit to={`/batch?level=${name}&batch=-2`}><h3>СЛОЖНЫЕ</h3></LinkLit>
        </div>

        {is_batches && <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
            padding: '1.5rem'
        }}>
            {batches.current}
        </div>}
    </div>
}