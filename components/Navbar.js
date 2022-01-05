import	React			from	'react';
import	{useRouter}		from	'next/router';
import	useNetwork		from	'contexts/useNetwork';

const options = ['Ethereum', 'Fantom'];
const routerMapping = {
	'/internal/missing-descriptions': 'Strategies',
	'/internal/missing-ape': 'Strategies ape.tax',
	'/internal/missing-tokens': 'Tokens',
};

function	Navbar() {
	const {currentNetwork, set_currentNetwork} = useNetwork();
	const router = useRouter();

	return (
		<nav className={'w-full flex flex-col relative'}>
			<div className={'justify-between flex flex-row w-full absolute right-0'}>
				<div />
				<div className={'flex flex-row space-x-2 h-full'}>
					<div className={'items-center justify-start flex-row flex h-full'} key={routerMapping[router.pathname]}>
						<select
							value={routerMapping[router.pathname]}
							className={'m-0 mr-2 px-3 py-2 items-center leading-4 cursor-pointer whitespace-nowrap border border-solid border-ygray-500 text-xs bg-white font-semibold text-ygray-700 pr-7 hidden md:flex'}
							onChange={e => {
								if (e.target.value === 'Strategies')
									router.push('/internal/missing-descriptions');
								else if (e.target.value === 'Strategies ape.tax')
									router.push('/internal/missing-ape');
								else if (e.target.value === 'Tokens')
									router.push('/internal/missing-tokens');
							}}>
							{Object.entries(routerMapping).map(([key, value]) => (
								<option className={'cursor-pointer'} key={key} value={value}>
									{value}
								</option>
							))}
						</select>
					</div>
					<div className={'items-center justify-start flex-row flex h-full'}>
						<select
							value={currentNetwork}
							className={'m-0 mr-2 px-3 py-2 items-center leading-4 cursor-pointer whitespace-nowrap border border-solid border-ygray-500 text-xs bg-white font-semibold text-ygray-700 pr-7 hidden md:flex'}
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
