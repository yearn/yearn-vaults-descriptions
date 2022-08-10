import	React, {useContext, createContext}	from	'react';

const options = ['Ethereum', 'Fantom'];

const NETWORK_IDS: { [key: string]: number } = {
	'Ethereum': 1,
	'Fantom': 250,
	'Arbitrum': 42161
};

type TNetworkContext = {
	currentNetwork: string,
	currentChainId: number,
	set_currentNetwork?: React.Dispatch<React.SetStateAction<string>>
}

const	Network = createContext<TNetworkContext>({currentNetwork: options[0], currentChainId: NETWORK_IDS[options[0]]});

type TProps = {
  children: React.ReactNode;
}

export const NetworkContextApp: React.FC<TProps> = ({children}): React.ReactElement => {
	const	[currentNetwork, set_currentNetwork] = React.useState(options[0]);


	return (
		<Network.Provider
			value={{
				currentNetwork,
				currentChainId: NETWORK_IDS[currentNetwork],
				set_currentNetwork
			}}>
			{children}
		</Network.Provider>
	);
};

export const useNetwork = (): TNetworkContext => useContext(Network);
export default useNetwork;
