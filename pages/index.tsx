import	React, {ReactElement}				from	'react';
import	Link								from	'next/link';
import	HeadIconYearn						from	'components/icons/HeadIconYearn';
import	HeadIconEth							from	'components/icons/HeadIconEth';
import	HeadIconFtm							from	'components/icons/HeadIconFtm';
import	HeadIconOp							from	'components/icons/HeadIconOp';
import	HeadIconArbi						from	'components/icons/HeadIconArbi';
import	useLocalization						from	'contexts/useLocalization';
import	{parseMarkdown}						from	'utils';

function	Index(): ReactElement {
	const	{common} = useLocalization();

	return (
		<article className={'p-4 w-full bg-white dark:bg-black rounded-sm'}>
			<div className={'w-full'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<HeadIconYearn />
					</div>
					<h1
						className={'mb-8 text-4xl font-bold text-dark-blue-1 dark:text-white whitespace-pre-line md:text-6xl'}
						dangerouslySetInnerHTML={{__html: parseMarkdown(common['overview-title'])}} />
					<div className={'mb-8'}>
						<p
							className={'inline text-gray-blue-1 dark:text-gray-3 whitespace-pre-line'}
							dangerouslySetInnerHTML={{__html: parseMarkdown(common['overview-description'])}}>
						</p>
					</div>
				</div>
			</div>

			<div className={'w-full'}>
				<div className={'flex flex-row items-center mb-2'}>
					<div className={'mr-4 w-10 h-10'}>
						<HeadIconEth className={'w-10 h-10'}/>
					</div>
					<div>
						<h1 className={'title'}>
							{common['yearn-and-curve-eth-vault-title']}
						</h1>
					</div>
				</div>
				<div className={'w-full max-w-full'}>
					<p
						className={'text-gray-blue-1 dark:text-gray-3'}
						dangerouslySetInnerHTML={{__html: parseMarkdown(common['yearn-and-curve-eth-vault-description'])}}>
					</p>
				</div>
			</div>

			<div className={'w-full'}>
				<div className={'flex flex-row items-center mt-8 mb-2'}>
					<div className={'mr-4 w-10 h-10'}>
						<HeadIconFtm className={'w-10 h-10'}/>
					</div>
					<div>
						<h1 className={'title'}>
							{common['yearn-and-curve-ftm-vault-title']}
						</h1>
					</div>
				</div>
				<div className={'w-full max-w-full'}>
					<p
						className={'text-gray-blue-1 dark:text-gray-3'}
						dangerouslySetInnerHTML={{__html: parseMarkdown(common['page-ftm-stable-description'])}}>
					</p>
				</div>
			</div>

			<div className={'w-full'}>
				<div className={'flex flex-row items-center mt-8 mb-2'}>
					<div className={'mr-4 w-10 h-10'}>
						<HeadIconArbi className={'w-10 h-10'}/>
					</div>
					<div>
						<h1 className={'title'}>
							{common['yearn-and-curve-arb-vault-title']}
						</h1>
					</div>
				</div>
				<div className={'w-full max-w-full'}>
					<p
						className={'text-gray-blue-1 dark:text-gray-3'}
						dangerouslySetInnerHTML={{__html: parseMarkdown(common['page-arb-curve-pool-description'])}}>
					</p>
				</div>
			</div>

			<div className={'w-full'}>
				<div className={'flex flex-row items-center mt-8 mb-2'}>
					<div className={'mr-4 w-10 h-10'}>
						<HeadIconOp className={'w-10 h-10'}/>
					</div>
					<div>
						<h1 className={'title'}>
							{common['yearn-and-curve-op-vault-title']}
						</h1>
					</div>
				</div>
				<div className={'w-full max-w-full'}>
					<p
						className={'text-gray-blue-1 dark:text-gray-3'}
						dangerouslySetInnerHTML={{__html: parseMarkdown(common['page-op-stable-description'])}}>
					</p>
				</div>
			</div>

			<div className={'mt-16 w-full'}>
				<div className={'self-center md:self-auto'}>
					<Link href={'/yearn-and-curve'}>
						<button className={'button-large button-filled'}>
							{common['overview-button']}
						</button>
					</Link>
				</div>
			</div>
		</article>
	);
}

export default Index;
