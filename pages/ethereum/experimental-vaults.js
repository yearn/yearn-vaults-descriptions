import	React							from	'react';
import	Link							from	'next/link';
import	Vaults							from	'components/Vaults';
import	IconApe							from	'components/icons/IconApe';
import	useLocalization					from	'contexts/useLocalization';
import	{listVaultsWithStrategies}		from	'pages/api/ape-vaults';
import	{parseMarkdown}					from	'utils';

const	chainExplorer = 'https://etherscan.io';
						
function	Index({vaults}) {
	const	{common} = useLocalization();

	return (
		<section>
			<div className={'w-full mt-10 md:mt-20 pt-2'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<IconApe />
					</div>
					<h1 className={'text-4xl md:text-6xl text-ygray-100 dark:text-white font-bold mb-8'}>
						{common['page-experimental-ape-tax-title']}
					</h1>
					<div className={'max-w-xl space-y-6 mb-12'}>
						<p
							className={'text-ygray-200 dark:text-dark-50'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['page-experimental-ape-tax-description'])}} />
					</div>
					{(vaults || []).map((vault) => <Vaults
						key={vault.name}
						vault={vault}
						chainExplorer={chainExplorer}
						isPublicApeTax />)}
				</div>
				<div className={'mt-8 self-center md:self-auto'}>
					<Link href={'/ethereum/retired-vaults'}>
						<button className={'text-white bg-yblue py-2 px-5 font-bold text-sm text-center md:text-left'} style={{width: 279}}>
							{common['page-eth-curve-pool-next-button']}
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}

export async function getStaticProps() {
	const	vaults = await listVaultsWithStrategies({network: 1});
	return {props: {vaults: JSON.parse(vaults)}, revalidate: 60 * 60 * 2};
}

export default Index;
