import	React			from	'react';
import	{useRouter}		from	'next/router';
import	useNetwork		from	'contexts/useNetwork';

const options = ['Ethereum', 'Fantom'];
const routerMapping = {
	'/internal/missing-descriptions': 'Strategies',
	'/internal/missing-ape': 'Strategies ape.tax',
	'/internal/missing-tokens': 'Tokens',
	'/internal/missing-translations': 'Translations'
};

function	Navbar() {
	const {currentNetwork, set_currentNetwork} = useNetwork();
	const router = useRouter();

	return (
		<nav className={'flex relative flex-col w-full'}>
			<div className={'flex absolute right-0 flex-row justify-between w-full'}>
				<div />
				<div className={'flex flex-row space-x-2 h-full'}>
					<div className={'flex flex-row justify-start items-center h-full'} key={routerMapping[router.pathname]}>
						<select
							value={routerMapping[router.pathname]}
							className={'flex items-center py-2 px-3 pr-7 m-0 mr-1 text-xs font-semibold whitespace-nowrap rounded-sm border-none cursor-pointer button-light'}
							onChange={e => {
								if (e.target.value === 'Strategies')
									router.push('/internal/missing-descriptions');
								else if (e.target.value === 'Strategies ape.tax')
									router.push('/internal/missing-ape');
								else if (e.target.value === 'Tokens')
									router.push('/internal/missing-tokens');
								else if (e.target.value === 'Translations')
									router.push('/internal/missing-translations');
							}}>
							{Object.entries(routerMapping).map(([key, value]) => (
								<option className={'cursor-pointer'} key={key} value={value}>
									{value}
								</option>
							))}
						</select>
					</div>
					<div className={'flex flex-row justify-start items-center h-full'}>
						<select
							value={currentNetwork}
							className={'flex items-center py-2 px-3 pr-7 m-0 mr-1 text-xs font-semibold whitespace-nowrap rounded-sm border-none cursor-pointer button-light'}
							onChange={e => set_currentNetwork(e.target.value)}>
							{options.map((chain, index) => (
								<option className={'cursor-pointer'} key={index} value={chain}>{chain}</option>
							))}
						</select>
					</div>
				</div>

			</div>

		</nav>
	);
}

export default Navbar;
