import	React						from	'react';
import	Image						from	'next/image';
import	{parseMarkdown}				from	'utils';
import	{listVaultsWithTokens}		from	'pages/api/tokens';
import	useNetwork					from	'contexts/useNetwork';
import	Navbar						from	'components/Navbar';
import	HeadIconCogs				from	'components/icons/HeadIconCogs';
import	IconChevron					from	'components/icons/IconChevron';

function	Details({tokensData, chainExplorer}) {
	const	wantToken = tokensData[1];

	return (
		<section>
			<div>
				<div className={'flex relative flex-col mt-4 ml-12'}>
					<div className={'mb-4 text-gray-blue-1 dark:text-gray-3'}>
						<div className={'mb-2'}>
							<a href={`${chainExplorer}/address/${wantToken.address}#code`} target={'_blank'} className={'inline text-yearn-blue hover:underline'} rel={'noreferrer'}>
								{wantToken.name}
							</a>
						</div>
						<div className={'w-full max-w-xl'}>
							{wantToken?.description ? 
								<p className={'inline text-xs'} dangerouslySetInnerHTML={{__html: parseMarkdown(wantToken?.description || '')}} />
								:
								<i className={'inline text-xs'} dangerouslySetInnerHTML={{__html: parseMarkdown('No description provided for this token.')}} />
							}
						</div>
					</div>
				</div>

			</div>
		</section>
	);
}

function	Tokens({vault, chainExplorer}) {
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
			className={`max-w-4xl w-full ${isExpanded ? 'bg-white-blue-1 dark:bg-black' : 'bg-white-blue-2 hover:bg-white-blue-1 dark:bg-black-1'} transition-colors p-4 rounded-sm mb-0.5`}>
			<div className={'flex flex-row items-center cursor-pointer'} onClick={onExpand}>
				<div className={'flex justify-center items-center mr-4 w-8'}>
					<Image
						src={vault.icon}
						width={32}
						height={32}
						loading={'eager'} />
				</div>
				<div className={'flex flex-row items-center space-x-2 text-dark-blue-1 dark:text-white'}>
					<p>{vault.display_name}</p>
					<p>{'—'}</p>
					<a
						onClick={e => e.stopPropagation()}
						className={'font-bold'}
						href={`${chainExplorer}/address/${vault.address}#code`}
						target={'_blank'}
						rel={'noreferrer'}>
						{vault.name}
					</a>
					{vault.tokens[0].ipfs ? null : 
						<span className={'py-1 px-2 ml-2 text-xs font-bold text-white bg-yearn-blue rounded-md'}>
							{'Missing IPFS file'}
						</span>}
				</div>
				<div className={'mr-1 ml-auto'}>
					<IconChevron className={isExpandedAnimation ? 'transform -rotate-90 transition-transform text-gray-blue-1 dark:text-gray-3 w-4 h-4' : 'transform -rotate-180 transition-transform text-gray-blue-1 dark:text-gray-3 w-4 h-4'} />
				</div>
			</div>
			<div className={`w-full transition-max-height duration-500 overflow-hidden ${isExpandedAnimation ? 'max-h-max' : 'max-h-0'}`}>
				{isExpanded ? (
					<Details tokensData={vault.tokens} vaultSymbol={vault.symbol} chainExplorer={chainExplorer} />
				) : <div />}
			</div>
		</div>
	);
}


function	Index({tokens}) {
	const	[data, set_data] = React.useState(tokens);
	const	[isFetchingData, set_isFetchingData] = React.useState(false);
	const	[chainExplorer, set_chainExplorer] = React.useState('https://etherscan.io');
	const	{currentNetwork} = useNetwork();

	async function	refetchData(_currentNetwork) {
		set_isFetchingData(true);
		const _data = await listVaultsWithTokens({network: _currentNetwork});
		set_data(JSON.parse(_data));
		set_isFetchingData(false);
	}
	function getNetworkInfo(network) {
		switch (network){
		case 'Ethereum': 
			return {
				'chainId' : 1,
				'explorerURL' : 'https://etherscan.io',
			};
		case 'Fantom' : 
			return {
				'chainId' : 250,
				'explorerURL' : 'http://ftmscan.com',
			};
		case 'Arbitrum' : 
			return {
				'chainId' : 42161,
				'explorerURL' : 'https://arbiscan.io/',
			};
		}
	}

	React.useEffect(() => {
		refetchData(getNetworkInfo(currentNetwork).chainId);
		set_chainExplorer(getNetworkInfo(currentNetwork).explorerURL);
	}, [currentNetwork]);

	return (
		<section className={'p-4 w-full bg-white dark:bg-black rounded-sm'}>
			<Navbar />
			<div>
				<div className={'w-full max-w-5xl'}>
					<div className={'flex flex-col'}>
						<div className={'mb-8'}>
							<HeadIconCogs className={'text-yearn-blue dark:text-white'} />
						</div>
						<div className={'w-full'}>
							<div className={'flex flex-col'}>
								<div className={'flex flex-row items-center mb-8 w-full'}>
									<h1 className={'text-4xl font-bold text-dark-blue-1 dark:text-white whitespace-pre-line md:text-6xl'}>
										{'Tokens'}
									</h1>
									<div
										className={'p-2 -m-2 ml-2'}
										style={{marginTop: -2}}
										onClick={() => refetchData(getNetworkInfo(currentNetwork).chainId)}>
										<svg aria-hidden={'true'} className={`w-4 h-4 text-ygray-300 dark:text-dark-50 opacity-30 hover:opacity-100 transition-opacity cursor-pointer ${isFetchingData ? 'animate animate-spin' : ''}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M449.9 39.96l-48.5 48.53C362.5 53.19 311.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.97 5.5 34.86-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c37.96 0 73 14.18 100.2 37.8L311.1 178C295.1 194.8 306.8 223.4 330.4 224h146.9C487.7 223.7 496 215.3 496 204.9V59.04C496 34.99 466.9 22.95 449.9 39.96zM441.8 289.6c-16.94-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-37.96 0-73-14.18-100.2-37.8L200 334C216.9 317.2 205.2 288.6 181.6 288H34.66C24.32 288.3 16 296.7 16 307.1v145.9c0 24.04 29.07 36.08 46.07 19.07l48.5-48.53C149.5 458.8 200.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z'}></path></svg>
									</div>
								</div>
								<div className={'mb-8 text-gray-blue-1 dark:text-gray-3'}>
									{'List of tokens with a missing description or IPFS file.'}
								</div>
							</div>
						</div>
					</div>
					
					<div className={'w-full'}>
						{(data || [])?.filter(e => e.hasMissingTokenInfo).map((vault) => (
							<Tokens key={vault.address} vault={vault} chainExplorer={chainExplorer} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Index;
