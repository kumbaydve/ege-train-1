import { useLocation } from "react-router-dom"

import BatchPrev from "../comps/BatchPrev"
import { useState, useRef, useEffect } from "react"
import LinkLit from "../comps/LinkLit"

const word_sets = {
    'пре_при': `2
е и
пр.вратный е
пр.грешение е
пр.имущество е
пр.исподняя е
пр.клонный е
пр.кращение е
пр.небрежение е
пр.подавать е
пр.поднести е
пр.проводить е
пр.следовать е
пр.словутый е
пр.смыкаться е
пр.стол е
пр.баутка и
пр.вередливый и
пр.видение и
пр.гожий и
пр.знание и
пр.каз и
пр.ключение и
пр.лежный и
пр.личие и
пр.мета и
пр.митивный и
пр.оритет и
пр.скорбный и
пр.чудливый и`,
    'н_нн': `4
н нн
багря.ый н
верчё.ый парень н
ветре.ый н
воро.ой н
гости.ая н
жёва.ый н
зелё.ый н
клёва.ый н
кова.ый н
конче.ый н
крещё.ый н
муче.ик н
назва.ый брат н
писа.ая красавица н
посажё.ый отец н
прида.ое н
прощё.ое воскресенье н
пря.ый н
пудре.ица н
пья.ый н
ране.ый н
роже.ица н
румя.ый н
сангви.ик н
серебре.ик (монета) н
сви.ой (и другие притяжательные) н
смышлё.ый н
суже.ый н
труже.ик н
ю.ый н
ядрё.ый н
бесприда.ица нн
блаже.ый нн
венча.ый нн
виде.ый нн
деревя.ый нн
жела.ый нн
жема.ый нн
завеща.ый нн
казнё.ый нн
медле.ый нн
невида.ый нн
негада.ый нн
недюжи.ый нн
нежда.ый нн
неожида.ый нн
неслыха.ый нн
нечая.ый нн
обеща.ый нн
окая.ый нн
оловя.ый нн
отчая.ый нн
повере.ый в делах нн
подли.ый нн
преда.ый нн
рождё.ый нн
самонадея.ый нн
свяще.ый нн
слыша.ый нн
ставле.ик нн
стекля.ый нн
стра.ый нн`
}

export default function SelectType(){
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    const [batches_ready, setBatchesReady] = useState(false)
    const batches = useRef(null)
    const name = params.get('name')

    useEffect(() => {
        const text = word_sets[name]
        const words = text.split(/\r?\n|\r/)
        const n = parseInt(words[0])

        batches.current = words.slice(2, n + 2).map((word, i) => <BatchPrev key={i} level={name} batch={i} word={word}/>)
            
        setBatchesReady(true)
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