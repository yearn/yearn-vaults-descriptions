import	React, {ReactElement}							from	'react';
import	Link							from	'next/link';
import	Vaults							from	'components/Vaults';
import	IconApe							from	'components/icons/IconApe';
import	useLocalization					from	'contexts/useLocalization';
import	{listVaultsWithStrategies}		from	'pages/api/ape-vaults';
import {TVaultWithStrats, TVaultProps} 	from 'types';
import	{parseMarkdown}					from	'utils';

const	chainExplorer = 'http://ftmscan.com';
						
function	Index({vaults}: {vaults: TVaultWithStrats[]}): ReactElement {
	const	{common} = useLocalization();

	return (
		<section className={'rounded-default w-full bg-neutral-0 p-4'}>
			<div className={'w-full'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<IconApe />
					</div>
					<h1 className={'mb-8 whitespace-pre-line text-4xl font-bold text-neutral-900 md:text-6xl'}>
						{common['page-experimental-ape-tax-title']}
					</h1>
					<div className={'mb-8 w-full max-w-full'}>
						<p
							className={'inline whitespace-pre-line text-neutral-700'}
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
				<div className={'mt-8 self-center md:self-auto'}>
					<Link href={'/fantom/retired-vaults'}>
						<button data-variant={'filled'} className={'button-large yearn--button'}>
							{common['page-ftm-curve-pool-next-button']}
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}

export async function getStaticProps(): Promise<TVaultProps>{
	const	vaults = await listVaultsWithStrategies({network: 250});
	return {props: {vaults: JSON.parse(vaults)}, revalidate: 60 * 60 * 2};
}

export default Index;
