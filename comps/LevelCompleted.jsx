import BASE_URL from "../utility/constants";
import LinkLit from "./LinkLit";

export default function LevelCompleted(){
    return <LinkLit to={BASE_URL} className='max-w-full'>
        <h3>Уровень пройден!</h3>
        <h4 className="text-gray-500 mt-2 mb-2">Нажмите, чтобы вернуца</h4>
    </LinkLit>
}