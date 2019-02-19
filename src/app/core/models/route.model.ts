import { NavigationExtras, Params } from '@angular/router';
export interface RouteModel {
  path: string[];
  query?: Params;
  extras?: NavigationExtras;
}
