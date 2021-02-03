import {FormGroup} from "@angular/forms";

export const validaCampoTouched = (campo: string, formulario: FormGroup) => {
  return !formulario.controls[campo].valid && formulario.controls[campo].touched;
};

export const validaCampos = (campo: string, formulario: FormGroup): string => {

  let campoVerifica = formulario.controls[campo];
  let msg: string = '';

  if (campoVerifica.touched) {
    campoVerifica.errors &&
    Object.keys(campoVerifica.errors).map(error => {
      if (error === 'required') {
        msg = errorRequired(campo);
      }

      if (error === 'minlength')
        msg = errorMinLength(campo);
    });
  }
  return msg;
};

const errorRequired = (campo: string) => {
  switch (campo) {
    case 'nome_autor':
      return 'Nome do autor é obrigatório!';
    default:
      return `${campo.charAt(0).toUpperCase()}${campo.slice(1)} é obrigatório!`;
  }
};

const errorMinLength = (campo: string) => {
  switch (campo) {
    case 'nome_autor':
      return `Nome do autor é deve ter no mínimo 5 caracteres!`;
    case 'texto':
      return `${campo.charAt(0).toUpperCase()}${campo.slice(1)} deve ter ter no mínimo 10 caracteres!`;
    default:
      return `${campo.charAt(0).toUpperCase()}${campo.slice(1)} deve ter ter no mínimo 5 caracteres!`;
  }
};
