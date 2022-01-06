import	React							from	'react';
import	Link							from	'next/link';
import	Vaults							from	'components/Vaults';
import	Sleep							from	'components/icons/Sleep';
import	useLocalization					from	'contexts/useLocalization';
import	{listVaultsWithStrategies}		from	'pages/api/vaults';

const	chainExplorer = 'https://etherscan.io';

function	Index({vaults}) {
	const	{common} = useLocalization();

	return (
		<section>
			<div className={'w-full mt-10 md:mt-20 pt-2'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<Sleep />
					</div>
					<h1 className={'text-4xl md:text-6xl text-ygray-100 dark:text-white font-bold mb-8'}>
						{common['page-ftm-retired-title']}
					</h1>
					<div className={'max-w-xl space-y-6 mb-12'}>
						<p className={'text-ygray-200 dark:text-dark-50'}>
							{common['page-ftm-retired-description']}
						</p>
					</div>
					{vaults.map((vault) => <Vaults key={vault.name} vault={vault} chainExplorer={chainExplorer} isRetired />)}
				</div>
				<div className={'mt-8'}>
					<Link href={'/'}>
						<button className={'text-white bg-yblue py-2 px-5 text-left font-bold text-sm'} style={{width: 279}}>
							{common['page-ftm-retired-next-button']}
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}

export async function getStaticProps() {
	const	strategiesRaw = await listVaultsWithStrategies({network: 250, isRetired: true});
	const	vaults = JSON.parse(strategiesRaw);
	return {props: {vaults}};
}

export default Index;
