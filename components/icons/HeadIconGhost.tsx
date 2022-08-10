import	React, {ReactElement}		from	'react';

function	Icon (props: React.SVGProps<SVGSVGElement>): ReactElement {
	const defaultProps = {
		width: 40,
		height: 40
	};

	props = {...defaultProps, ...props};

	return (
		<svg {...props} viewBox={'0 0 40 40'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
			<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M20 1.66699C11.7167 1.66699 5 8.29602 5 16.4742V38.3337L10 35.1605L15 38.3337L20 35.1605L25 38.3337L30 35.1605L35 38.3337V16.4742C35 8.29602 28.285 1.66699 20 1.66699ZM14.1667 18.4725C12.785 18.4725 11.6667 17.4474 11.6667 16.1809C11.6667 14.9144 12.785 13.8892 14.1667 13.8892C15.5483 13.8892 16.6667 14.9144 16.6667 16.1809C16.6667 17.4474 15.5483 18.4725 14.1667 18.4725ZM23.3333 16.1809C23.3333 17.4474 24.4517 18.4725 25.8333 18.4725C27.215 18.4725 28.3333 17.4474 28.3333 16.1809C28.3333 14.9144 27.215 13.8892 25.8333 13.8892C24.4517 13.8892 23.3333 14.9144 23.3333 16.1809Z'} fill={'currentcolor'}/>
		</svg>
	);
}

export default Icon;
