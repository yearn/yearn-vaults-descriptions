# Vaults at Yearn
> Welcome to The Vaults at Yearn  
> Here you can find in-depth information about how Yearn’s yVaults operateand the actions (strategies) these vaults perform.  
> This website will maintain a one-stop location for all yVault descriptions. All version 1 yVaults have been deprecated, and any in production are now on version 2.

# How to - Dev
1. Clone the repo
2. Install the dependencies: `yarn`
3. Run the project in dev mode: `yarn run dev`
4. *Optional*: to test in prod mode, run `yarn run build && yarn run start`

# How to - Add translations
This project integrate a custom translation system, based on some standard and localization standards. New locales must be manually added and integrated.  
All translations are stored in the `localization/[locale]` folder. Right now only the `common.json` file is used.  
`[locale]` should be replaced with the locale code, e.g. `en`, `es`, `fr`. Codes can be found [here](http://www.lingoes.net/en/translator/langcode.htm).  
Fallback for missing translations is the `en` locale.

#### Create the translation file
- **If the locale file exists**, aka `[locale]/common.json`, you can just check the missing translations from the reference file (`en/common.json`) and add them.  
- **If the locale file does not exist**, you first need to create a new folder with your locale code, copy the `_common.json` file in it and rename it to `common.json`. Then, you can start translating.

#### Add the locale to the list of supported locale
Once the translation is done, you will need to ensure the app will recognize the new locale. To do so, you first need to check if the file `utils/locales.js` is updated and contains your locale. This file contain an object following this structure:
```js
	'ru': { //Id of the locale
		'code': 'ru', //Iso code of the locale, the same as for the [locale] folder
		'name': 'Русский', //Name of the locale, in locale language
		'symbol': 'Ru', //Symbol of the locale, which will be displayed on the language selection menu
	},
```
If not, just apprend the new locale to the object.  

#### Enable locale in auto-detection
In order to be able to auto-detect the locale and redirect the users browser to the correct locale, you need to add the locale Iso code to the `i18n.locales` array in the `next.config.js` file.
```diff
	i18n: {
+		locales: ['en', 'fr', 'es', 'ru'],
		defaultLocale: 'en',
	},
```