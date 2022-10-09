import './App.css';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import Search from './Search';
import Chart from './Chart';
import Charts from './Charts';
let todayDate = new Date();
let endTime = new Date(todayDate.getTime() - 6 * 24 * 60 * 60 * 1000);
let endDate = `${todayDate.toISOString().split('T', 1)[0]}`;
let startDate = `${endTime.toISOString().split('T', 1)[0]}`;
let table = 'A';

function App() {
	const [urls, setUrls] = useState([]);
	const [code, setCode] = useState(['EUR']);
	const [codes, setCodes] = useState([]);
	const [dates, setDates] = useState([]);
	const [values, setValues] = useState([]);
	const [multipleValues, setMultipleValues] = useState([]);
	const [allCodes, setAllCodes] = useState([]);
	const [singleChartSource, setSingleChartSource] = useState('');
	const [source, setSource] = useState('');
	const [chartVisibility, setChartVisiblity] = useState(true);

	useEffect(() => {
		axios
			.get(`http://api.nbp.pl/api/exchangerates/tables/${table}/`)
			.then((response) => {
				console.log(response.data);
				response.data[0].rates.map((rate) => {
					setAllCodes((prevCodes) => [...prevCodes, rate.code]);
				});

				console.log(allCodes);
			})
			.catch((error) => alert(error));
	}, []);
	console.log(allCodes);
	return (
		<div className='App'>
			<h1>Wykres tygodniowy kursu złotego</h1>
			<Search
				chartVisibility={chartVisibility}
				setChartVisibility={setChartVisiblity}
				code={code}
				setCode={setCode}
				codes={codes}
				setValues={setValues}
				setDates={setDates}
				allCodes={allCodes}
			/>

			<Chart
				chartVisibility={chartVisibility}
				singleChartSource={singleChartSource}
				setSingleChartSource={setSingleChartSource}
				code={code}
				table={table}
				startDate={startDate}
				endDate={endDate}
				values={values}
				dates={dates}
				setValues={setValues}
				setDates={setDates}
			/>
			<Charts
				chartVisibility={chartVisibility}
				source={source}
				setSource={setSource}
				urls={urls}
				setUrls={setUrls}
				code={code}
				codes={codes}
				setCodes={setCodes}
				table={table}
				endDate={endDate}
				startDate={startDate}
				dates={dates}
				multipleValues={multipleValues}
				setMultipleValues={setMultipleValues}
			/>
		</div>
	);
}

export default App;
