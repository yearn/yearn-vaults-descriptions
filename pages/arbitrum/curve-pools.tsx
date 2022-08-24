import	React, {ReactElement}			from	'react';
import	Link							from	'next/link';
import	Image							from	'next/image';
import	Vaults							from	'components/Vaults';
import	useLocalization					from	'contexts/useLocalization';
import	{listVaultsWithStrategies}		from	'pages/api/vaults';
import {TVaultWithStrats} 				from 'types/index';
import	{parseMarkdown}					from	'utils';

const	chainExplorer = 'https://arbiscan.io/';

function	Index({vaults}: {vaults: TVaultWithStrats[]}): ReactElement {
	const	{common} = useLocalization();

	return (
		<section className={'w-full rounded-sm bg-white p-4 dark:bg-black'}>
			<div className={'w-full'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<Image
							src={'/CRV.png'}
							width={40}
							height={40}
							loading={'eager'} />
					</div>
					<h1 className={'text-dark-blue-1 mb-8 whitespace-pre-line text-4xl font-bold dark:text-white md:text-6xl'}>
						{common['page-arb-curve-pool-title']}
					</h1>
					<div className={'mb-8 w-full max-w-full'}>
						<p
							className={'text-gray-blue-1 dark:text-gray-3 inline whitespace-pre-line'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['page-arb-curve-pool-description'])}} />
					</div>
				</div>
			</div>
			<div className={'w-full'}>
				{vaults.map((vault): ReactElement => <Vaults key={vault.address} vault={vault} chainExplorer={chainExplorer} />)}
			</div>
			<div className={'w-full'}>
				<div className={'mt-8 self-center md:self-auto'}>
					<Link href={'/arbitrum/defi-tokens'}>
						<button data-variant={'filled'}  className={'button-large yearn--button'}>
							{common['page-arb-curve-pool-next-button']}
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getStaticProps(): Promise<any>{
	const	strategiesRaw = await listVaultsWithStrategies({network: 42161, isCurve: true});
	const	vaults = JSON.parse(strategiesRaw);
	return {props: {vaults}, revalidate: 60 * 60};
}

export default Index;
