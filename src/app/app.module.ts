import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { TabsPage } from '../pages/tabs/tabs';
import { Tab1Page } from '../pages/tab1/tab1';
import { Tab2Page } from '../pages/tab2/tab2';
import { Tab3Page } from '../pages/tab3/tab3';


@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    TabsPage,
    Tab1Page,
    Tab2Page,
    Tab3Page
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    TabsPage,
    Tab1Page,
    Tab2Page,
    Tab3Page
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
