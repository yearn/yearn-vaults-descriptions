import	React, {ReactElement}				from	'react';
import	Image				from	'next/image';
import	Link				from	'next/link';
import	HeadIconYearn		from	'components/icons/HeadIconYearn';
import	useLocalization		from	'contexts/useLocalization';
import	{parseMarkdown}		from	'utils';

function	Index(): ReactElement {
	const	{common} = useLocalization();

	return (
		<article className={'rounded-default w-full bg-neutral-0 p-4'}>
			<div className={'w-full'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8 flex flex-row items-center'}>
						<HeadIconYearn />
						<svg className={'mx-4 text-neutral-700'} width={'32'} height={'34'} viewBox={'0 0 32 34'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
							<path d={'M20.6875 12.5312H31.9688V20.6875H20.6875V33.4375H12.0938V20.6875H0.78125V12.5312H12.0938V0.3125H20.6875V12.5312Z'} fill={'currentcolor'}/>
						</svg>
						<Image
							src={'/CRV.png'}
							width={40}
							height={40}
							loading={'eager'} />
					</div>
					<h1 className={'mb-8 whitespace-pre-line text-4xl font-bold text-neutral-900 md:text-6xl'}>
						{common['yearn-and-curve-synergy-title']}
					</h1>
					<div className={'mb-8 w-full max-w-full'}>
						<p
							className={'inline whitespace-pre-line text-neutral-700'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['yearn-and-curve-synergy-description'])}} />
						<p
							className={'mt-6 inline whitespace-pre-line text-neutral-700'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['yearn-and-curve-synergy-description-next'])}} />
					</div>
				</div>
			</div>

			<div className={'w-full'}>
				<div className={'flex flex-col'}>
					<div className={'mb-6 flex flex-row items-center'}>
						<div className={'mr-4 h-10 w-10'}>
							<Image
								src={'/yveCRV.png'}
								width={40}
								height={40}
								loading={'eager'} />
						</div>
						<div>
							<h1 className={'title'}>
								{common['yearn-and-curve-yveCRV-title']}
							</h1>
						</div>
					</div>

					<i className={'text-neutral-700'}>
						{common['yearn-and-curve-yveCRV-subtitle']}
					</i>
					<div className={'mt-2 w-full max-w-full'}>
						<p
							className={'mt-6 inline whitespace-pre-line text-neutral-700'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['yearn-and-curve-yveCRV-description'])}} />
					</div>
				</div>
			</div>

			<div className={'mt-16 w-full'}>
				<div className={'self-center md:self-auto'}>
					<Link href={'/curve-boost-multipliers'}>
						<button data-variant={'filled'} className={'button-large yearn--button'}>
							{common['yearn-and-curve-next-button']}
						</button>
					</Link>
				</div>
			</div>
		</article>
	);
}

export default Index;
