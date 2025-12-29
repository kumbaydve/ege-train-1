import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { createContext, useState, useEffect } from 'react';
import Home from "./pages/Home";
import SelectBatch from './pages/SelectBatch';
import Batch from './pages/Batch';

export const MouseContext = createContext([-1, -1])

export default function App(){
	const [mouse_pos, setMousePos] = useState([-1, -1])

	useEffect(() => {
		const handleMouseMove = event => {
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
				<Route path='/' element={<Home/>}/>

				<Route path='/type' element={<SelectBatch/>}/>
				<Route path='/batch' element={<Batch/>}/>

				{/* <Route path='*' element={<Nil/>}/> */}
			</Routes>

		</MouseContext.Provider>
	</Router>
}