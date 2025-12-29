import Percentage from "./Percentage"
import Stat from "./Stat"
import LinkLit from "./LinkLit"

export default function BatchPrev({level, ix, word}){
    return <LinkLit to={`/batch?level=${level}&batch=${ix}`}>

        <h3>{ix + 1}. {word.split(' ')[0].replace('.', ' ' + word[word.length - 2] + ' ').toUpperCase()}</h3>

        <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            marginTop: '1rem',
            gap: '1.5rem'
        }}>
            <Stat>{0.9}</Stat>
            <Percentage className='lil-stat' blur={0.7} opacity={0.7}>{0.9}</Percentage>
        </div>

    </LinkLit>
}