import { Component, OnInit } from '@angular/core';
import links, { NavItem } from './nav-items';
import { enviroment } from 'src/environments/environments';
import { Usuario } from '../core/models';
import { Observable, Subject, filter, map } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  isProd = enviroment.isProduction;

  authUser$: Observable<Usuario | null>;

  links = links;

  destroyed$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public titleService: Title,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle();
      }
    });
    this.authUser$ = this.authService.obtenerUsuarioAutenticado()
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout(): void {
    this.authService.logout();
  }

  private updateTitle(): void {
    const title = this.getTitle(this.activatedRoute);
    this.titleService.setTitle(title);
  }

  private getTitle(route: ActivatedRoute): string {
    if (route.firstChild) {
      return this.getTitle(route.firstChild);
    }

    if (route.snapshot.data && route.snapshot.data['title']) {
      return route.snapshot.data['title'];
    }

    return 'Título predeterminado';

  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.router.routerState.root;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        map(route => route.snapshot.data['title'])
      )
      .subscribe(title => {
        this.titleService.setTitle(title);
      });
  }

  verifyRole(link: NavItem): Observable<boolean> {
    return this.authUser$.pipe(
      map((usuarioAuth) =>
        link.allowedRoles.some((r) => r === usuarioAuth?.role) // true | false
      )
    );
  }
}
