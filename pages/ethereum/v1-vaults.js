import	React							from	'react';
import	Vaults							from	'components/Vaults';
import	RIP							from	'components/icons/RIP';
import	{listVaultsWithStrategies}		from	'pages/api/vaults';

const	chainExplorer = 'https://etherscan.io';

function	Index({vaults}) {
	return (
		<section>
			<div className={'w-full mt-20 pt-2'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<RIP />
					</div>
					<h1 className={'text-6xl text-ygray-100 font-bold mb-8'}>
						{'Retired Vaults'}
					</h1>
					<div className={'max-w-xl space-y-6 mb-12'}>
						<p className={'text-ygray-200'}>
							{'All v1 yVaults have migrated to v2 yVaults. Please migrate your funds via our zap or withdrawal to continue earning yield'}
						</p>
					</div>
					{vaults.map((vault) => <Vaults key={vault.name} vault={vault} chainExplorer={chainExplorer} />)}
				</div>
			</div>
		</section>
	);
}

export async function getStaticProps() {
	const	strategiesRaw = await listVaultsWithStrategies({network: 1, isV1: true});
	const	vaults = JSON.parse(strategiesRaw);
	return {props: {vaults}};
}

export default Index;
