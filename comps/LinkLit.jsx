import BorderLit from "./BorderLit"
import { Link } from "react-router-dom"

export default function LinkLit({children, to, style}){
    return <BorderLit style={{
        width: '25rem',
        borderRadius: '1rem',
        ...style
    }}>
        <Link to={to} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: '1rem 2.5rem 0.5rem 2.5rem',
            background: '#080808',
            borderRadius: '1rem',
            textDecoration: 'none'
        }}>

            {children}

        </Link>
    </BorderLit>
}