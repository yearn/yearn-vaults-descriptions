import	React			from	'react';
import	{useRouter}		from	'next/router';
import	Link			from	'next/link';

function	MenuItem({label, condition, href, className, height = 'h-6'}) {
	return (
		<Link href={href}>
			<div className={`${condition ? 'text-yblue font-bold' : 'text-ygray-200'} cursor-pointer relative w-full ${className}`}>
				{label}
				<div className={'absolute top-0 z-20'} style={{right: 3}}>
					<div className={`w-1 ${height} bg-yblue rounded-sm ${condition ? 'opacity-100' : 'opacity-0'}`} />
				</div>
			</div>
		</Link>
	);
}

function	Menu() {
	const router = useRouter();

	return (
		<nav className={'w-64.5'}>
			<div className={'fixed w-64.5'}>
				<div className={'relative w-full'}>
					<Link href={'/'}>
						<h1 className={'text-ygray-100 font-bold mb-10 pt-8 cursor-pointer'}>
							{'The Vaults at '}
							<span className={'text-yblue'}>{'Yearn'}</span>
						</h1>
					</Link>
					<MenuItem
						className={'mb-4'}
						label={'Overview'}
						condition={router.pathname === '/'}
						href={'/'} />
					<MenuItem
						className={'mb-4'}
						label={'Yearn and Curve'}
						condition={router.pathname === '/yearn-and-curve'}
						href={'/yearn-and-curve'} />
					<MenuItem
						className={'mb-8'}
						height={'h-12'}
						label={'Curve Boost Multipliers'}
						condition={router.pathname === '/curve-boost-multipliers'}
						href={'/curve-boost-multipliers'} />

					<p className={'text-ygray-400 mb-4'}>{'Ethereum Vaults'}</p>
					<div className={'ml-4 space-y-4 mb-8'}>
						<MenuItem
							label={'Vaults'}
							condition={router.pathname === '/ethereum/vaults'}
							href={'/ethereum/vaults'} />
						<MenuItem
							label={'Curve Finance Based Vaults'}
							condition={router.pathname === '/ethereum/curve-finance-based-vaults'}
							href={'/ethereum/curve-finance-based-vaults'} />
						<MenuItem
							label={'Retired Vaults'}
							condition={router.pathname === '/ethereum/retired-vaults'}
							href={'/ethereum/retired-vaults'} />
						<MenuItem
							label={'v1 Vaults'}
							condition={router.pathname === '/ethereum/v1-vaults'}
							href={'/ethereum/v1-vaults'} />
					</div>

					<p className={'text-ygray-400 mb-4'}>{'Fantom Vaults'}</p>
					<div className={'ml-4 space-y-4 mb-8'}>
						<MenuItem
							label={'Vaults'}
							condition={router.pathname === '/fantom/vaults'}
							href={'/fantom/vaults'} />
					</div>
				</div>
				<div className={'absolute right-1 top-0 z-10'}>
					<div className={'w-0.5 h-screen bg-ygray-500'} />
				</div>
			</div>
		</nav>
	);
}

export default Menu;
