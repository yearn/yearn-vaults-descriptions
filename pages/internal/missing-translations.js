import	React							from	'react';
import	Navbar							from	'components/Navbar';
import	HeadIconCogs					from	'components/icons/HeadIconCogs';
import	useNetwork						from	'contexts/useNetwork';
import	IconChevron						from	'components/icons/IconChevron';
import	IconLinkOut						from	'components/icons/IconLinkOut';
import	{filterProtocolsWithMissingTranslations, listProtocols} from 'pages/api/protocols';
import	LOCALES							from	'utils/locale';

const META_GH_PROTOCOL_URI = `${process.env.META_GITHUB_URL}/tree/master/data/protocols`;

function Protocol({name, filename, description, missingTranslationsLocales}) {
	const {currentChainId} = useNetwork();
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
			className={`max-w-4xl w-full ${isExpanded ? 'bg-white-blue-1 dark:bg-black' : 'bg-white-blue-2 hover:bg-white-blue-1 dark:bg-black-1'} transition-colors p-4 rounded-sm mb-0.5`}>
			<div className={'group flex flex-row items-center cursor-pointer'} onClick={onExpand}>
				<p className={'mr-2 dark:text-white break-words text-dark-blue-1'}>
					<b className={'font-bold'}>{name}</b>
				</p>
				<span className={'py-1 px-2 ml-2 text-xs font-bold text-white rounded-md dark:text-gray-3 bg-yearn-blue'}>
					{`Missing ${missingTranslationsLocales.length} translations`}
				</span>
				<div className={'flex flex-row justify-center mr-1 ml-auto'}>
					<a
						onClick={e => e.stopPropagation()}
						target={'_blank'}
						href={`${META_GH_PROTOCOL_URI}/${currentChainId}/${filename}.json`}
						rel={'noreferrer'}>
						<IconLinkOut className={'mr-4 w-4 h-4 text-yearn-blue'} />
					</a>
					<IconChevron className={isExpandedAnimation ? 'transform -rotate-90 transition-transform text-gray-blue-1 dark:text-gray-3 w-4 h-4' : 'transform -rotate-180 transition-transform text-gray-blue-1 dark:text-gray-3 w-4 h-4'} />
				</div>
			</div>
			<div className={`w-full transition-max-height duration-500 overflow-hidden ${isExpandedAnimation ? 'max-h-max' : 'max-h-0'}`}>
				{isExpanded ? (
					<div className={'mt-4 space-y-2'}>
						<p>{description}</p>
						<p className={'text-xs'}>{`Missing translations for ${missingTranslationsLocales.map(data => data.name).join(', ')}`}</p>
					</div>
				) : <div />}
			</div>
		</div>
	);	
}

function	Index({protocolsList}) {
	const	[protocols, set_protocols] = React.useState(protocolsList ?? []);
	const [localeFilter, set_localeFilter] = React.useState('');
	const	[isFetchingData, set_isFetchingData] = React.useState(false);
	const	{currentNetwork} = useNetwork();

	async function	refetchData(_currentNetwork) {
		set_isFetchingData(true);
		const _data = await listProtocols(_currentNetwork);
		set_protocols(_data);

		set_isFetchingData(false);
	}

	const protocolsWithMissingTranslations = React.useMemo(() => {
		return filterProtocolsWithMissingTranslations(protocols, localeFilter);
	}, [protocols, localeFilter]);

	React.useEffect(() => {
		refetchData(currentNetwork === 'Ethereum' ? 1 : currentNetwork === 'Fantom' ? 250 : 1);
	}, [currentNetwork]);

	return (
		<section className={'p-4 w-full bg-white dark:bg-black rounded-sm'}>
			<Navbar />
			<div>
				<div className={'w-full max-w-5xl'}>
					<div className={'flex flex-col'}>
						<div className={'mb-8'}>
							<HeadIconCogs className={'dark:text-white text-yearn-blue'} />
						</div>
						<div className={'w-full'}>
							<div className={'flex flex-col'}>
								<div className={'flex flex-row items-center mb-8 w-full'}>
									<h1 className={'text-4xl font-bold dark:text-white whitespace-pre-line md:text-6xl text-dark-blue-1'}>
										{'Translations'}
									</h1>
									<div
										className={'p-2 -m-2 ml-2'}
										style={{marginTop: -2}}
										onClick={() => refetchData(currentNetwork === 'Ethereum' ? 1 : currentNetwork === 'Fantom' ? 250 : 1)}>
										<svg aria-hidden={'true'} className={`w-4 h-4 text-ygray-300 dark:text-dark-50 opacity-30 hover:opacity-100 transition-opacity cursor-pointer ${isFetchingData ? 'animate animate-spin' : ''}`} role={'img'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 512 512'}><path fill={'currentColor'} d={'M449.9 39.96l-48.5 48.53C362.5 53.19 311.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.97 5.5 34.86-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c37.96 0 73 14.18 100.2 37.8L311.1 178C295.1 194.8 306.8 223.4 330.4 224h146.9C487.7 223.7 496 215.3 496 204.9V59.04C496 34.99 466.9 22.95 449.9 39.96zM441.8 289.6c-16.94-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-37.96 0-73-14.18-100.2-37.8L200 334C216.9 317.2 205.2 288.6 181.6 288H34.66C24.32 288.3 16 296.7 16 307.1v145.9c0 24.04 29.07 36.08 46.07 19.07l48.5-48.53C149.5 458.8 200.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z'}></path></svg>
									</div>
								</div>
								<div className={'mb-8 text-gray-blue-1 dark:text-gray-3'}>
									{`List of protocols with no translations or missing translations. (Found ${protocolsWithMissingTranslations.length})`}
								</div>
								<div className={'flex flex-row items-center space-x-4'}>
									<p className={'font-bold'}>{'Filter by locale'}</p>
									<select
										value={localeFilter}
										onChange={e => set_localeFilter(e.target.value)}
										className={'flex items-center py-2 px-3 pr-7 m-0 mr-1 w-24 text-xs font-semibold whitespace-nowrap rounded-sm border-none cursor-pointer button-light'}
									>
										<option className={'cursor-pointer'} value={''}>{'All'}</option>
										{Object.entries(LOCALES).map(([locale, localeData], index) => (
											<option className={'cursor-pointer'} key={index} value={locale}>{localeData.name}</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>
					<div className={'mt-4 w-full'}>
						{protocolsWithMissingTranslations.map(protocol => <Protocol key={protocol.name} {...protocol} />)}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Index;
