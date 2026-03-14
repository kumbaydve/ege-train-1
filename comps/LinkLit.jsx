import BorderLit from "./BorderLit"
import { Link } from "react-router-dom"

export default function LinkLit({children, to, style}){
    return <BorderLit className='max-w-dvw' style={{
        width: '25rem',
        borderRadius: '1rem',
        ...style
    }}>
        <Link to={to} className="flex flex-col items-center w-full h-full rounded-2xl decoration-0 max-w-dvw" style={{
            padding: '1rem 2.5rem 0.5rem 2.5rem',
            background: '#080808'
        }}>
            {children}
        </Link>
    </BorderLit>
}