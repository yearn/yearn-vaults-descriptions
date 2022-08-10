import	React, {ReactElement}			from  'react';
import  {AppProps}								from  'next/app';
import	{WithYearn}								from	'@yearn-finance/web-lib/contexts';
import	{NetworkContextApp}				from	'contexts/useNetwork';
import	{UIContextApp}				    from	'contexts/useUI';
import	{LocalizationContextApp}	from  'contexts/useLocalization';
import	{MenuDesktop, MenuMobile}	from	'components/Menu';
import 	Meta 											from 	'components/Meta';
import	Footer										from	'components/StandardFooter';

import	'style/Default.css';

function	WithLayout(props: AppProps): ReactElement {
	const	{Component, pageProps, router} = props;

	return (
		<>
			<MenuMobile />
			<div id={'app'} className={'flex relative flex-col mx-auto mb-0 w-full max-w-6xl'}>
				<div className={'grid grid-cols-15 gap-x-4'}>
					<div className={'hidden md:block md:col-span-3'}>
						<MenuDesktop />
					</div>
					<main className={'flex flex-col col-span-15 pt-20 min-h-full md:col-span-12 md:pt-12'}>
						<Component
							key={router.route}
							router={props.router}
							{...pageProps} />
						<div className={'grid static bottom-0 grid-cols-12 mt-auto'}>
							<div className={'col-span-12'}>
								<Footer />
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
}

function	MyApp(props: AppProps): ReactElement {
	const	{Component, pageProps, router} = props;
	
	return (
		<WithYearn
			options={{
				web3: {
					shouldUseWallets: true,
					shouldUseStrictChainMode: false,
					defaultChainID: 1,
					supportedChainID: [1, 250, 42161, 1337, 31337]
				}
			}}>
			<UIContextApp>
				<LocalizationContextApp locale={router.locale}>
					<NetworkContextApp>
						<Meta/>
						<WithLayout
							Component={Component}
							pageProps={pageProps}
							router={props.router} />
					</NetworkContextApp>
				</LocalizationContextApp>
			</UIContextApp>
		</WithYearn>
	);
}

export default MyApp;
