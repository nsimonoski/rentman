import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@rentman/demo-components').then((c) => c.DemoTreeComponent),
  },
];
