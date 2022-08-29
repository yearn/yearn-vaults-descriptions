import	React, {ReactElement}			from	'react';
import	Link							from	'next/link';
import	HeadIconVaults					from	'components/icons/HeadIconVaults';
import	Vaults							from	'components/Vaults';
import	useLocalization					from	'contexts/useLocalization';
import	{listVaultsWithStrategies}		from	'pages/api/vaults';
import	{parseMarkdown}					from	'utils';
import 	{TVaultWithStrats, TVaultProps} 				from	'types';

const	chainExplorer = 'https://etherscan.io';

function	Index({vaults}: {vaults: TVaultWithStrats[]}): ReactElement {
	const	{common} = useLocalization();

	return (
		<section className={'rounded-default w-full bg-neutral-0 p-4'}>
			<div className={'w-full'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<HeadIconVaults className={'text-neutral-300'} />
					</div>
					<h1 className={'mb-8 whitespace-pre-line text-4xl font-bold text-neutral-900 md:text-6xl'}>
						{common['page-eth-stable-title']}
					</h1>
					<div className={'mb-8 w-full max-w-full'}>
						<p
							className={'inline whitespace-pre-line text-neutral-700'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['page-eth-stable-description'])}} />
					</div>
				</div>
			</div>
			<div className={'w-full'}>
				{vaults.map((vault): ReactElement => <Vaults key={vault.address} vault={vault} chainExplorer={chainExplorer} />)}
			</div>
			<div className={'w-full'}>
				<div className={'mt-8 self-center md:self-auto'}>
					<Link href={'/ethereum/defi-tokens'}>
						<button data-variant={'filled'} className={'button-large yearn--button'}>
							{common['page-eth-stable-next-button']}
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}

export async function getStaticProps(): Promise<TVaultProps>  {
	const	strategiesRaw = await listVaultsWithStrategies({network: 1, isStable: true});
	const	vaults = JSON.parse(strategiesRaw);
	return {props: {vaults}, revalidate: 60 * 60};
}

export default Index;