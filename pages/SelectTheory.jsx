import { useState, useEffect, useRef } from "react"
import LinkLit from "../comps/LinkLit"
import BASE_URL from "../utility/constants"

const titles_string = `№1. Виды слов
№22. Литературные приёмы`

export default function SelectTheory(){
    const [theory_ready, setTheoryReady] = useState(false)
    const theory = useRef(null)

    useEffect(() => {
        const titles = titles_string.split(/\r?\n|\r/)
        theory.current = titles.map((title) => <LinkLit to={`${BASE_URL}/theory?name=${title}`} className='text-white text-3xl' inner_style={{padding: '1rem 2.5rem'}} style={{width: 'fit-content'}}>{title}</LinkLit>)

        setTheoryReady(true)
    }, [])

    return <div className="bg p-6 gap-6">
        {theory_ready && theory.current}
    </div>
}