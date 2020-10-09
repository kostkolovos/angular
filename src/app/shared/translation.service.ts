import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})

/*Class to get the translation in services*/
export class TranslationService {
    returnTranslation: string;

    constructor(public translateService: TranslateService) {
    }

    getTranslation(requestText: string) {

        this.translateService.getTranslation(this.translateService.currentLang).subscribe((translation: object) => {
            if (translation) {
                const text = requestText.split('.');
                this.returnTranslation = translation[text[0]][text[1]];
            }
        });

        return this.returnTranslation;

    }
}
