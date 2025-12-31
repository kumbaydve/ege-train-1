import OverallStat from '../comps/OverallStat';
import LevelPrevRows from '../comps/LevelPrevRows';
import Select from '../comps/Select';

export default function Home(){
    return <div className='bg'>
        <OverallStat/>

        <div style={{
            position: 'relative',
            display: 'flex',
            gap: '1.5rem',
            marginBottom: '13vh'
        }}>
            <div className='fill' style={{
                background: '#8c00ff70',
                transform: 'scale(1.1)',
                filter: 'blur(2.2rem)'
            }}></div>

            <Select size='1.7rem'>{['пр.велегия', 'и']}</Select>
            <Select size='1.7rem'>{['пр.чуда', 'и']}</Select>
            <Select size='1.7rem'>{['пр.вереда', 'и']}</Select>
        </div>

        <LevelPrevRows/>
    </div>
}