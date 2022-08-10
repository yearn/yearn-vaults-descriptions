import	React							from	'react';
import	Link							from	'next/link';
import	Vaults							from	'components/Vaults';
import	HeadIconRIP						from	'components/icons/HeadIconRIP';
import	useLocalization					from	'contexts/useLocalization';
import	{listVaultsWithStrategies}		from	'pages/api/vaults';
import	{parseMarkdown}					from	'utils';

const	chainExplorer = 'https://etherscan.io';

function	Index({vaults}) {
	const	{common} = useLocalization();

	return (
		<section className={'p-4 w-full bg-white dark:bg-black rounded-sm'}>
			<div className={'w-full'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<HeadIconRIP className={'text-yearn-blue dark:text-white'} />
					</div>
					<h1 className={'mb-8 text-4xl font-bold text-dark-blue-1 dark:text-white whitespace-pre-line md:text-6xl'}>
						{common['page-eth-v1-vaults-title']}
					</h1>
					<div className={'mb-8 w-full max-w-full'}>
						<p
							className={'inline text-gray-blue-1 dark:text-gray-3 whitespace-pre-line'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['page-eth-v1-vaults-description'])}} />
					</div>
				</div>
			</div>
			<div className={'w-full'}>
				{vaults.map((vault) => <Vaults key={vault.name} vault={vault} chainExplorer={chainExplorer} isRetired />)}
			</div>
			<div className={'w-full'}>
				<div className={'self-center mt-8 md:self-auto'}>
					<Link href={'/fantom/stables'}>
						<button className={'button-large button-filled'}>
							{common['page-eth-v1-vaults-next-button']}
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}

export async function getStaticProps() {
	const	strategiesRaw = await listVaultsWithStrategies({network: 1, isV1: true});
	const	vaults = JSON.parse(strategiesRaw);
	return {props: {vaults}, revalidate: 60 * 60};
}

export default Index;
