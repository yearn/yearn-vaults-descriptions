import	React		from	'react';
import	Link		from	'next/link';

function	Paragraph({paragraph, wrapperIndex}) {
	function	renderBold({text, index}) {
		return (<b key={`part_${wrapperIndex}_${index}`} className={'text-ygray-200'}>{text}</b>);
	}

	function	renderLink({text, index, href}) {
		if (href.startsWith('/')) {
			return (<a key={`part_${wrapperIndex}_${index}`} href={href} className={'cursor-pointer underline text-yblue'}>{text}</a>);
		}
		return (<a key={`part_${wrapperIndex}_${index}`} href={href} target={'_blank'} rel={'noreferrer'} className={'cursor-pointer underline text-yblue'}>{text}</a>);
	}

	function	renderLinkItalic({text, index, href}) {
		if (href.startsWith('/')) {
			return (<Link key={`part_${wrapperIndex}_${index}`} href={href} className={'cursor-pointer underline text-yblue italic'}>{text}</Link>);
		}
		return (<a key={`part_${wrapperIndex}_${index}`} href={href} target={'_blank'} rel={'noreferrer'} className={'cursor-pointer underline text-yblue italic'}>{text}</a>);
	}

	function	renderText({text, index}) {
		return (<p key={`part_${wrapperIndex}_${index}`} className={'text-ygray-200'}>{text}</p>);
	}

	function	renderSvg({text, index}) {
		return (
			<span
				key={`part_${wrapperIndex}_${index}`}
				dangerouslySetInnerHTML={{__html: text}} />
		);
	}

	return (
		<div className={'max-w-xl space-y-6 mb-6 inline-children'}>
			{paragraph.map(({text, style, type, href}, index) => {
				if (style === 'bold')
					return renderBold({text, index});
				if (style === 'link')
					return (renderLink({text, index, href}));
				if (style === 'link italic')
					return (renderLinkItalic({text, index, href}));
				if (type === 'svg')
					return renderSvg({text, index});
				return (renderText({text, index}));
			})}
		</div>
	);
}

export default Paragraph;
