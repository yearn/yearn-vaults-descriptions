import	React							from	'react';
import	Image							from	'next/image';
import	Strategies						from	'components/Strategies';
import	IconChevron						from	'components/icons/IconChevron';
import	IconLinkOut						from	'components/icons/IconLinkOut';
import	IconRetired						from	'components/icons/IconRetired';

function	Vaults({vault, chainExplorer, isRetired, isApeTax, isPublicApeTax, shouldHideValids}) {
	const	[isExpanded, set_isExpanded] = React.useState(false);
	const	[isExpandedAnimation, set_isExpandedAnimation] = React.useState(false);
	const	[isUriCopied, set_isUriCopied] = React.useState(false);
	
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
			id={vault.address}
			className={`max-w-4xl w-full ${isExpanded ? 'bg-white-blue-1 dark:bg-black' : 'bg-white-blue-2 hover:bg-white-blue-1 dark:bg-black-1'} transition-colors p-4 rounded-sm mb-0.5`}>
			<div className={`flex flex-row items-center group ${isRetired ? '' : 'cursor-pointer'}`} onClick={onExpand}>
				<div className={'flex justify-center items-center mr-4 w-8'} style={{minWidth: 32}}>
					{isApeTax || isPublicApeTax ? 
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
				<p className={'mr-2 text-dark-blue-1 dark:text-white break-words'}>
					{`${vault.display_name} ${isApeTax || isPublicApeTax ? '' : '—'} `}
					<b className={'font-bold'}>{isApeTax || isPublicApeTax ? '' : vault.name}</b>
				</p>
				<div onClick={(e) => {
					e.stopPropagation();
					set_isUriCopied(true);
					navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${vault.address}`);
					setTimeout(() => set_isUriCopied(false), 1500);
				}}>
					{isUriCopied ?
						<svg aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'clipboard-check'} className={'p-2 -m-2 w-8 h-8 text-yearn-blue/20 hover:text-yearn-blue/80 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 384 512'}><path fill={'currentColor'} d={'M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32s-14.33 32-32 32S160 113.7 160 96S174.3 64 192 64zM282.9 262.8l-88 112c-4.047 5.156-10.02 8.438-16.53 9.062C177.6 383.1 176.8 384 176 384c-5.703 0-11.25-2.031-15.62-5.781l-56-48c-10.06-8.625-11.22-23.78-2.594-33.84c8.609-10.06 23.77-11.22 33.84-2.594l36.98 31.69l72.52-92.28c8.188-10.44 23.3-12.22 33.7-4.062C289.3 237.3 291.1 252.4 282.9 262.8z'}></path></svg>
						: <svg aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'clipboard'} className={'p-2 -m-2 w-8 h-8 text-gray-blue-2/40 hover:text-gray-blue-2/80 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 384 512'}><path fill={'currentColor'} d={'M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM272 224h-160C103.2 224 96 216.8 96 208C96 199.2 103.2 192 112 192h160C280.8 192 288 199.2 288 208S280.8 224 272 224z'}></path></svg>
					}
				</div>
				<div className={'flex flex-row justify-center mr-1 ml-auto'}>
					<a
						onClick={e => e.stopPropagation()}
						href={`${chainExplorer}/address/${vault.address}#code`}
						target={'_blank'}
						rel={'noreferrer'}>
						<IconLinkOut className={isRetired ? 'mr-0 w-4 h-4 text-yearn-blue': 'mr-4 w-4 h-4 text-yearn-blue'}/>
					</a>
					{!isRetired ? <IconChevron className={isExpandedAnimation ? 'transform -rotate-90 transition-transform text-gray-blue-1 dark:text-gray-3 w-4 h-4' : 'transform -rotate-180 transition-transform text-gray-blue-1 dark:text-gray-3 w-4 h-4'} /> : null}
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