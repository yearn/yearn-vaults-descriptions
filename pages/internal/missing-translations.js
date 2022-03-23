import	React							from	'react';
import	Navbar							from	'components/Navbar';
import	HeadIconCogs					from	'components/icons/HeadIconCogs';
import	useNetwork						from	'contexts/useNetwork';
import {filterProtocolsWithMissingTranslations, listProtocols} from 'pages/api/protocols';


function	Index({protocolsList}) {
	const	[protocols, set_protocols] = React.useState(protocolsList ?? []);
	const [protocolsWithMissingTranslations, set_protocolsWithMissingTranslations] = React.useState();
	const [filterLocale, set_filterLocale] = React.useState('');
	const	[isFetchingData, set_isFetchingData] = React.useState(false);
	const	{currentNetwork} = useNetwork();

	async function	refetchData(_currentNetwork) {
		set_isFetchingData(true);
		const _data = await listProtocols(_currentNetwork);
		set_protocols(_data);

		const _protocolsWithMissingTranslations = filterProtocolsWithMissingTranslations(_data);
		set_protocolsWithMissingTranslations(_protocolsWithMissingTranslations);

		set_isFetchingData(false);
	}

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
									{'List of protocols with no translations or missing translations.'}
								</div>
							</div>
						</div>
					</div>
					<div className={'w-full'}>
						{'Todo: render translations here'}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Index;
