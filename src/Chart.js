import React, { useEffect } from 'react';
import './Chart.css';
import axios from 'axios';

export default function Chart({
	code,
	table,
	startDate,
	endDate,
	values,
	dates,
	setValues,
	setDates,
	setSingleChartSource,
	singleChartSource,
	chartVisibility,
}) {
	useEffect(() => {
		axios
			.get(
				`http://api.nbp.pl/api/exchangerates/rates/${table}/${code}/${startDate}/${endDate}/`
			)
			.then((response) => {
				response.data.rates.forEach((day) => {
					setDates((prevDates) => [...prevDates, day.effectiveDate]);
					setValues((prevValues) => [...prevValues, day.mid]);
				});
			})

			.catch((error) => {
				alert(error);
			});
	}, [code]);
	useEffect(() => {
		setSingleChartSource(`
		https://image-charts.com/chart
		?cht=lc
		&chg=1,1
		&chdl=${code}
		&chdlp=b
		&chxr=1,${`${Math.min(...values)},${Math.max(...values)}`}
		&chxt=x,y
		&chxl=0:|${dates.toString().replace(/,/g, '|')}
		&chd=t:${values}
		&chs=999x400
		`);
	}, [values, code, dates]);

	return (
		<div className={chartVisibility ? `Chart visible` : 'Chart hidden'}>
			<img src={singleChartSource} alt='Chart' />
		</div>
	);
}
