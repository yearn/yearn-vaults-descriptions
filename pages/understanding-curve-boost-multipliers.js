import	React							from	'react';
import	Image							from	'next/image';
import	Rocket							from	'components/icons/Rocket';

function	Index() {
	return (
		<section>
			<div className={'w-full mt-20 pt-2'}>
				<div className={'flex flex-col'}>
					<div className={'mb-8'}>
						<Rocket width={40} height={40} />
					</div>
					<h1 className={'text-6xl text-ygray-100 font-bold'}>
						{'Understanding Curve'}
					</h1>
					<h1 className={'text-6xl text-ygray-100 font-bold mb-8'}>
						{'Boost Multipliers'}
					</h1>
					<div className={'max-w-xl space-y-6 mb-6'}>
						<p className={'text-ygray-200'}>
							{'Using the crvCOMP pool, as an example, liquidity providers earn approximately 12.82% APY in trading fees, and an additional 24.72% APY (as of the date of this publication) in the form of CRV rewards, if they stake their liquidity provider tokens in the Curve gauge.'}
						</p>
						<p className={'text-ygray-200'}>
							{'Depositors can boost the CRV rewards earned by locking CRV into the voting escrow module, with a max boost of '}
							<b>{'2.5x'}</b>
							{'. This size of the boost is dependent on the amount of CRV locked in the voter escrow, and the size of the deposit in the liquidity pool, however, this '}
							<a href={'https://dao.curve.fi/minter/calc'} target={'_blank'} rel={'noreferrer'} className={'cursor-pointer underline text-yblue'}>{'calculator'}</a>
							{' is useful in modeling potential boost multipliers. The max boost for the crvCOMP pool yields an additional 61.81% APY in the form of CRV rewards, which is displayed below.'}
						</p>
					</div>
					<div style={{width: 675, height: 60}}>
						<Image
							src={'/calculator.jpeg'}
							width={675}
							height={60} />
					</div>
					<div className={'max-w-xl space-y-6 mt-6 mb-12'}>
						<p className={'text-ygray-200'}>
							{'Yearn stakes the Curve liquidity provider token into the gauge to earn CRV rewards. 10% of these rewards are locked in our yveCRV-DAO vault (described above) to boost the rewards of all yVaults with Curve strategies.'}
						</p>
						<p className={'text-ygray-200'}>
							{'For more information on Curve boost multipliers please see Curve’s documentation for this topic — '}
							<a href={'https://hackmd.io/CawF8dfsSk2OlN7-ubjipQ'} target={'_blank'} rel={'noreferrer'} className={'cursor-pointer underline text-yblue'}>{'here'}</a>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Index;
