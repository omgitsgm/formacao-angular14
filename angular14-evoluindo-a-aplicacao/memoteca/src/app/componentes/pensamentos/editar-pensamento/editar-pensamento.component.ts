import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlDirective, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { uppercaseValidator, whitespacesValidator } from '../validacoes';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent {

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  }

  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.pensamento = pensamento;
    });

    this.formulario = this.formBuilder.group({
      conteudo: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern(/(.|\s)*\S(.|\s)*/),
          whitespacesValidator
        ]),
      ],
      autoria: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          // Validators.pattern(/(.|\s)*\S(.|\s)*/),
          whitespacesValidator,
          uppercaseValidator
        ]),
      ],
      modelo: ['', [Validators.required]],
      favorito: [this.pensamento.favorito]
    });

  }

  editarPensamento() {
    console.log(`this is a test ${this.formulario.valid}`)
    this.service.editar(this.pensamento).subscribe(() => {
      this.router.navigate(['/listarPensamentos']);
    });
  }

  cancelar() {
    this.router.navigate(['/listarPensamentos']);
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao';
    }

    return 'botao__desabilitado';
  }

}
