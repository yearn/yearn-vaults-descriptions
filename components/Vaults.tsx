import	React, {ReactElement}	from	'react';
import	Image									from	'next/image';
import	Strategies						from	'components/Strategies';
import	IconChevron						from	'components/icons/IconChevron';
import	IconLinkOut						from	'components/icons/IconLinkOut';
import	IconRetired						from	'components/icons/IconRetired';
import {TVaultWithStrats} 		from 'types/index';

type	TVault = {
	vault: TVaultWithStrats
	chainExplorer: string
	isRetired?: boolean
	isApeTax?: boolean
	isPublicApeTax?: boolean
	shouldHideValids?: boolean
}

function	Vaults({vault, chainExplorer, isRetired, isApeTax, isPublicApeTax, shouldHideValids}: TVault): ReactElement {
	const	[isExpanded, set_isExpanded] = React.useState(false);
	const	[isExpandedAnimation, set_isExpandedAnimation] = React.useState(false);
	const	[isUriCopied, set_isUriCopied] = React.useState(false);
	
	function	onExpand(): void {
		if (!isRetired) {
			if (isExpanded) {
				set_isExpandedAnimation(false);
				setTimeout((): void => set_isExpanded(false), 500);
			} else {
				set_isExpanded(true);
				setTimeout((): void => set_isExpandedAnimation(true), 1);
			}
		}
	}

	return (
		<div
			key={vault.name}
			id={vault.address}
			className={`w-full max-w-4xl ${isExpanded ? 'bg-neutral-200' : 'bg-neutral-100 hover:bg-neutral-200'} rounded-default mb-0.5 p-4 transition-colors`}>
			<div className={`group flex flex-row items-center ${isRetired ? '' : 'cursor-pointer'}`} onClick={onExpand}>
				<div className={'mr-4 flex w-8 items-center justify-center'} style={{minWidth: 32}}>
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
				<p className={'mr-2 break-words text-neutral-900'}>
					{`${vault.display_name} ${isApeTax || isPublicApeTax ? '' : '—'} `}
					<b className={'font-bold'}>{isApeTax || isPublicApeTax ? '' : vault.name}</b>
				</p>
				<div onClick={(e): void => {
					e.stopPropagation();
					set_isUriCopied(true);
					navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${vault.address}`);
					setTimeout((): void => set_isUriCopied(false), 1500);
				}}>
					{isUriCopied ?
						<svg aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'clipboard-check'} className={'-m-2 h-8 w-8 cursor-pointer p-2 text-primary-500/20 opacity-0 transition-opacity hover:text-primary-500/80 group-hover:opacity-100'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 384 512'}><path fill={'currentColor'} d={'M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32s-14.33 32-32 32S160 113.7 160 96S174.3 64 192 64zM282.9 262.8l-88 112c-4.047 5.156-10.02 8.438-16.53 9.062C177.6 383.1 176.8 384 176 384c-5.703 0-11.25-2.031-15.62-5.781l-56-48c-10.06-8.625-11.22-23.78-2.594-33.84c8.609-10.06 23.77-11.22 33.84-2.594l36.98 31.69l72.52-92.28c8.188-10.44 23.3-12.22 33.7-4.062C289.3 237.3 291.1 252.4 282.9 262.8z'}></path></svg>
						: <svg aria-hidden={'true'} focusable={'false'} data-prefix={'fas'} data-icon={'clipboard'} className={'-m-2 h-8 w-8 cursor-pointer p-2 text-neutral-400/40 opacity-0 transition-opacity hover:text-neutral-400/80 group-hover:opacity-100'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 384 512'}><path fill={'currentColor'} d={'M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM272 224h-160C103.2 224 96 216.8 96 208C96 199.2 103.2 192 112 192h160C280.8 192 288 199.2 288 208S280.8 224 272 224z'}></path></svg>
					}
				</div>
				<div className={'mr-1 ml-auto flex flex-row justify-center'}>
					<a
						onClick={(e): void => e.stopPropagation()}
						href={`${chainExplorer}/address/${vault.address}#code`}
						target={'_blank'}
						rel={'noreferrer'}>
						<IconLinkOut className={isRetired ? 'mr-0 h-4 w-4 text-primary-500': 'mr-4 h-4 w-4 text-primary-500'}/>
					</a>
					{!isRetired ? <IconChevron className={isExpandedAnimation ? 'h-4 w-4 -rotate-90 text-neutral-700 transition-transform' : 'h-4 w-4 -rotate-180 text-neutral-700 transition-transform'} /> : null}
				</div>
			</div>
			{!isRetired ? <div className={`w-full overflow-hidden transition-max-height duration-500 ${isExpandedAnimation ? 'max-h-max' : 'max-h-0'}`}>
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