import { getLocaleFromQueryString, init, isLoading, locale, register } from 'svelte-i18n';

register('vi', () => import('./locales/vi.json'));
register('en', () => import('./locales/en.json'));

init({
	fallbackLocale: 'vi',
	initialLocale: getLocaleFromQueryString('lang')
});

class LocaleStore {
	isLoading = $state(true);
	locale: string | undefined | null = $state(undefined);
	isVi = $derived(this.locale === 'vi');
	isEn = $derived(this.locale === 'en');

	constructor() {
		isLoading.subscribe((isLoading) => {
			this.isLoading = isLoading;
		});
		locale.subscribe((locale) => {
			if (locale && ![ 'en', 'vi' ].includes(locale)) {
				this.locale = 'vi';
			} else {
				this.locale = locale;
			}
		});
	}
}

export const localeStore = new LocaleStore();
