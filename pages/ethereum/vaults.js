import	React							from	'react';
import	IconVaults						from	'components/icons/IconVaults';
import	Meatball						from	'components/icons/Meatball';
import	Vaults							from	'components/Vaults';
import	{listVaultsWithStrategies}		from	'pages/api/vaults';

const	chainExplorer = 'https://etherscan.io';

function	Index({vaults}) {
	return (
		<section>
			<div className={'w-full mt-20 pt-2'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<IconVaults />
					</div>
					<h1 className={'text-6xl text-ygray-100 font-bold mb-8'}>
						{'Vaults'}
					</h1>
					<div className={'max-w-xl space-y-6 mb-12'}>
						<p className={'text-ygray-200'}>
							{'v2 yVaults are able to employ multiple strategies per vault (up to 20 strategies simultaneously), unlike v1 yVaults that are only able to employ one strategy per vault.'}
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
	const	strategiesRaw = await listVaultsWithStrategies({network: 1});
	const	vaults = JSON.parse(strategiesRaw);
	return {props: {vaults}};
}

export default Index;
