type TLanguageIcon = 'uk-flag' | 'en-flag' | 'de-flag' | 'es-flag' | 'pl-flag' | 'fr-flag';
type TLanguageName = 'uk' | 'en' | 'de' | 'es' | 'pl' | 'fr';

export interface ILanguage {
  icon: TLanguageIcon;
  name: TLanguageName;
}
