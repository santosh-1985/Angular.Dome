import { provideRouter, RouterConfig } from '@angular/router';
//import { JohnLewisRoutes } from './JohnLewis.routes';
import { MainRoutes } from './main.routes';

const appRoutes: RouterConfig = [
  ...MainRoutes
  
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(appRoutes)
];