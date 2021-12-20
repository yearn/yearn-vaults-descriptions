import	React							from	'react';
import	Image							from	'next/image';
import	Link							from	'next/link';
import	IconEth							from	'components/icons/IconEth';
import	LogoYearn						from	'components/icons/LogoYearn';
import	Rocket							from	'components/icons/Rocket';

function	Index() {
	return (
		<section>
			<div className={'w-full mt-10 md:mt-20 pt-2'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<IconEth />
					</div>
					<h1 className={'text-4xl md:text-6xl text-ygray-100 font-bold mb-8'}>
						{'Ethereum Vaults'}
					</h1>
					<div className={'max-w-xl space-y-6 mb-8'}>
						<p className={'text-ygray-200'}>
							{'Yearn Finance started and has the majority of its yVaults running on Ethereum Mainnet. We have deployed over 250 strategies and 100 yVaults on Ethereum. The ones that are currently running in production you can find in the sections below.'}
						</p>
					</div>
				</div>

				<div className={'flex flex-col mt-16'}>
					<div className={'mb-8 flex flex-row items-center'}>
						<LogoYearn />
						<svg className={'mx-4'} width={'32'} height={'34'} viewBox={'0 0 32 34'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
							<path d={'M20.6875 12.5312H31.9688V20.6875H20.6875V33.4375H12.0938V20.6875H0.78125V12.5312H12.0938V0.3125H20.6875V12.5312Z'} fill={'#333333'}/>
						</svg>
						<Image
							src={'/CRV.png'}
							width={40}
							height={40}
							loading={'eager'} />
					</div>
					<h1 className={'text-4xl md:text-6xl text-ygray-100 font-bold mb-8'}>
						{'Yearn and Curve Synergy'}
					</h1>
					<div className={'max-w-xl space-y-6 mb-8'}>
						<p className={'text-ygray-200'}>
							{'One of the critical components of Yearn’s infrastructure includesa collaborative relationship with '}
							<a href={'https://curve.fi/'} target={'_blank'} rel={'noreferrer'} className={'cursor-pointer underline text-yblue'}>{'Curve.fi'}</a>
							{'. Several Yearn vaults provide liquidity into Curve pools and stake the liquidity provider (LP) tokens into the respective gauges, earning CRV rewards.'}
						</p>
						<p className={'text-ygray-200'}>
							{'Yearn locks 10% of all CRV rewards earned into the yveCRV-DAO (“Backscratcher”) to obtain an additional amount of CRV.'}
						</p>
						<p className={'text-ygray-200 lg:whitespace-nowrap'}>
							{'In the strategy descriptions below, vaults that are boosted are indicated with a'}
							<Rocket className={'inline mb-1 ml-2'} />
						</p>
						<p className={'text-ygray-200'}>
							{'For a deeper understanding, refer to the '}
							<Link href={'/understanding-curve'} className={'italic'}>
								<i>
									{'Understanding Curve Boost Multipliers'}
								</i>
							</Link>
							{' section near the end of this section.'}
						</p>
						<p className={'text-ygray-200'}>
							{'Furthermore, the remaining 90% of the CRV earned are swapped into the respective LP tokens, and re-deposited into the vault. The only exception is the yvUSDN3Crv vault that locks 50% of the CRV earned into the Backscratcher vault and swaps the remaining 50%.'}
						</p>

					</div>
				</div>

				<div className={'flex flex-col mt-16'}>
					<div className={'mb-8 flex flex-row items-center h-10 w-10'}>
						<Image
							src={'/yveCRV.png'}
							width={40}
							height={40}
							loading={'eager'} />
					</div>
					<h1 className={'text-4xl md:text-6xl text-ygray-100 font-bold'}>
						{'veCRV-DAO yVault'}
					</h1>
					<h2 className={'text-4xl md:text-6xl text-ygray-100 font-bold mb-6'}>
						{'(yveCRV-DAO)'}
					</h2>
					<i className={'text-ygray-200 mb-8'}>{'AKA — Backscratcher'}</i>

					<div className={'max-w-xl w-full space-y-6 mb-8'}>
						<p className={'text-ygray-200'}>
							{'This vault converts your CRV into yveCRV, earning you a continuous share of Curve fees which are boosted over what you earn staking at Curve. The more CRV converted, the greater your weekly rewards. Every Friday, these can be claimed from the vault as 3Crv (Curve’s 3pool LP token).'}
						</p>
						<p className={'text-ygray-200'}>
							{'Yearn, itself, deposits 10% of all CRV earned into this vault and gives its 3crv rewards to vault token holders which is where the boosted weekly rewards come from.'}
						</p>
						<p className={'text-ygray-200'}>
							{'Depositing is non-reversible: You can only convert CRV into yveCRV, as the CRV is perpetually staked in Curve’s voting escrow. All vaults send 10% of earned CRV to this vault to sustain boost levels.'}
						</p>
						<p className={'text-ygray-200'}>
							{'For more detailed information see this medium article: '}
							<a href={'https://medium.com/iearn/thats-boost-folks-7afae75db826'} target={'_blank'} rel={'noreferrer'} className={'cursor-pointer underline text-yblue'}>{'https://medium.com/iearn/thats-boost-folks-7afae75db826'}</a>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Index;
