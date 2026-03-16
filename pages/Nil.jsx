import { memo } from "react";
import Glare from "../comps/Glare";

const Nil = memo(() => {
    return <div className="bg" style={{
        justifyContent: 'center'
    }}>
        <Glare
        text={{
            background: `linear-gradient(135deg, #ffd400, #ff6200)`,
            fontSize: '3rem',
            fontWeight: '700'
        }}>
            ТАКОГО НЕТ
        </Glare>
        <Glare
        blur={0.4}
        text={{
            background: `linear-gradient(135deg, #ffd400, #ff6200)`,
            fontSize: '1.5rem',
            fontWeight: '600'
        }}>
            ИДИТЕ НАЗАД
        </Glare>
    </div>
})

export default Nil