export default function Glare({style, className, children, text, blur, opacity}){
	const common_style = {
		color: '#fff',
		background: 'var(--grad-text)',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent'
	}

	return <div className="relative inline-block" style={style}>
		
		<span className={'absolute select-none ' + className} style={{
			...common_style,
			filter: `blur(${blur !== undefined ? blur : 1.1}rem)`,
			opacity: opacity !== undefined ? opacity : .9,
			...text
		}}>{children}</span>

		<span className={'relative ' + className} style={{
			...common_style,
			...text
		}}>{children}</span>
	
	</div>
}