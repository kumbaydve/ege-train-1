export default function Card({children, lt, r, pick}){
	return <div className={`card ${lt ? 'lt' : 'r'}`} onClick={pick}>
		{children}
	</div>
}