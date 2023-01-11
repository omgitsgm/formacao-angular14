import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: 'modelo1'
  }

  constructor(
    private service: PensamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  // Cria um novo pensamento e redireciona o usuário para a página de listagem de pensamentos.
  criarPensamento () {
    this.service.criar(this.pensamento).subscribe(() => {
      this.router.navigate(['/listarPensamentos'])
    });
  }

  // Cancela a criação de um pensamento e redireciona o usuário para a página de listagem de pensamentos.
  cancelar () {
    this.router.navigate(['/listarPensamentos']);
  }

}
