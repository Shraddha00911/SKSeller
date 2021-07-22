import { BrowserModule } from '@angular/platform-browser';   
import { NgModule } from '@angular/core';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SettingsPanelComponent } from './shared/settings-panel/settings-panel.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { TodoRtlComponent } from './apps/todo-list/todo-rtl/todo-rtl.component';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { DatePipe } from '@angular/common';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DonutChartComponent } from './shared/components/donut-chart/donut-chart.component';
import { UploadcfrarticlesComponent } from './uploadcfr/uploadcfrarticles/uploadcfrarticles.component';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { BlockUIModule } from 'primeng/blockui';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {MultiSelectModule} from 'primeng/multiselect';
import { AgmCoreModule } from '@agm/core';
import{ environment} from '../environments/environment';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';

// import { AgmOverlays } from "agm-overlays";
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SettingsPanelComponent,
    FooterComponent,
    DashboardComponent,
    TodoComponent,
    TodoListComponent,
    TodoRtlComponent,
    ContentAnimateDirective,
    DonutChartComponent,
    UploadcfrarticlesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    AccordionModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ChartsModule,
    CarouselModule,
    NgxMapboxGLModule,
    TableModule,
    BlockUIModule,
    ProgressSpinnerModule,
    DialogModule,
    MultiSelectModule,
    PanelMenuModule,
    // MenuItem,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    }),
    AgmCoreModule.forRoot({
      // apiKey: ''
      apiKey:  environment.apiKeyGoogle + '&libraries=visualization',
      libraries: ['places', 'drawing', 'geometry', 'visualization'],
    })
  ],
  providers: 
  [
    ThemeService,
    AuthService,
    AuthGuard,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}