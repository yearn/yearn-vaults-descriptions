import	React, {ReactElement}		from	'react';

function	Icon (props: React.SVGProps<SVGSVGElement>): ReactElement {
	const defaultProps = {
		width: 40,
		height: 40
	};

	props = {...defaultProps, ...props};

	return (
		<svg {...props} viewBox={'0 0 48 40'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
			<path d={'M37.6341 14.6H43.1912C44.7111 14.6 45.9395 15.8078 45.9395 17.3C45.9395 18.7922 44.7093 20 43.1894 20H27.6659L35.9126 7.4H30.3555C28.8356 7.4 27.6054 6.1922 27.6054 4.7C27.6054 3.2078 28.8356 2 30.3555 2H46L37.6341 14.6Z'} fill={'currentcolor'}/>
			<path d={'M15.5746 30.8H24.0009C26.025 30.8 27.6677 32.4128 27.6677 34.4C27.6677 36.3872 26.025 38 24.0009 38H2.0605L14.0932 20H5.66682C3.64274 20 2 18.3872 2 16.4C2 14.4128 3.64274 12.8 5.66682 12.8H27.7282L15.5746 30.8Z'} className={'text-primary-500'} fill={'currentcolor'}/>
		</svg>
	);
}

export default Icon;
