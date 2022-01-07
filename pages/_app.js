import	React						from	'react';
import	Head						from	'next/head';
import	{DefaultSeo}				from	'next-seo';
import	{NetworkContextApp}			from	'contexts/useNetwork';
import	{UIContextApp}				from	'contexts/useUI';
import	{LocalizationContextApp}	from 'contexts/useLocalization';
import	Menu						from	'components/Menu';

import	'style/Default.css';
import	'tailwindcss/tailwind.css';

function	AppWrapper(props) {
	const	{Component, pageProps, router} = props;
	const	WEBSITE_URI = process.env.WEBSITE_URI;

	const	footerClassName = 'hover:underline text-opacity-60 dark:text-opacity-20 dark:hover:text-opacity-80 transition-opacity text-xs text-ygray-200 dark:text-white';

	return (
		<>
			<Head>
				<title>{'Strategies Registry'}</title>
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
				<meta name={'description'} content={'The Vaults at Yearn'} />
				<meta name={'msapplication-TileColor'} content={'#62688F'} />
				<meta name={'theme-color'} content={'#ffffff'} />
				<meta charSet={'utf-8'} />

				<link rel={'shortcut icon'} type={'image/x-icon'} href={'/favicons/favicon.ico'} />
				<link rel={'apple-touch-icon'} sizes={'180x180'} href={'/favicons/apple-touch-icon.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'32x32'} href={'/favicons/favicon-32x32.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'16x16'} href={'/favicons/favicon-16x16.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'192x192'} href={'/favicons/android-chrome-192x192.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'512x512'} href={'/favicons/android-chrome-512x512.png'} />

				<link rel={'preconnect'} href={'https://fonts.googleapis.com'} />
				<link rel={'preconnect'} href={'https://fonts.gstatic.com'} crossOrigin={'true'} />
				<link href={'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'} rel={'stylesheet'} />

				<meta name={'robots'} content={'index,nofollow'} />
				<meta name={'googlebot'} content={'index,nofollow'} />
				<meta charSet={'utf-8'} />
			</Head>
			<DefaultSeo
				title={'The Vaults at Yearn'}
				defaultTitle={'The Vaults at Yearn'}
				description={'The Vaults at Yearn'}
				openGraph={{
					type: 'website',
					locale: 'en_US',
					url: WEBSITE_URI,
					site_name: 'The Vaults at Yearn',
					title: 'The Vaults at Yearn',
					description: 'The Vaults at Yearn',
					images: [
						{
							url: `${WEBSITE_URI}og.png`,
							width: 1200,
							height: 675,
							alt: 'Yearn',
						}
					]
				}}
				twitter={{
					handle: '@iearnfinance',
					site: '@iearnfinance',
					cardType: 'summary_large_image',
				}} />
			<main id={'app'} className={'relative flex flex-col md:flex-row max-w-6xl mx-auto'} style={{minHeight: '100vh'}}>
				<Menu />
				<div className={'px-6 md:px-0 md:ml-10 w-full md:w-235.5 md:max-w-235.5 mb-16 pt-10 md:pt-0 pb-12 relative'}>
					<Component
						key={router.route}
						element={props.element}
						router={props.router}
						{...pageProps} />
					<div className={'absolute -bottom-12 md:-bottom-6 text-center left-0 right-0 flex justify-center items-center'}>
						<div className={'divide-x-0 md:divide-x divide-ygray-700 divide-opacity-20 grid grid-cols-3 gap-3 md:flex flex-row flex-wrap items-center justify-center'}>

							<a href={'https://github.com/yearn/yearn-vaults-descriptions'} target={'_blank'} rel={'noreferrer'} className={`${footerClassName} pr-0 md:pr-2`}>
								{'Github'}
							</a>

							<a href={'https://yearn.finance'} target={'_blank'} rel={'noreferrer'} className={`${footerClassName} px-0 md:px-2`}>
								{'Yearn.Finance'}
							</a>

							<a href={'https://contribute.yearn.rocks'} target={'_blank'} rel={'noreferrer'} className={`${footerClassName} px-0 md:px-2`}>
								{'Contribute'}
							</a>

							<a href={'https://yearnfinance.notion.site'} target={'_blank'} rel={'noreferrer'} className={`${footerClassName} px-0 md:px-2`}>
								{'Join Yearn'}
							</a>

							<a href={'https://yearn.watch'} target={'_blank'} rel={'noreferrer'} className={`${footerClassName} px-0 md:px-2`}>
								{'Yearn.Watch'}
							</a>

							<a href={'https://api.yearn.finance/v1/chains/1/vaults/all'} target={'_blank'} rel={'noreferrer'} className={`${footerClassName} pl-0 md:pl-2`}>
								{'Vaults API'}
							</a>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

function	MyApp(props) {
	const	{Component, pageProps} = props;
	
	return (
		<UIContextApp>
			<LocalizationContextApp router={props.router}>
				<NetworkContextApp>
					<AppWrapper
						Component={Component}
						pageProps={pageProps}
						element={props.element}
						router={props.router} />
				</NetworkContextApp>
			</LocalizationContextApp>
		</UIContextApp>
	);
}

export default MyApp;
