import LOCALES from 'utils/locale';

const BASE_API_URL = process.env.META_API_URL;

/**
 * Return all protocols of that network
 * 
 * Example protocol data:
 * 
 * {
 *   "$schema": "protocol",
 *   "name": "0xDAO",
 *   "description": "0xDAO is a protocol that is pooling money to distribute a Solidly NFT's token emissions via their governance token OXD.",
 *   "localization": {
 *    "en": {
 *      "name": "0xDAO",
 *      "description": "0xDAO is a protocol that is pooling money to distribute a Solidly NFT's token emissions via their governance token OXD."
 *    },
 *    ...
 *    }
 * }
 */
export async function listProtocols(chainId) {
	const protocolApiUrl = `${BASE_API_URL}/protocols/${chainId}`;
	const protocolFilenames = (await (await fetch(`${protocolApiUrl}/index`)).json())['files'];

	if (!(protocolFilenames instanceof Array)) {
		console.warn('protocolFilenames is not an array.');
		return [];
	}

	const protocolPromises = protocolFilenames.map(async (name) => {
		return  fetch(`${protocolApiUrl}/${name}`).then(async (res) => {
			const data = await res.json();
			return {
				...data,
				filename: name
			};
		});
	});

	return Promise.all(protocolPromises);
}

/**
 * Return protocols with no or missing translations
 * 
 * A "missingTranslationsLocales" field will be added for each protocol with missing translations
 */
export function filterProtocolsWithMissingTranslations(protocols = [], localeFilter = '') {
	if (!(protocols instanceof Array)) {
		console.warn('protocols is not an array.');
		return [];
	}
  
	return protocols.map(protocol => {
		const missingTranslationsLocales = findProtocolMissingTranslations(protocol);

		return {
			...protocol,
			missingTranslationsLocales
		};
	}).filter(protocol => {
		if (localeFilter) {
			return protocol.missingTranslationsLocales.some(localeData => localeData.code.toLowerCase() === localeFilter.toLowerCase());
		}

		return protocol.missingTranslationsLocales.length > 0;
	});
}

function findProtocolMissingTranslations(protocol) {
	const missingTranslations = [];
	const englishDescription = protocol.description;

	for (const [locale, translation] of Object.entries(protocol.localization ?? {})) {
		if (!translation.description || (locale != 'en' && englishDescription === translation.description)) {
			missingTranslations.push(LOCALES[locale]);
		}
	}

	return missingTranslations;
}
