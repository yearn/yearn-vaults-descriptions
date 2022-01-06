import	React				from	'react';
import	Image				from	'next/image';
import	Link				from	'next/link';
import	IconEth				from	'components/icons/IconEth';
import	IconYearn			from	'components/icons/IconYearn';
import	IconRocket			from	'components/icons/IconRocket';
import	useLocalization		from	'contexts/useLocalization';
import	{parseMarkdown}		from	'utils';

function	Index() {
	const	{common} = useLocalization();

	return (
		<section>
			<div className={'w-full mt-10 md:mt-20 pt-2'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<IconEth />
					</div>
					<h1 className={'text-4xl md:text-6xl text-ygray-100 dark:text-white font-bold mb-8'}>
						{common['yearn-and-curve-eth-vault-title']}
					</h1>
					<div className={'max-w-xl space-y-6 mb-8'}>
						<p className={'text-ygray-200 dark:text-dark-50'}>
							{common['yearn-and-curve-eth-vault-description']}
						</p>
					</div>
				</div>

				<div className={'flex flex-col mt-16'}>
					<div className={'mb-8 flex flex-row items-center'}>
						<IconYearn />
						<svg className={'mx-4 text-ygray-100 dark:text-dark-50'} width={'32'} height={'34'} viewBox={'0 0 32 34'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
							<path d={'M20.6875 12.5312H31.9688V20.6875H20.6875V33.4375H12.0938V20.6875H0.78125V12.5312H12.0938V0.3125H20.6875V12.5312Z'} fill={'currentcolor'}/>
						</svg>
						<Image
							src={'/CRV.png'}
							width={40}
							height={40}
							loading={'eager'} />
					</div>
					<h1 className={'text-4xl md:text-6xl text-ygray-100 dark:text-white font-bold mb-8'}>
						{common['yearn-and-curve-synergy-title']}
					</h1>
					<div className={'max-w-xl mb-8'}>
						<p
							className={'text-ygray-200 dark:text-dark-50 whitespace-pre-line inline'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['yearn-and-curve-synergy-description'])}} />
						<IconRocket className={'inline mb-1 ml-2'} />
						<p
							className={'text-ygray-200 dark:text-dark-50 whitespace-pre-line inline mt-6'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['yearn-and-curve-synergy-description-next'])}} />
					</div>
				</div>

				<div className={'flex flex-col mt-16'}>
					<div className={'mb-8 flex flex-row items-center h-10 w-10'}>
						<Image
							src={'/yveCRV.png'}
							width={40}
							height={40}
							loading={'eager'} />
					</div>
					<h1 className={'text-4xl md:text-6xl text-ygray-100 dark:text-white font-bold mb-6 whitespace-pre-line'}>
						{common['yearn-and-curve-yveCRV-title']}
					</h1>
					<i className={'text-ygray-200 dark:text-dark-50 mb-8'}>
						{common['yearn-and-curve-yveCRV-subtitle']}
					</i>

					<div className={'max-w-xl w-full mb-8'}>
						<p
							className={'text-ygray-200 dark:text-dark-50 whitespace-pre-line inline mt-6'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['yearn-and-curve-yveCRV-description'])}} />
					</div>
					<div>
						<Link href={'/curve-boost-multipliers'}>
							<button className={'text-white bg-yblue py-2 px-5 text-left font-bold text-sm'} style={{width: 279}}>
								{common['yearn-and-curve-next-button']}
							</button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Index;
