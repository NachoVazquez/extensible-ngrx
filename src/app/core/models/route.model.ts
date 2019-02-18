import { NavigationExtras, Params } from '@angular/router';
export interface RouteModel {
  path: any[];
  query?: Params;
  extras?: NavigationExtras;
}
