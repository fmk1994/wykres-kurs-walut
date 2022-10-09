import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './Charts.css';

export default function Charts({
	setCodes,
	code,
	codes,
	table,
	startDate,
	endDate,
	dates,
	multipleValues,
	setMultipleValues,
	urls,
	setUrls,
	source,
	setSource,
	chartVisibility,
}) {
	useEffect(() => {
		setMultipleValues('');
		setCodes((prevCodes) => [...prevCodes, code.toString()]);
		setUrls((prevUrls) => [
			...prevUrls,
			`http://api.nbp.pl/api/exchangerates/rates/${table}/${code}/${startDate}/${endDate}/`,
		]);
	}, [code]);

	useEffect(() => {
		Promise.all(
			urls.map((url) => {
				axios
					.get(url)
					.then((response) => {
						response.data.rates.map((values) => {
							setMultipleValues((prevVal) => [...prevVal, values.mid]);
						});
					})
					.catch((error) => {
						alert(error);
					});
			})
		);
	}, [urls]);

	useEffect(() => {
		const replaceComma = (string, char, repl, n) => {
			let i = 1;
			return string.replace(new RegExp(char, 'g'), (c) => (i++ % n ? c : repl));
		};

		setSource(`
	https://image-charts.com/chart
	?cht=lc
	&chg=1,1
	&chdl=${codes.toString().replace(/,/g, '|')}
	&chdlp=b
	&chxr=1,${Math.min(...multipleValues)},${Math.max(...multipleValues)}
	&chxt=x,y
	&chxl=0:|${dates.toString().replace(/,/g, '|')}
	&chd=t:${
		multipleValues.length > 9
			? replaceComma(multipleValues.toString(), ',', '|', 5)
			: multipleValues
	}
	&chs=999x400
	`);
	}, [codes, multipleValues, dates]);

	return (
		<div className={!chartVisibility ? `Charts visible` : 'Charts hidden'}>
			<img src={source} alt='Charts' />
		</div>
	);
}
