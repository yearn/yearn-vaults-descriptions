import	React, {ReactElement}	from	'react';
import	Link									from	'next/link';
import	Vaults								from	'components/Vaults';
import	IconApe								from	'components/icons/IconApe';
import	useLocalization				from	'contexts/useLocalization';
import 	{TVaultWithStrats} 		from 'types/index';
import	{parseMarkdown}				from	'utils';
import	{listVaultsWithStrategies}		from	'pages/api/ape-vaults';

const	chainExplorer = 'https://etherscan.io';
						
function	Index({vaults}: {vaults: TVaultWithStrats[]}): ReactElement {
	const	{common} = useLocalization();

	return (
		<section className={'p-4 w-full bg-white dark:bg-black rounded-sm'}>
			<div className={'w-full'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<IconApe />
					</div>
					<h1 className={'mb-8 text-4xl font-bold text-dark-blue-1 dark:text-white whitespace-pre-line md:text-6xl'}>
						{common['page-experimental-ape-tax-title']}
					</h1>
					<div className={'mb-8 w-full max-w-full'}>
						<p
							className={'inline text-gray-blue-1 dark:text-gray-3 whitespace-pre-line'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['page-experimental-ape-tax-description'])}} />
					</div>
				</div>
			</div>
			<div className={'w-full'}>
				{(vaults || []).map((vault): ReactElement => <Vaults
					key={vault.name}
					vault={vault}
					chainExplorer={chainExplorer}
					isPublicApeTax />)}
			</div>
			<div className={'w-full'}>
				<div className={'self-center mt-8 md:self-auto'}>
					<Link href={'/ethereum/defi-tokens'}>
						<button className={'button-large button-filled'}>
							{common['page-eth-curve-pool-next-button']}
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getStaticProps() {
	const	vaults = await listVaultsWithStrategies({network: 1});
	return {props: {vaults: JSON.parse(vaults)}, revalidate: 60 * 60 * 2};
}

export default Index;
