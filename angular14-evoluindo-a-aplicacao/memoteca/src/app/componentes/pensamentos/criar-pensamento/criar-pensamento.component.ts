import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  // pensamento: Pensamento = {
  //   conteudo: '',
  //   autoria: '',
  //   modelo: 'modelo1'
  // }

  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([
        Validators.required,
        // Validators.pattern(/(.|\s)*\S(.|\s)*/)
        this.whitespacesValidator
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        // Validators.pattern(/(.|\s)*\S(.|\s)*/),
        // Validators.pattern(/^[A-Z\s]+$/)
        this.uppercaseValidator,
        this.whitespacesValidator
      ])],
      modelo: ['modelo1', [Validators.required]],
      favorito: [false]
    })

    console.log(this.formulario.valid);
  }

   uppercaseValidator(control: AbstractControl) {
    const autoria = control.value as string;
    if(autoria !== autoria?.toUpperCase()) {
      // Se não estiver em UpperCase ele retorna true, sinalizando que há um erro.
      return { uppercase: true };
    }

    // Retorna null se a string estiver em uppercase.
    return null;
  }

  whitespacesValidator(control: AbstractControl) {
    const text = control.value as string;
    const regularExpression: RegExp = /(.|\s)*\S(.|\s)*/;
    if(!regularExpression.test(text)) {
      return { whitespaces: true };
    }

    return null;
  }

  // Cria um novo pensamento e redireciona o usuário para a página de listagem de pensamentos.
  criarPensamento () {
    console.log(this.formulario.get('autoria')?.errors);
    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamentos'])
      });
    }
  }

  // Cancela a criação de um pensamento e redireciona o usuário para a página de listagem de pensamentos.
  cancelar () {
    this.router.navigate(['/listarPensamentos']);
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao';
    }

    return 'botao__desabilitado';
  }

}
