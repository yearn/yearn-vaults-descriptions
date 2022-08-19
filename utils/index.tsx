import	{ethers}	from	'ethers';

export const toAddress = (address: string | undefined): string => {
	if (!address) {
		return ethers.constants.AddressZero;
	}
	if (address === 'GENESIS') {
		return ethers.constants.AddressZero;
	}
	try {
		return ethers.utils.getAddress(address);	
	} catch (error) {
		return ethers.constants.AddressZero;
	}
};

export function truncateHex(address: string | undefined, size: number): string {
	if (address !== undefined) {
		return `${address.slice(0, size)}...${address.slice(-size)}`;
	}
	return '0x000...0000';
}

export function	parseMarkdown(markdownText: string): string {
	const htmlText = markdownText
		.replace(/\[(.*?)\]\((.*?)\)/gim, "<a class='hover:underline cursor-pointer text-primary-500' target='_blank' href='$2'>$1</a>")
		.replace(/~~(.*?)~~/gim, "<span class='text-yblue'>$1</span>")
		.replace(/\*\*(.*?)\*\*/gim, "<span class='font-bold'>$1</span>")
		;

	return htmlText.trim();
}

export function	parseMarkdownUnset(markdownText: string): string {
	const htmlText = markdownText
		.replace(/\[(.*?)\]\((.*?)\)/gim, "<a class='underline cursor-pointer' target='_blank' href='$2'>$1</a>")
		.replace(/~~(.*?)~~/gim, '<span>$1</span>')
		.replace(/\*\*(.*?)\*\*/gim, "<span class='font-bold'>$1</span>")
		;

	return htmlText.trim();
}

export const isObjectEmpty = (obj: object | undefined | null): boolean => !obj || JSON.stringify(obj) === '{}';

export const sum = (...args: number[]): number => [...args, 0].reduce((a, b): number => a + b);

// export const sortByKey = (arr: object[], k: string, order = 1): object[] => arr.concat().sort((a, b): number => (a[k] > b[k]) ? order : ((a[k] < b[k]) ? -order : 0));

export function	formatAmount(amount: number, decimals = 2): string {
	let		locale = 'fr-FR';
	if (typeof(navigator) !== 'undefined')
		locale = navigator?.language || 'fr-FR';
	return (new Intl.NumberFormat([locale, 'en-US'], {minimumFractionDigits: 0, maximumFractionDigits: decimals}).format(amount));
}
export function	formatDate(value: number | Date, withDate = true): string {
	if (withDate)
		return (new Intl.DateTimeFormat('fr', {dateStyle: 'short', timeStyle: 'short', hourCycle: 'h24'}).format(value));
	return (new Intl.DateTimeFormat('fr', {dateStyle: 'short', hourCycle: 'h24'}).format(value));
}