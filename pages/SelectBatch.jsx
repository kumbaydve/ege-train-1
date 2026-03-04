import { useLocation } from "react-router-dom"

import BatchPrev from "../comps/BatchPrev"
import { useState, useRef, useEffect } from "react"
import LinkLit from "../comps/LinkLit"

export default function SelectType(){
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    const [batches_ready, setBatchesReady] = useState(false)
    const batches = useRef(null)
    const name = params.get('name')

    useEffect(() => {
        fetch(`./data/${name}.txt`)
        .then(res => res.text())
        .then(text => {
            const words = text.split(/\r?\n|\r/)
            const n = parseInt(words[0])

            batches.current = words.slice(2, n + 2).map((word, i) => <BatchPrev key={i} level={name} batch={i} word={word}/>)
            
            setBatchesReady(true)
        })
    }, [])

    return <div
    className="bg"
    style={{
        justifyContent: 'center'
    }}>
        <div className="flex gap-6">
            <LinkLit to={`/batch?level=${name}&batch=-1`}><h3>ВСЕ</h3></LinkLit>
            <LinkLit to={`/batch?level=${name}&batch=-2`}><h3>СЛОЖНЫЕ</h3></LinkLit>
        </div>

        {batches_ready && <div className="flex flex-wrap justify-center gap-6 p-6">
            {batches.current}
        </div>}
    </div>
}