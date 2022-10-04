import	React, {ReactElement}							from	'react';
import	Link							from	'next/link';
import	HeadIconRIP						from	'components/icons/HeadIconRIP';
import	useLocalization					from	'contexts/useLocalization';
import  {TBasicPageProps} 				from 'types';
import	{parseMarkdown}					from	'utils';

function	Index(): ReactElement {
	const	{common} = useLocalization();

	return (
		<section className={'rounded-default w-full bg-neutral-0 p-4'}>
			<div className={'w-full'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<HeadIconRIP className={'text-neutral-300'} />
					</div>
					<h1 className={'mb-8 whitespace-pre-line text-4xl font-bold text-neutral-900 md:text-6xl'}>
						{common['page-eth-v1-vaults-title']}
					</h1>
					<div className={'mb-8 w-full max-w-full'}>
						<p
							className={'inline whitespace-pre-line text-neutral-700'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['page-eth-v1-vaults-description'])}} />
					</div>
				</div>
			</div>
			<div className={'w-full'}>
				<div className={'mt-8 self-center md:self-auto'}>
					<Link href={'/fantom/stables'}>
						<button data-variant={'filled'} className={'button-large yearn--button'}>
							{common['page-eth-v1-vaults-next-button']}
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}

export async function getStaticProps(): Promise<TBasicPageProps> {
	return {props: {}, revalidate: 60 * 60};
}

export default Index;
