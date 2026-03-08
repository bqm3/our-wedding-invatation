import { init, isLoading, locale, register } from 'svelte-i18n';

register('vi', () => import('./locales/vi.json'));
register('en', () => import('./locales/en.json'));
register('vi-29', () => import('./locales/vi29.json'));

const supportedLocales = ['vi', 'en', 'vi-29'];

function getLangFromUrl() {
	if (typeof window === 'undefined') return 'vi';

	const lang = new URLSearchParams(window.location.search).get('lang');
	console.log('lang from url =', lang);

	return supportedLocales.includes(lang ?? '') ? lang! : 'vi';
}

const initialLang = getLangFromUrl();

init({
	fallbackLocale: 'vi',
	initialLocale: initialLang
});

// ép lại locale sau init để tránh bị fallback / chỗ khác ghi đè lúc đầu
locale.set(initialLang);

class LocaleStore {
	isLoading = $state(true);
	locale: string | undefined | null = $state(undefined);

	isVi = $derived(this.locale === 'vi');
	isEn = $derived(this.locale === 'en');
	isVi29 = $derived(this.locale === 'vi-29');

	constructor() {
		isLoading.subscribe((value) => {
			this.isLoading = value;
		});

		locale.subscribe((value) => {
			console.log('locale store =', value);
			this.locale = supportedLocales.includes(value ?? '') ? value : 'vi';
		});
	}
}

export const localeStore = new LocaleStore();