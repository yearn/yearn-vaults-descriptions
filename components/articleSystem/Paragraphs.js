import	React		from	'react';
import	Link		from	'next/link';
import	Image		from	'next/image';
import	Paragraph	from	'components/articleSystem/Paragraph';

function	Paragraphs({paragraphs}) {
	return (
		paragraphs.map((paragraph, index) => {
			if (paragraph?.[0]?.type === 'image') {
				const imgData = paragraph[0];
				return (
					<div
						key={`paragraph_${index}`}
						className={'max-w-full mb-6'}
						style={{width: imgData.width, height: imgData.height}}>
						<Image
							src={imgData.src}
							objectFit={'cover'}
							width={imgData.width}
							height={imgData.height} />
					</div>
				);
			}
			if (paragraph?.[0]?.type === 'button') {
				const buttonData = paragraph[0];
				if ((buttonData.href).startsWith('/')) {
					return (
						<div key={`paragraph_${index}`}>
							<Link href={buttonData.href}>
								<button className={'text-white bg-yblue py-2 px-5 text-left font-bold text-sm'} style={{width: 279}}>
									{buttonData.text}
								</button>
							</Link>
						</div>
					);
				}
				return (
					<div key={`paragraph_${index}`}>
						<a href={buttonData.href} target={'_blank'} rel={'noreferrer'}>
							<button className={'text-white bg-yblue py-2 px-5 text-left font-bold text-sm'} style={{width: 279}}>
								{buttonData.text}
							</button>
						</a>
					</div>
				);
			}
			return (
				<Paragraph
					key={`paragraph_${index}`}
					paragraph={paragraph}
					wrapperIndex={index} />
			);
		})
	);
}

export default Paragraphs;
