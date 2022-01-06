import	React							from	'react';
import	Image							from	'next/image';
import	Strategies						from	'components/Strategies';
import	IconChevron						from	'components/icons/IconChevron';
import	IconExpand						from	'components/icons/Expand';
import	IconRetired						from	'components/icons/IconRetired';

function	Vaults({vault, chainExplorer, isRetired, isApeTax, shouldHideValids}) {
	const	[isExpanded, set_isExpanded] = React.useState(false);
	const	[isExpandedAnimation, set_isExpandedAnimation] = React.useState(false);
	
	function	onExpand() {
		if (isRetired) {
			return null;
		}
		if (isExpanded) {
			set_isExpandedAnimation(false);
			setTimeout(() => set_isExpanded(false), 500);
		} else {
			set_isExpanded(true);
			setTimeout(() => set_isExpandedAnimation(true), 1);
		}
	}

	return (
		<div
			key={vault.name}
			className={`max-w-4xl w-full bg-white ${isExpanded ? 'dark:bg-dark-400' : 'dark:bg-dark-600'} transition-colors p-4 rounded-sm mb-0.5`}>
			<div className={`flex flex-row items-center ${isRetired ? '' : 'cursor-pointer'}`} onClick={onExpand}>
				<div className={'mr-4 w-8 flex justify-center items-center'} style={{minWidth: 32}}>
					{isApeTax ? 
						<p className={'whitespace-nowrap'}>
							{vault.icon}
						</p>
						: isRetired ?
							<IconRetired />
							: <Image
								src={vault.icon}
								width={32}
								height={32}
								loading={'eager'} />}
				</div>
				<p className={'text-ygray-200 dark:text-white mr-2 break-words'}>
					{`${vault.display_name} ${isApeTax ? '' : '—'} `}
					<b className={'font-bold'}>{isApeTax ? '' : vault.name}</b>
				</p>
				<div className={'ml-auto mr-1 flex flex-row justify-center'}>
					<a
						onClick={e => e.stopPropagation()}
						href={`${chainExplorer}/address/${vault.address}#code`}
						target={'_blank'}
						rel={'noreferrer'}>
						<IconExpand className={isRetired ? 'mr-0': 'mr-4'}/>
					</a>
					{!isRetired ? <IconChevron className={isExpandedAnimation ? 'transform rotate-90 transition-transform' : 'transform rotate-0 transition-transform'}/> : null}
				</div>
			</div>
			{!isRetired ? <div className={`w-full transition-max-height duration-500 overflow-hidden ${isExpandedAnimation ? 'max-h-max' : 'max-h-0'}`}>
				{isExpanded ? (
					<Strategies
						isRetired={isRetired}
						shouldHideValids={shouldHideValids}
						chainExplorer={chainExplorer}
						strategiesData={vault.strategies}
						vaultSymbol={vault.symbol} />
				) : <div />}
			</div> : null}
		</div>
	);
}

export default Vaults;