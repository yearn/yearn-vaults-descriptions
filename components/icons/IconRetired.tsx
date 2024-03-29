import	React, {ReactElement}		from	'react';

function	Icon (props: React.SVGProps<SVGSVGElement>): ReactElement {
	const defaultProps = {
		width: 32,
		height: 32
	};

	props = {...defaultProps, ...props};

	return (
		<svg {...props} viewBox={'0 0 32 32'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
			<circle cx={'16'} cy={'16'} r={'16'} fill={'#C4C4C4'}/>
			<path d={'M22.8178 13.3003H25.5965C26.3565 13.3003 26.9707 13.9042 26.9707 14.6503C26.9707 15.3964 26.3556 16.0004 25.5956 16.0004H17.8335L21.957 9.70011H19.1784C18.4184 9.70011 17.8033 9.09619 17.8033 8.35006C17.8033 7.60393 18.4184 7 19.1784 7H27.0009L22.8178 13.3003Z'} fill={'black'}/>
			<path d={'M11.7876 21.4006H16.0009C17.013 21.4006 17.8344 22.207 17.8344 23.2007C17.8344 24.1943 17.013 25.0007 16.0009 25.0007H5.03028L11.0469 16.0004H6.83352C5.82143 16.0004 5.00003 15.1939 5.00003 14.2003C5.00003 13.2067 5.82143 12.4002 6.83352 12.4002H17.8647L11.7876 21.4006Z'} fill={'black'}/>
		</svg>
	);
}

export default Icon;
