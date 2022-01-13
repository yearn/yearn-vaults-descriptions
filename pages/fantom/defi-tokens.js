import	React							from	'react';
import	Link							from	'next/link';
import	Ghost							from	'components/icons/Ghost';
import	Vaults							from	'components/Vaults';
import	useLocalization					from	'contexts/useLocalization';
import	{listVaultsWithStrategies}		from	'pages/api/vaults';
import	{parseMarkdown}					from	'utils';

const	chainExplorer = 'http://ftmscan.com';

function	Index({vaults}) {
	const	{common} = useLocalization();

	return (
		<section>
			<div className={'w-full mt-10 md:mt-20 pt-2'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<Ghost />
					</div>
					<h1 className={'text-4xl md:text-6xl text-ygray-100 dark:text-white font-bold mb-8'}>
						{common['page-ftm-defi-tokens-title']}
					</h1>
					<div className={'max-w-xl space-y-6 mb-12'}>
						<p
							className={'text-ygray-200 dark:text-dark-50'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['page-ftm-defi-tokens-description'])}} />
					</div>
					{vaults.map((vault) => <Vaults key={vault.name} vault={vault} chainExplorer={chainExplorer} />)}
				</div>
				<div className={'mt-8 self-center md:self-auto'}>
					<Link href={'/fantom/curve-pools'}>
						<button className={'text-white bg-yblue py-2 px-5 font-bold text-sm text-center md:text-left'} style={{width: 279}}>
							{common['page-ftm-defi-tokens-next-button']}
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}

export async function getServerSideProps() {
	const	strategiesRaw = await listVaultsWithStrategies({network: 250, isDefi: true});
	const	vaults = JSON.parse(strategiesRaw);
	return {props: {vaults}};
}

export default Index;
