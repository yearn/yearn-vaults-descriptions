import	React							from	'react';
import	Image							from	'next/image';
import	Vaults							from	'components/Vaults';
import	Meatball						from	'components/icons/Meatball';
import	useLocalization					from	'contexts/useLocalization';
import	{listVaultsWithStrategies}		from	'pages/api/vaults';

const	chainExplorer = 'https://etherscan.io';

function	Index({vaults}) {
	const	{common} = useLocalization();

	return (
		<section>
			<div className={'w-full mt-10 md:mt-20 pt-2'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8 w-10 h-10'}>
						<Image
							src={'/CRV.png'}
							width={40}
							height={40}
							loading={'eager'} />
					</div>
					<h1 className={'text-4xl md:text-6xl text-ygray-100 font-bold mb-8'}>
						{common['page-eth-curve-pool-title']}
					</h1>
					<div className={'max-w-xl space-y-6 mb-12'}>
						<p className={'text-ygray-200'}>
							{common['page-eth-curve-pool-description']}
							<Meatball className={'inline mb-1 ml-2'} />
						</p>
					</div>
					{vaults.map((vault) => <Vaults key={vault.name} vault={vault} chainExplorer={chainExplorer} />)}
				</div>
			</div>
		</section>
	);
}

export async function getStaticProps() {
	const	strategiesRaw = await listVaultsWithStrategies({network: 1, isCurve: true});
	const	vaults = JSON.parse(strategiesRaw);
	return {props: {vaults}};
}

export default Index;
