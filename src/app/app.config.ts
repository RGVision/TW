import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AppService } from './app.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes) ,{ provide: AppService, useClass: AppService}]
};
