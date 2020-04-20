export class Usuario {
	public id: string;
	public nombre: string;
	public sala: string;

	constructor(id) {
		this.id = id;
		this.nombre = 'Sin Nombre';
		this.sala = 'Sin Sala';
	}
}
