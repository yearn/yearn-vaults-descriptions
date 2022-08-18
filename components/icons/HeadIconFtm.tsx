import	React, {ReactElement}		from	'react';

function	Icon (props: React.SVGProps<SVGSVGElement>): ReactElement {
	const defaultProps = {
		width: 40,
		height: 40
	};

	props = {...defaultProps, ...props};

	return (
		<svg {...props} viewBox={'0 0 40 40'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
			<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M40 20C40 17.3824 39.4792 14.7648 38.4776 12.3464C37.476 9.928 35.9932 7.7088 34.142 5.858C32.2912 4.0068 30.072 2.524 27.6536 1.5224C25.2352 0.5208 22.6176 0 20 0C17.3824 0 14.7648 0.5208 12.3464 1.5224C9.928 2.524 7.7088 4.0068 5.858 5.858C4.0068 7.7088 2.524 9.928 1.5224 12.3464C0.5208 14.7648 0 17.3824 0 20C0 22.6176 0.5208 25.2352 1.5224 27.6536C2.524 30.072 4.0068 32.2912 5.858 34.142C7.7088 35.9932 9.928 37.476 12.3464 38.4776C14.7648 39.4792 17.3824 40 20 40C22.6176 40 25.2352 39.4792 27.6536 38.4776C30.072 37.476 32.2912 35.9932 34.142 34.142C35.9932 32.2912 37.476 30.072 38.4776 27.6536C39.4792 25.2352 40 22.6176 40 20Z'} className={'text-neutral-300'} fill={'currentcolor'} />
			<path fillRule={'evenodd'} clipRule={'evenodd'} d={'M19.9916 6.25C19.5506 6.25 19.115 6.34774 18.7162 6.53613L12.0558 10.0447C11.8457 10.1379 11.6623 10.2823 11.5225 10.4645C11.3802 10.6498 11.2876 10.8683 11.2532 11.0991L11.25 11.1204V28.7852L11.2507 28.7951C11.2677 29.0444 11.3522 29.2846 11.4953 29.4898C11.6365 29.6922 11.8296 29.8532 12.0545 29.9556L18.706 33.4584L18.7176 33.4639C19.1164 33.6523 19.5519 33.75 19.993 33.75C20.4341 33.75 20.8697 33.6525 21.2685 33.4641L27.9304 29.9562C28.157 29.8551 28.3522 29.6952 28.4959 29.4933C28.6418 29.2884 28.7293 29.0478 28.7491 28.7972L28.75 28.7857L28.6746 10.8495C28.6244 10.7117 28.5529 10.582 28.4623 10.4653C28.3219 10.2847 28.1399 10.1406 27.9316 10.0455L21.2786 6.5416L21.2671 6.53613C20.8683 6.34774 20.4327 6.25 19.9916 6.25ZM13.2749 11.2473L19.4608 7.98869C19.6292 7.91727 19.8102 7.88048 19.993 7.88048C20.1758 7.88048 20.3567 7.91727 20.5252 7.98869L26.7108 11.2471L20.5248 14.5054C20.3564 14.5768 20.1755 14.6136 19.9926 14.6136C19.8098 14.6136 19.6289 14.5768 19.4605 14.5054L13.2749 11.2473ZM27.1131 18.1998L22.0622 15.5396L27.1125 12.8794L27.1131 18.1998ZM12.8858 18.1924V12.8868L17.9227 15.5396L12.8858 18.1924ZM26.7107 19.8322L20.8127 16.7259V22.9388L26.7107 19.8322ZM13.2749 19.8331L19.1732 16.7265L19.1726 22.9395L13.2749 19.8331ZM21.2685 24.5436L27.1128 21.4652L27.1131 28.5344L20.9511 31.7907L20.9439 31.7951C20.652 31.9713 20.3255 32.0816 19.9871 32.1185L19.8877 32.1122C19.5732 32.0492 19.2718 31.9319 18.9972 31.7652L18.9893 31.7604L12.8852 28.5629V21.4725L18.706 24.5379L18.7176 24.5434C19.1164 24.7318 19.5519 24.8295 19.993 24.8295C20.4341 24.8295 20.8697 24.732 21.2685 24.5436Z'} className={'text-neutral-900'} fill={'currentcolor'} />

		</svg>
	);
}

export default Icon;
