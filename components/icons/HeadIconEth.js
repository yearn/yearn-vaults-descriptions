import	React							from	'react';

function	Icon({className}) {
	return (
		<svg className={className} width={'40'} height={'40'} viewBox={'0 0 40 40'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
			<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M40 20C40 17.3824 39.4792 14.7648 38.4776 12.3464C37.476 9.928 35.9932 7.7088 34.142 5.858C32.2912 4.0068 30.072 2.524 27.6536 1.5224C25.2352 0.5208 22.6176 0 20 0C17.3824 0 14.7648 0.5208 12.3464 1.5224C9.928 2.524 7.7088 4.0068 5.858 5.858C4.0068 7.7088 2.524 9.928 1.5224 12.3464C0.5208 14.7648 0 17.3824 0 20C0 22.6176 0.5208 25.2352 1.5224 27.6536C2.524 30.072 4.0068 32.2912 5.858 34.142C7.7088 35.9932 9.928 37.476 12.3464 38.4776C14.7648 39.4792 17.3824 40 20 40C22.6176 40 25.2352 39.4792 27.6536 38.4776C30.072 37.476 32.2912 35.9932 34.142 34.142C35.9932 32.2912 37.476 30.072 38.4776 27.6536C39.4792 25.2352 40 22.6176 40 20Z'} className={'text-yearn-blue dark:text-white'} fill={'currentcolor'} />
			<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M20.2347 5.83337L11.6667 19.9109L20.2347 24.9263L28.8045 19.9109L20.2347 5.83337Z'} className={'text-white dark:text-black'} fill={'currentcolor'} />
			<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M11.6667 21.5203L20.2347 33.4755L28.8092 21.5203L20.2347 26.5328L11.6667 21.5203Z'} className={'text-white dark:text-black'} fill={'currentcolor'} />
		</svg>
	);
}

export default Icon;
