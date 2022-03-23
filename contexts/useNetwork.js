import	React, {useContext, createContext}	from	'react';

const options = ['Ethereum', 'Fantom'];

const NETWORK_IDS = {
	'Ethereum': 1,
	'Fantom': 250
};

const	Network = createContext();
export const NetworkContextApp = ({children}) => {
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

export const useNetwork = () => useContext(Network);
export default useNetwork;
