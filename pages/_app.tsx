import	React, {ReactElement}			from	'react';
import  {AppProps}						from	'next/app';
import	{WithYearn}						from	'@yearn-finance/web-lib/contexts';
import	{LocalizationContextApp}		from	'contexts/useLocalization';
import	{MenuDesktop, MenuMobile}		from	'components/Menu';
import 	Meta 							from 	'components/Meta';
import	Footer							from	'components/StandardFooter';

import	'../style.css';

function	WithLayout(props: AppProps): ReactElement {
	const	{Component, pageProps, router} = props;

	return (
		<>
			<MenuMobile />
			<div id={'app'} className={'relative mx-auto mb-0 flex w-full max-w-6xl flex-col'}>
				<div className={'grid grid-cols-15 gap-x-4'}>
					<div className={'hidden md:col-span-3 md:block'}>
						<MenuDesktop />
					</div>
					<main className={'col-span-15 flex min-h-full flex-col pt-20 md:col-span-12 md:pt-12'}>
						<Component
							key={router.route}
							router={props.router}
							{...pageProps} />
						<div className={'static bottom-0 mt-auto grid grid-cols-12'}>
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
		<WithYearn options={{web3: {shouldUseWallets: false}}}>
			<LocalizationContextApp locale={router.locale}>
				<Meta/>
				<WithLayout
					Component={Component}
					pageProps={pageProps}
					router={props.router} />
			</LocalizationContextApp>
		</WithYearn>
	);
}

export default MyApp;
