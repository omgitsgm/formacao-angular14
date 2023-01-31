import { AbstractControl } from "@angular/forms";

export function uppercaseValidator(control: AbstractControl) {
  const autoria = control.value as string;
  if(autoria !== autoria?.toUpperCase()) {
    // Se não estiver em UpperCase ele retorna true, sinalizando que há um erro.
    return { uppercase: true };
  }

  // Retorna null se a string estiver em uppercase.
  return null;
}

export function whitespacesValidator(control: AbstractControl) {
  const text = control.value as string;
  const regularExpression: RegExp = /(.|\s)*\S(.|\s)*/;
  if(!regularExpression.test(text)) {
    return { whitespaces: true };
  }

  return null;
}
