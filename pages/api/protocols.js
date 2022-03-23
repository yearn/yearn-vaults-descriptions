const BASE_API_URL = 'https://meta.yearn.network';

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
	const names = (await (await fetch(`${protocolApiUrl}/index`)).json())['files'];

	if (!(names instanceof Array)) {
		console.warn('names is not an array.');
		return [];
	}

	const protocolPromises = names.map(async (name) => {
		return  fetch(`${protocolApiUrl}/${name}`).then(res => res.json());
	});

	return Promise.all(protocolPromises);
}

/**
 * Return protocols with no or missing translations
 * 
 * A "missingTranslationsLocales" field will be added for each protocol with missing translations
 */
export function filterProtocolsWithMissingTranslations(protocols, locale) {
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
	}).filter(protocol => protocol.missingTranslationsLocales.length > 0 || protocol.missingTranslationsLocales.includes(locale));
}

function findProtocolMissingTranslations(protocol) {
	const missingTranslations = [];
	const englishDescription = protocol.description;

	for (const [locale, translation] of Object.entries(protocol.localization ?? {})) {
		if (!translation.description || (locale != 'en' && englishDescription === translation.description)) {
			missingTranslations.push(locale);
		}
	}

	return missingTranslations;
}
