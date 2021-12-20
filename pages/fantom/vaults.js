import	React							from	'react';
import	Ghost							from	'components/icons/Ghost';
import	Vaults							from	'components/Vaults';
import	{listVaultsWithStrategies}		from	'pages/api/vaults';

const	chainExplorer = 'http://ftmscan.com/';

function	Index({vaults}) {
	return (
		<section>
			<div className={'w-full mt-10 md:mt-20 pt-2'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<Ghost />
					</div>
					<h1 className={'text-4xl md:text-6xl text-ygray-100 font-bold mb-8'}>
						{'Fantom Vaults'}
					</h1>
					<div className={'max-w-xl space-y-6 mb-12'}>
						<p className={'text-ygray-200'}>
							{'Yearn Finance is now Multi-Chain! Yearn yVaults are now '}
							<a href={'https://yearn.finance/#/vaults'} target={'_blank'} rel={'noreferrer'} className={'cursor-pointer underline text-yblue'}>{'live on the Fantom Network'}</a>
							{'! Just like our v2 yVaults, the new Fantom yVaults are able to employ multiple strategies per vault.'}
						</p>
					</div>
					{vaults.map((vault) => <Vaults key={vault.name} vault={vault} chainExplorer={chainExplorer} />)}
				</div>
			</div>
		</section>
	);
}

export async function getStaticProps() {
	const	strategiesRaw = await listVaultsWithStrategies({network: 250, isAll: true});
	const	vaults = JSON.parse(strategiesRaw);
	return {props: {vaults}};
}

export default Index;
