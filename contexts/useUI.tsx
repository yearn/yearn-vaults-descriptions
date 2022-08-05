import	React, {useEffect, useContext, createContext}	from	'react';
import	useLocalStorage									from	'hooks/useLocalStorage';

type TUIContext = {
	theme: string,
	switchTheme:  () => void;
}

const	UI = createContext<TUIContext | undefined>(undefined);

type TProps = {
  children: React.ReactNode;
}

export const UIContextApp: React.FunctionComponent<TProps> = ({children}): React.ReactElement => {
	const	[theme, set_theme] = useLocalStorage('theme', 'light-initial');

	useEffect((): void => {
		if (theme !== 'light-initial') {
			const lightModeMediaQuery = window.matchMedia('(prefers-color-scheme: light)');
			if (lightModeMediaQuery.matches)
				set_theme('light');
		}
	}, []);

	useEffect((): void => {
		if (theme === 'light') {
			document.documentElement.classList.add('light');
			document.documentElement.classList.remove('dark');
			document.documentElement.classList.remove('dark-initial');
		} else if (theme === 'dark' || theme === 'dark-initial') {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
		}
	}, [theme]);

	return (
		<UI.Provider
			value={{
				theme,
				switchTheme: (): void => set_theme((t): string => t === 'dark' ? 'light' : 'dark')
			}}>
			{children}
		</UI.Provider>
	);
};

export const useUI = (): TUIContext | undefined => useContext(UI);
export default useUI;


