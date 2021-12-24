import	React				from	'react';
import	{useRouter}			from	'next/router';
import	Link				from	'next/link';
import	useLocalization		from	'contexts/useLocalization';
import	LOCALES				from	'utils/locale';

function	MenuItem({label, condition, href, className, height = 'h-6'}) {
	return (
		<Link href={href}>
			<div className={`${condition ? 'text-yblue font-bold' : 'text-ygray-200'} cursor-pointer relative w-full ${className}`}>
				{label}
				<div className={'absolute top-0 z-20 hidden md:block'} style={{right: 4}}>
					<div className={`w-1 ${height} bg-yblue rounded-sm ${condition ? 'opacity-100' : 'opacity-0'}`} />
				</div>
			</div>
		</Link>
	);
}

function	MenuItems() {
	const	router = useRouter();
	const	{common} = useLocalization();

	return (
		<div className={'w-64.5'}>
			<MenuItem
				className={'mb-2 md:mb-4'}
				label={common['menu-overview']}
				condition={router.pathname === '/'}
				href={'/'} />
			<MenuItem
				className={'mb-2 md:mb-4'}
				label={common['menu-yearn-curve']}
				condition={router.pathname === '/yearn-and-curve'}
				href={'/yearn-and-curve'} />
			<div className={'ml-4 space-y-2 md:space-y-4 mb-4 md:mb-8'}>
				<MenuItem
					className={'mb-4 md:mb-8'}
					label={common['menu-curve-boost-multiplier']}
					condition={router.pathname === '/curve-boost-multipliers'}
					href={'/curve-boost-multipliers'} />
			</div>

			<p className={'text-ygray-400 mb-2 md:mb-4'}>{'Ethereum'}</p>
			<div className={'ml-4 space-y-2 md:space-y-4 mb-4 md:mb-8'}>
				<MenuItem
					label={common['menu-stables']}
					condition={router.pathname === '/ethereum/stables'}
					href={'/ethereum/stables'} />
				<MenuItem
					label={common['menu-defi-tokens']}
					condition={router.pathname === '/ethereum/defi-tokens'}
					href={'/ethereum/defi-tokens'} />
				<MenuItem
					label={common['menu-curve-pools']}
					condition={router.pathname === '/ethereum/curve-pools'}
					href={'/ethereum/curve-pools'} />
				<MenuItem
					label={common['menu-retired-vaults']}
					condition={router.pathname === '/ethereum/retired-vaults'}
					href={'/ethereum/retired-vaults'} />
				<div className={'ml-4 space-y-2 md:space-y-4 mb-4 md:mb-8'}>
					<MenuItem
						label={common['menu-v1-vaults']}
						condition={router.pathname === '/ethereum/v1-vaults'}
						href={'/ethereum/v1-vaults'} />
				</div>
			</div>


			<p className={'text-ygray-400 mb-2 md:mb-4'}>{'Fantom'}</p>
			<div className={'ml-4 space-y-2 md:space-y-4 mb-4 md:mb-8'}>
				<MenuItem
					label={common['menu-stables']}
					condition={router.pathname === '/fantom/stables'}
					href={'/fantom/stables'} />
				<MenuItem
					label={common['menu-defi-tokens']}
					condition={router.pathname === '/fantom/defi-tokens'}
					href={'/fantom/defi-tokens'} />
				<MenuItem
					label={common['menu-curve-pools']}
					condition={router.pathname === '/fantom/curve-pools'}
					href={'/fantom/curve-pools'} />
				<MenuItem
					label={common['menu-retired-vaults']}
					condition={router.pathname === '/fantom/retired-vaults'}
					href={'/fantom/retired-vaults'} />
			</div>
		</div>
	);
}

function	Menu() {
	const	{language, set_language} = useLocalization();
	const	router = useRouter();
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

	React.useEffect(() => {
		set_isExpandedAnimation(false);
		setTimeout(() => set_isExpanded(false), 500);
	}, [router.pathname]);

	return (
		<nav className={'w-full md:w-64.5 px-4 md:px-0 bg-white md:bg-opacity-0 shadow-sm md:shadow-none fixed md:relative z-50'}>
			<div className={'relative w-full h-full md:fixed md:w-64.5 z-20'}>
				<div className={'relative w-full h-full flex flex-col'}>
					<div className={'flex flex-row justify-between items-center'}>
						<Link href={'/'}>
							<h1 className={'text-ygray-100 font-bold mb-6 md:mb-10 pt-6 md:pt-8 cursor-pointer'}>
								{'The Vaults at '}
								<span className={'text-yblue'}>{'Yearn'}</span>
							</h1>
						</Link>

						<div className={'block md:hidden'}>
							<select
								value={language}
								className={'m-0 mr-1 px-3 py-2 items-center cursor-pointer whitespace-nowrap border border-solid border-ygray-500 text-xs bg-white font-semibold text-ygray-700 pr-7 flex'}
								onChange={e => set_language(e.target.value)}>
								{Object.values(LOCALES).map((lang, index) => (
									<option className={'cursor-pointer'} key={index} value={lang.code}>{lang.symbol}</option>
								))}
							</select>
						</div>

						<svg aria-hidden={'true'} className={'block md:hidden text-yblue w-6 h-6'} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 448 512'} onClick={onExpand}><path fill={'currentColor'} d={'M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z'}></path></svg>
					</div>
					<div className={'hidden md:block'}>
						<MenuItems />
					</div>
					<div className={'hidden md:flex mt-auto mb-10 space-x-4 flex-row items-center'}>
						{
							Object.values(LOCALES).map((lang) => {
								if (lang.code === language) {
									return (
										<div key={lang.symbol} className={'text-yblue text-sm font-bold'}>
											{lang.symbol}
										</div>
									);
								}
								return (
									<div
										key={lang.symbol}
										onClick={() => set_language(lang.code)}
										className={'text-ygray-200 text-sm cursor-pointer'}>
										{lang.symbol}
									</div>
								);
							})
						}
					</div>
				</div>
			</div>
			<div className={'absolute -right-1 top-0 z-10 hidden md:block inset-y-0'}>
				<div className={'w-0.5 h-full bg-ygray-500'} />
			</div>
			<div className={`w-full inset-x-0 transition-max-height duration-500 overflow-hidden bg-white fixed ${isExpandedAnimation ? 'max-h-max shadow-sm' : 'max-h-0'}`}>
				{isExpanded ? (
					<div className={'block md:hidden px-6'}>
						<MenuItems />
					</div>
				) : <div />}
			</div>
		</nav>
	);
}

export default Menu;
