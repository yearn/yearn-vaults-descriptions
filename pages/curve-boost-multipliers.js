import	React				from	'react';
import	Link				from	'next/link';
import	Image				from	'next/image';
import	HeadIconRocket		from	'components/icons/HeadIconRocket';
import	useLocalization		from	'contexts/useLocalization';
import	{parseMarkdown}		from	'utils';

function	Index() {
	const	{common} = useLocalization();

	return (
		<article className={'p-4 w-full bg-white dark:bg-black rounded-sm'}>
			<div className={'w-full'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<HeadIconRocket width={40} height={40} className={'text-yearn-blue dark:text-white'}/>
					</div>
					<h1 className={'mb-8 text-4xl font-bold text-dark-blue-1 dark:text-white whitespace-pre-line md:text-6xl'}>
						{common['curve-boost-title']}
					</h1>
					<div className={'mb-8 w-full max-w-full'}>
						<p
							className={'inline text-gray-blue-1 dark:text-gray-3 whitespace-pre-line'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['curve-boost-description'])}} />
					</div>
				</div>
			</div>

			<div className={'w-full'}>
				<div className={'flex flex-col'}>
					<div className={'w-full max-w-full'}>
						<Image
							src={'/calculator.jpeg'}
							objectFit={'cover'}
							width={675}
							height={60} />
					</div>
					<div className={'my-8 max-w-xl'}>
						<p
							className={'inline text-gray-blue-1 dark:text-gray-3 whitespace-pre-line'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['curve-boost-description-next'])}} />
					</div>
				</div>
			</div>

			<div className={'w-full'}>
				<div className={'self-center md:self-auto'}>
					<Link href={'/ethereum/stables'}>
						<button className={'button-large button-filled'}>
							{common['curve-boost-next-button']}
						</button>
					</Link>
				</div>
			</div>
		</article>
	);
}

export default Index;
