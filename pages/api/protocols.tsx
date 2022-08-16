/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';
import LOCALES from 'utils/locale';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function listProtocols(chainId: number): Promise<any> {
	const protocolApiUrl = `${process.env.META_API_URL}/${chainId}/protocols`;
	return await axios.get(`${protocolApiUrl}/all?loc=all`).then(res => res.data);
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
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			...protocol as any[],
			missingTranslationsLocales
		};
	}).filter(protocol => {
		if (localeFilter) {
			return protocol.missingTranslationsLocales.some(localeData => localeData.code.toLowerCase() === localeFilter.toLowerCase());
		}

		return protocol.missingTranslationsLocales.length > 0;
	});
}

// @ts-ignore
function findProtocolMissingTranslations(protocol) {
	const missingTranslations = [];
	const englishDescription = protocol.description;

	for (const [locale, translation] of Object.entries(protocol.localization ?? {})) {
		// @ts-ignore
		if (!translation.description || (locale != 'en' && englishDescription === translation.description)) {
			// @ts-ignore
			missingTranslations.push(LOCALES[locale]);
		}
	}

	return missingTranslations;
}
