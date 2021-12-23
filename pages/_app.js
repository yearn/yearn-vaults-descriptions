import	React							from	'react';
import	Head							from	'next/head';
import	{DefaultSeo}					from	'next-seo';
import	{NetworkContextApp}				from	'contexts/useNetwork';
import	Menu							from	'components/Menu';

import	'style/Default.css';
import	'tailwindcss/tailwind.css';

function	AppWrapper(props) {
	const	{Component, pageProps, router} = props;
	const	WEBSITE_URI = process.env.WEBSITE_URI;
	const	[language, set_language] = React.useState(router.locale || 'en-US');

	return (
		<>
			<Head>
				<title>{'Strategies Registry'}</title>
				<link rel={'icon'} href={'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧩</text></svg>'} />
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
				<meta name={'description'} content={'The Vaults at Yearn'} />
				<meta name={'msapplication-TileColor'} content={'#62688F'} />
				<meta name={'theme-color'} content={'#ffffff'} />
				<meta charSet={'utf-8'} />

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
				<Menu language={language} set_language={set_language} />
				<div className={'px-6 md:px-0 md:ml-10 w-full md:w-235.5 md:max-w-235.5 mb-16 pt-10 md:pt-0'}>
					<Component
						key={router.route}
						element={props.element}
						router={props.router}
						{...pageProps} />
				</div>
			</main>
		</>
	);
}

function	MyApp(props) {
	const	{Component, pageProps} = props;
	
	return (
		<NetworkContextApp>
			<AppWrapper
				Component={Component}
				pageProps={pageProps}
				element={props.element}
				router={props.router} />
		</NetworkContextApp>
	);
}


export default MyApp;
