import { Component } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent {

  listaPensamentos: Array<Pensamento> = [];

  constructor(private service: PensamentoService) {

  }

  // Sempre que esse componente for carregado o ngOnInit será executado.
  ngOnInit(): void {
    this.service.listar().subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    });
  }

}
