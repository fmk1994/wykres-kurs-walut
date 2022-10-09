import React, { useState, useCallback } from 'react';
import './Search.css';

export default function Search({
	setValues,
	setDates,
	allCodes,
	codes,
	code,
	setCode,
	chartVisibility,
	setChartVisibility,
}) {
	const [searchValue, setSearchValue] = useState('');
	const handleVisibility = () => {
		setChartVisibility(!chartVisibility);
	};

	const handleSearchValue = (e) => {
		setSearchValue(e.target.value);
	};
	const fillSearch = useCallback((e) => {
		setSearchValue(e.target.innerText);
		document.getElementById('code').value = e.target.innerText;
	});
	const handleSearch = useCallback((e) => {
		e.preventDefault();
		if (!allCodes.toString().includes(searchValue)) {
			alert('wrong code!');
			document.getElementById('code').value = '';
			setSearchValue('');
			return;
		} else if (
			code.toString().includes(searchValue) ||
			codes.toString().includes(searchValue)
		) {
			document.getElementById('code').value = '';
			setSearchValue('');
			return;
		} else {
			setDates([]);
			setValues([]);
			setCode(document.getElementById('code').value.toUpperCase());
			document.getElementById('code').value = '';
			setSearchValue('');
		}
	});
	return (
		<div className='Search'>
			<div className='Search-container'>
				<form className='Search-form'>
					<input
						className='Search-form-input'
						type='search'
						id='code'
						name='code'
						onChange={handleSearchValue}
						placeholder='ENTER CURRENCY CODE'
					/>
					<button className='Search-button button' onClick={handleSearch}>
						SEARCH
					</button>
				</form>
				<button className='Visibility-button button' onClick={handleVisibility}>
					{chartVisibility ? 'MULTI CHART' : 'SINGLE CHART'}
				</button>
			</div>
			<ul className='list'>
				{allCodes
					.filter((currency) =>
						currency.toLowerCase().includes(searchValue.toLowerCase())
					)
					.map((currency, idx) => (
						<li key={idx} onClick={fillSearch} className='listItem'>
							{currency}
						</li>
					))}
			</ul>
		</div>
	);
}
