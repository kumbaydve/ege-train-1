import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { createContext, useState, useEffect } from 'react';
import Home from "./pages/Home";
import SelectBatch from './pages/SelectBatch';
import Batch from './pages/Batch';
import BASE_URL from './utility/constants';
import Nil from './pages/Nil';
import SelectTheory from './pages/SelectTheory';
import Theory from './pages/Theory';

export const MouseContext = createContext([-1, -1])

export default function App(){
	const [mouse_pos, setMousePos] = useState([-1, -1])

	useEffect(() => {
		const handleMouseMove = (event) => {
			setMousePos([event.pageX, event.pageY])
		}

		window.addEventListener('mousemove', handleMouseMove)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

	return <Router>
		<MouseContext.Provider value={mouse_pos}>

			<Routes>
				<Route path={BASE_URL} element={<Home/>}/>

				<Route path={`${BASE_URL}/type`} element={<SelectBatch/>}/>
				<Route path={`${BASE_URL}/batch`} element={<Batch/>}/>
				<Route path={`${BASE_URL}/select-theory`} element={<SelectTheory/>}/>
				<Route path={`${BASE_URL}/theory`} element={<Theory/>}/>

				<Route path='*' element={<Nil/>}/>
			</Routes>

		</MouseContext.Provider>
	</Router>
}