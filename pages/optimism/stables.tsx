import	React, {ReactElement}			from	'react';
import	HeadIconVaults					from	'components/icons/HeadIconVaults';
import	Vaults							from	'components/Vaults';
import	useLocalization					from	'contexts/useLocalization';
import	{listVaultsWithStrategies}		from	'pages/api/vaults';
import	{parseMarkdown}					from	'utils';
import 	{TVaultWithStrats} 				from 'types/index';

const	chainExplorer = 'https://optimistic.etherscan.io/';

function	Index({vaults}: {vaults: TVaultWithStrats[]}): ReactElement {
	const	{common} = useLocalization();

	return (
		<section className={'w-full rounded-sm bg-white p-4 dark:bg-black'}>
			<div className={'w-full'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<HeadIconVaults className={'text-yearn-blue dark:text-white'} />
					</div>
					<h1 className={'text-dark-blue-1 mb-8 whitespace-pre-line text-4xl font-bold dark:text-white md:text-6xl'}>
						{common['page-op-stable-title']}
					</h1>
					<div className={'mb-8 w-full max-w-full'}>
						<p
							className={'text-gray-blue-1 dark:text-gray-3 inline whitespace-pre-line'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['page-op-stable-description'])}} />
					</div>
				</div>
			</div>
			<div className={'w-full'}>
				{vaults.map((vault): ReactElement => <Vaults key={vault.address} vault={vault} chainExplorer={chainExplorer} />)}
			</div>
		</section>
	);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getStaticProps() {
	const	strategiesRaw = await listVaultsWithStrategies({network: 10, isStable: true});
	const	vaults = JSON.parse(strategiesRaw);
	return {props: {vaults}, revalidate: 60 * 60};
}

export default Index;