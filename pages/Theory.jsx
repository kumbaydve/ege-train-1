import { memo } from "react"
import { useLocation } from "react-router-dom"

const lessons = {
    '№1. Виды слов': t1,
    '№22. Литературные приёмы': t2
}

function t1(){
    return <div className="lesson-container">
        <h1>№1. Виды слов</h1>
        <br/>
        <h2>Местоимения:</h2>
        <ul>
            <li>Личные: я, ты, мы</li>
            <li>Возвратное: себя</li>
            <li>Притяжательные (чей?): мой, твой, наш</li>
            <li>Указательные: тот, этот, такой, таков</li>
            <li>Вопросительные: кто? что? какой?</li>
            <li>Относительные: кто, что, какой</li>
            <li>Определительные: каждый, любой, другой</li>
            <li>Неопределённые: нЕкто, нЕчто</li>
            <li>Отрицательные: никтО, ничтО</li>
        </ul>
        <br/>
        <h2>Частицы:</h2>
        <ul>
            <li>Условное наклонение: бы, б</li>
            <li>Повелительное наклонение: давай, пусть</li>
            <li>Вопросительные: ли, разве, неужели</li>
            <li>Указательные: вот, вон</li>
            <li>Уточнительные: именно, как раз</li>
            <li>Усилительные: даже, ни, же, ведь, всё-таки</li>
            <li>Сомнительные: вряд ли, едва ли</li>
            <li>Ограничительные: только, лишь, почти</li>
            <li>Смягчительная: -ка</li>
            <li>Отрицательные: не, ни</li>
            <li>Образовательные: -то, -либо, -нибудь, кое-</li>
        </ul>
    </div>
}

function t2(){
    return <div className="lesson-container">
        <h1>№22. Литературные приёмы</h1>
        <br/>
        <p>Пока нет</p>
    </div>
}

const Theory = memo(() => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    const name = params.get('name')

    return <div className="bg text-black text-2xl p-6" style={{background: 'white'}}>{lessons[name]()}</div>
})

export default Theory