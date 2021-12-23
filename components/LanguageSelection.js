import	React, {Fragment, useRef}		from	'react';
import	{useRouter}						from	'next/router';
import	{Dialog, Transition}			from	'@headlessui/react';
import	LOCALES							from	'utils/locale';
import	useLocalization					from	'contexts/useLocalization';

function	LanguageSelection({open, set_open}) {
	const	ref = useRef();
	const	router = useRouter();
	const	{language, set_language} = useLocalization();

	function	onSwitchLanguage(selectedLanguage) {
		set_language(selectedLanguage);
		set_open(false);
		router.push(router.pathname, router.pathname, {locale: selectedLanguage});
	}

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as={'div'}
				static
				className={'fixed z-10 inset-0 overflow-y-auto'}
				style={{zIndex: 9999999}}
				initialFocus={ref}
				open={open}
				onClose={set_open}>
				<div className={'flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'}>
					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'} enterFrom={'opacity-0'} enterTo={'opacity-100'}
						leave={'ease-in duration-200'} leaveFrom={'opacity-100'} leaveTo={'opacity-0'}>
						<Dialog.Overlay className={'fixed inset-0 bg-opacity-50 bg-ygray-100 transition-opacity'} />
					</Transition.Child>

					<span className={'hidden sm:inline-block sm:align-middle sm:h-screen'} aria-hidden={'true'}>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter={'ease-out duration-300'}
						enterFrom={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}
						enterTo={'opacity-100 translate-y-0 sm:scale-100'}
						leave={'ease-in duration-200'}
						leaveFrom={'opacity-100 translate-y-0 sm:scale-100'}
						leaveTo={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}>
						<div className={'inline-block align-bottom bg-white text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:mb-96 font-sans rounded-lg shadow-2xl'}>
							<div className={'mt-2 font-sans font-bold text-lg text-ygray-100 px-6 pt-2 uppercase'}>
								{LOCALES[language].selectTitle}
							</div>

							<div className={'flex-wrap p-6 pt-3 grid grid-cols-2'}>
								{Object.values(LOCALES).map((locale) => (
									<div
										key={locale.code}
										onClick={() => onSwitchLanguage(locale.code)}
										className={'bg-fadeWhite hover:bg-ygray-50 cursor-pointer border border-white flex flex-col justify-center items-center transition-colors p-6 text-center'}>
										{locale.flag}
										<div className={'mt-4 font-sans font-bold text-xl text-ygray-100'}>
											{locale.name}
										</div>
									</div>	
								))}
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}


export default LanguageSelection;