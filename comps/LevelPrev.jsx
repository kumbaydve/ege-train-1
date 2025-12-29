import Percentage from "./Percentage";
import Select from "./Select";
import Stat from "./Stat";
import LinkLit from './LinkLit';

export default function LevelPrev({children}){
    return <LinkLit to={`/type?name=${children}`}>

        <h3>{children.toUpperCase().replace('_', ' / ')}</h3>
        
        <div style={{
            display: 'flex',
            //flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'center',
            columnGap: '1rem',
            marginTop: '2rem',
            marginBottom: '0.5rem',
            padding: '0 1rem',
            width: '100%'
        }}>
                <Select color='#ccc' size='1.25rem'>{['пр.велегия', 'и']}</Select>
                <Select color='#ccc' size='1.25rem'>{['пр.велегия', 'и']}</Select>
                <Select color='#ccc' size='1.25rem'>{['пр.велегия', 'и']}</Select>

        </div>

        <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: '1.5rem'
        }}>
        <Stat>{0.9}</Stat>
        <Percentage className='lil-stat' blur={0.7} opacity={0.7} style={{alignSelf: 'flex-end'}}>{0.9}</Percentage>
        </div>
    </LinkLit>
}