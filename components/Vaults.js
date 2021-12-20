import	React							from	'react';
import	Image							from	'next/image';
import	Strategies						from	'components/Strategies';
import	Chevron							from	'components/icons/Chevron';
import	Expand							from	'components/icons/Expand';
import	IconRetired						from	'components/icons/IconRetired';

function	Vaults({vault, chainExplorer, isRetired, shouldHideValids}) {
	const	[isExpanded, set_isExpanded] = React.useState(false);
	const	[isExpandedAnimation, set_isExpandedAnimation] = React.useState(false);
	
	function	onExpand() {
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
			className={'max-w-4xl w-full bg-white p-4 rounded-sm mb-0.5'}>
			<div className={'flex flex-row items-center cursor-pointer'} onClick={onExpand}>
				<div className={'mr-4 w-8 flex justify-center items-center'} style={{minWidth: 32}}>
					{isRetired ?
						<IconRetired />
						: <Image
							src={vault.icon}
							width={32}
							height={32}
							loading={'eager'} />}
				</div>
				<p className={'text-ygray-200 mr-2 break-words'}>
					{`${vault.display_name} — `}
					<b className={'font-bold'}>{vault.name}</b>
				</p>
				<div className={'ml-auto mr-1 flex flex-row justify-center'}>
					<a
						onClick={e => e.stopPropagation()}
						href={`${chainExplorer}/address/${vault.address}#code`}
						target={'_blank'}
						rel={'noreferrer'}>
						<Expand className={'mr-4'}/>
					</a>
					<Chevron className={isExpandedAnimation ? 'transform rotate-90 transition-transform' : 'transform rotate-0 transition-transform'}/>
				</div>
			</div>
			<div className={`w-full transition-max-height duration-500 overflow-hidden ${isExpandedAnimation ? 'max-h-max' : 'max-h-0'}`}>
				{isExpanded ? (
					<Strategies
						shouldHideValids={shouldHideValids}
						chainExplorer={chainExplorer}
						strategiesData={vault.strategies}
						vaultSymbol={vault.symbol} />
				) : <div />}
			</div>
		</div>
	);
}

export default Vaults;