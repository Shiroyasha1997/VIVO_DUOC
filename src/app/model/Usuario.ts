export class Usuario {
  public correo = '';
  public password = '';
  public nombre = '';
  public apellido = '';
  public pregunta = '';
  public respuesta = '';

  constructor(
    correo: string,
    password: string,
    nombre: string,
    apellido: string,
    pregunta: string,
    respuesta: string
  ) {
    this.correo = correo;
    this.password = password;
    this.nombre = nombre;
    this.apellido = apellido;
    this.pregunta = pregunta;
    this.respuesta = respuesta;
  }

  public listaUsuariosValidos(): Usuario[] {
    const lista = [];
    lista.push(new Usuario('atorres@duocuc.cl', '1234', 'Ana', 'Torres', 'Nombre de su mascota', 'gato'));
    lista.push(new Usuario('avalenzuela@duocuc.cl', 'qwer', 'Alberto', 'Valenzuela', 'Nombre de su mejor amigo', 'juanito'));
    lista.push(new Usuario('cfuentes@duocuc.cl', 'asdf', 'Carla', 'Fuentes', 'Lugar de nacimiento de su madre', 'Valparaiso'));
    return lista;
  }

  public buscarUsuarioValido(correo: string, password: string): Usuario | undefined {
    const nived: Usuario | undefined = this.listaUsuariosValidos().find(
      usu => usu.correo === correo && usu.password === password
    );
    return nived;
  }

  public recuperarContra(correo: string): Usuario | undefined {
    const contra: Usuario | undefined = this.listaUsuariosValidos().find(
      usu => usu.correo === correo
    );
    return contra;
  }

  public MostrarContraseña(correo: string, respuesta: string): Usuario | undefined {
    const nived: Usuario | undefined = this.listaUsuariosValidos().find(
      usu => usu.correo === correo && usu.respuesta === respuesta
    );
    return nived;
  }

  public validarCorreo(): string {
    if (this.correo.trim() === '') {
      return 'Debe ingresar un correo electrónico.';
    }
    if (!this.validarFormatoCorreo(this.correo)) {
      return 'El correo electrónico ingresado no tiene un formato válido.';
    }
    return '';
  }

  private validarFormatoCorreo(correo: string): boolean {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(correo);
  }

  public validarPassword(): string {
    if (this.password.trim() === '') {
      return 'Para entrar al sistema debe ingresar la contraseña.';
    }
    if (this.password.length !== 4) {
      return 'La contraseña debe ser numérica de 4 dígitos.';
    }
    return '';
  }

  public validarUsuario(): string {
    const correoError = this.validarCorreo();
    const passwordError = this.validarPassword();

    if (correoError || passwordError) {
      return correoError || passwordError;
    }

    const usuarioValido = this.buscarUsuarioValido(this.correo, this.password);

    if (!usuarioValido) {
      return 'Los datos ingresados son incorrectos.';
    }

    return '';
  }

  public setUsuario(correo: string, password: string): void {
    this.correo = correo;
    this.password = password;
  }
}