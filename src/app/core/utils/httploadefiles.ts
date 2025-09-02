 import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

  export function HttpLoaderFactory(http: HttpClient) { // Resposnbile to load the files
   return new TranslateHttpLoader(http , '/i18n/' , '.json');
 }

//  http , '/i18n/' , '.json'
// http , '/public/i18n' , '.json'
