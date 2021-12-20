import	React							from	'react';
import	{parseMarkdown}					from	'utils';

function	Strategies({strategiesData, vaultSymbol, chainExplorer, shouldHideValids}) {
	if (strategiesData.length === 0) {
		return (
			<section aria-label={'STRATEGIES'}>
				<div className={'w-full text-ygray-200 dark:text-dark-50'}>
					<i
						className={'text-xs'}
						dangerouslySetInnerHTML={{__html: parseMarkdown('No strategy detected.')}} />
				</div>
			</section>
		);
	}

	return (
		<section aria-label={'STRATEGIES'} className={'mt-4 '}>
			{
				strategiesData.filter(s => shouldHideValids ? !s.description : true).map((strategy, index) => (
					<div key={index} className={'flex flex-col ml-12 relative'}>
						<div className={'text-ygray-200 mb-4'}>
							<div className={'mb-2'}>
								<a href={`${chainExplorer}/address/${strategy.address}#code`} target={'_blank'} className={'inline text-yblue underline'} rel={'noreferrer'}>
									{strategy.name}
								</a>
							</div>
							<div className={'w-full pr-16'}>
								{strategy?.description ? 
									<p className={'inline'} dangerouslySetInnerHTML={{__html: parseMarkdown(strategy?.description.replace(/{{token}}/g, vaultSymbol) || '')}} />
									:
									<i className={'inline'} dangerouslySetInnerHTML={{__html: parseMarkdown('No description provided for this strategy.')}} />
								}
							</div>
						</div>
					</div>
				))
			}
		</section>
	);
}

export default Strategies;