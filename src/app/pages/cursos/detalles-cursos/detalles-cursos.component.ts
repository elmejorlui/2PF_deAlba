import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from '../Componentes/models';
import { CursosService } from '../Componentes/services/cursos.service';

@Component({
  selector: 'app-detalles-cursos',
  templateUrl: './detalles-cursos.component.html',
  styleUrls: ['./detalles-cursos.component.scss']
})
export class DetallesCursosComponent implements OnDestroy {

  curso: Curso | undefined;

  private destroyed$ = new Subject()
  dataSource = new MatTableDataSource<Curso>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursoServices: CursosService,
  ) {
    this.cursoServices.getCursoById(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((cursos) => this.curso = cursos);
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true)
  }
}
