import	React				from	'react';
import	{useRouter}			from	'next/router';
import	Link				from	'next/link';
import	useLocalization		from	'contexts/useLocalization';
import	useUI				from	'contexts/useUI';
import	LOCALES				from	'utils/locale';

function	MenuItem({label, condition, href, hideIf, className, height = 'h-6'}) {
	if (hideIf) {
		return null;
	}
	return (
		<Link href={href}>
			<div className={`${condition ? 'text-yblue font-bold' : 'text-ygray-200 dark:text-dark-50'} cursor-pointer relative w-full ${className}`}>
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

			<p className={'text-ygray-400 dark:text-dark-200 mb-2 md:mb-4'}>{'Ethereum'}</p>
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
					label={common['menu-experimental']}
					hideIf={router.pathname !== '/ethereum/experimental-vaults'}
					condition={router.pathname === '/ethereum/experimental-vaults'}
					href={'/ethereum/experimental-vaults'} />

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


			<p className={'text-ygray-400 dark:text-dark-200 mb-2 md:mb-4'}>{'Fantom'}</p>
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
					label={common['menu-experimental']}
					hideIf={router.pathname !== '/fantom/experimental-vaults'}
					condition={router.pathname === '/fantom/experimental-vaults'}
					href={'/fantom/experimental-vaults'} />
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
	const	{theme, switchTheme} = useUI();
	const	router = useRouter();
	const	head = React.useRef();
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
		if (head?.current) {
			head.current.oncontextmenu = (event) => {
				if (event.button === 2) {
					event.preventDefault();
					router.push('/internal/missing-descriptions');
				}
			};
		}
	}, [head?.current]);

	React.useEffect(() => {
		set_isExpandedAnimation(false);
		setTimeout(() => set_isExpanded(false), 500);
	}, [router.pathname]);

	return (
		<nav className={'w-full md:w-64.5 px-4 md:px-0 bg-white dark:bg-dark-900 md:dark:bg-dark-900 md:bg-opacity-0 shadow-sm md:shadow-none fixed md:relative z-50'}>
			<div className={'relative w-full h-full md:fixed md:w-64.5 z-20'}>
				<div className={'relative w-full h-full flex flex-col'}>
					<div className={'flex flex-row justify-between items-center'}>
						<Link href={'/'}>
							<h1
								ref={head}
								className={'text-ygray-100 dark:text-white font-bold mb-6 md:mb-10 pt-6 md:pt-8 cursor-pointer'}>
								{'The Vaults at '}
								<span className={'text-yblue'}>{'Yearn'}</span>
							</h1>
						</Link>

						<div className={'block md:hidden'}>
							<select
								value={language}
								className={'m-0 mr-1 px-3 py-2 items-center cursor-pointer whitespace-nowrap border border-solid border-ygray-500 dark:border-dark-600 text-xs bg-white dark:bg-dark-600 font-semibold text-ygray-700 dark:text-dark-50 pr-7 flex'}
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
					<div className={'hidden md:flex mt-auto mb-10 flex-row items-center justify-between'}>
						<div className={'flex space-x-4 flex-row items-center'}>
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
						<div className={'flex space-x-4 flex-row items-center mr-8'}>
							<svg
								onClick={switchTheme}
								className={`text-ygray-100 dark:text-white hover:opacity-100 transition-opacity cursor-pointer w-4 h-4 opacity-20 ${theme === 'dark' ? 'hidden' : ''}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z'}></path></svg>

							<svg
								onClick={switchTheme}
								className={`text-ygray-100 dark:text-white hover:opacity-100 transition-opacity cursor-pointer w-4 h-4 opacity-20 ${theme === 'dark' ? '' : 'hidden'}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M120.2 154.2c4.672 4.688 10.83 7.031 16.97 7.031S149.5 158.9 154.2 154.2c9.375-9.375 9.375-24.56 0-33.93L108.9 74.97c-9.344-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94L120.2 154.2zM256 112c13.25 0 24-10.75 24-24v-64C280 10.75 269.3 0 256 0S232 10.75 232 24v64C232 101.3 242.8 112 256 112zM112 256c0-13.25-10.75-24-24-24h-64C10.75 232 0 242.8 0 256s10.75 24 24 24h64C101.3 280 112 269.3 112 256zM374.8 161.2c6.141 0 12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.94s-24.59-9.375-33.94 0l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.93C362.5 158.9 368.7 161.2 374.8 161.2zM256 400c-13.25 0-24 10.75-24 24v64C232 501.3 242.8 512 256 512s24-10.75 24-24v-64C280 410.8 269.3 400 256 400zM120.2 357.8l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.94c4.688 4.688 10.83 7.031 16.97 7.031s12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.93S129.6 348.4 120.2 357.8zM488 232h-64c-13.25 0-24 10.75-24 24s10.75 24 24 24h64C501.3 280 512 269.3 512 256S501.3 232 488 232zM391.8 357.8c-9.344-9.375-24.56-9.372-33.94 .0031s-9.375 24.56 0 33.93l45.25 45.28c4.672 4.688 10.83 7.031 16.97 7.031s12.28-2.344 16.97-7.031c9.375-9.375 9.375-24.56 0-33.94L391.8 357.8zM256 144C194.1 144 144 194.1 144 256c0 61.86 50.14 112 112 112s112-50.14 112-112C368 194.1 317.9 144 256 144z'}></path></svg>
						</div>
					</div>
				</div>
			</div>
			<div className={'absolute -right-1 top-0 z-10 hidden md:block inset-y-0'}>
				<div className={'w-0.5 h-full bg-ygray-500 dark:bg-dark-500'} />
			</div>
			<div className={`w-full inset-x-0 transition-max-height duration-500 overflow-hidden bg-white dark:bg-dark-900 fixed ${isExpandedAnimation ? 'max-h-max shadow-sm' : 'max-h-0'}`}>
				{isExpanded ? (
					<div className={'block md:hidden px-6 relative'}>
						<MenuItems />
						<div className={'absolute top-0 right-5'}>
							<svg
								onClick={switchTheme}
								className={`text-ygray-100 dark:text-white hover:opacity-100 transition-opacity cursor-pointer w-4 h-4 opacity-20 ${theme === 'dark' ? 'hidden' : ''}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z'}></path></svg>

							<svg
								onClick={switchTheme}
								className={`text-ygray-100 dark:text-white hover:opacity-100 transition-opacity cursor-pointer w-4 h-4 opacity-20 ${theme === 'dark' ? '' : 'hidden'}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M120.2 154.2c4.672 4.688 10.83 7.031 16.97 7.031S149.5 158.9 154.2 154.2c9.375-9.375 9.375-24.56 0-33.93L108.9 74.97c-9.344-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94L120.2 154.2zM256 112c13.25 0 24-10.75 24-24v-64C280 10.75 269.3 0 256 0S232 10.75 232 24v64C232 101.3 242.8 112 256 112zM112 256c0-13.25-10.75-24-24-24h-64C10.75 232 0 242.8 0 256s10.75 24 24 24h64C101.3 280 112 269.3 112 256zM374.8 161.2c6.141 0 12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.94s-24.59-9.375-33.94 0l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.93C362.5 158.9 368.7 161.2 374.8 161.2zM256 400c-13.25 0-24 10.75-24 24v64C232 501.3 242.8 512 256 512s24-10.75 24-24v-64C280 410.8 269.3 400 256 400zM120.2 357.8l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.94c4.688 4.688 10.83 7.031 16.97 7.031s12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.93S129.6 348.4 120.2 357.8zM488 232h-64c-13.25 0-24 10.75-24 24s10.75 24 24 24h64C501.3 280 512 269.3 512 256S501.3 232 488 232zM391.8 357.8c-9.344-9.375-24.56-9.372-33.94 .0031s-9.375 24.56 0 33.93l45.25 45.28c4.672 4.688 10.83 7.031 16.97 7.031s12.28-2.344 16.97-7.031c9.375-9.375 9.375-24.56 0-33.94L391.8 357.8zM256 144C194.1 144 144 194.1 144 256c0 61.86 50.14 112 112 112s112-50.14 112-112C368 194.1 317.9 144 256 144z'}></path></svg>
						</div>
					</div>
				) : <div />}
			</div>
		</nav>
	);
}

export default Menu;
