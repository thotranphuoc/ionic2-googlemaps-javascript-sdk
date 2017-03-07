import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp }              from './app.component';
import { MapPage }            from '../pages/map/map';
import { MapShapesPage }      from '../pages/map-shapes/map-shapes';
import { MapIconPage }        from '../pages/map-icon/map-icon';
import { MapIconPopoverPage } from '../pages/map-icon-popover/map-icon-popover';
import { PopoverInfoPage }    from '../pages/map-icon-popover/popover-info/popover-info';
import { TabsPage }           from '../pages/tabs/tabs';
import { Tab1Page }           from '../pages/tab1/tab1';
import { Tab2Page }           from '../pages/tab2/tab2';
import { Tab3Page }           from '../pages/tab3/tab3';


@NgModule({
  declarations: [
    MyApp,
    MapPage,
    MapShapesPage,
    MapIconPage,
    MapIconPopoverPage,
    PopoverInfoPage,
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
    MapPage,
    MapShapesPage,
    MapIconPopoverPage,
    PopoverInfoPage,
    MapIconPage,
    TabsPage,
    Tab1Page,
    Tab2Page,
    Tab3Page
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
