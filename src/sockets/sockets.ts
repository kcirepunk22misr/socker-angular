import { Socket } from 'socket.io';
import { UsuarioLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuarioLista();

export const conectarCliente = (cliente: Socket, io: SocketIO.Server) => {
	const usuario = new Usuario(cliente.id);
	usuariosConectados.agregar(usuario);
};

export const desconectar = (cliente: Socket, io: SocketIO.Server) => {
	cliente.on('disconnect', () => {
		console.log('Cliente Desconectado');
		usuariosConectados.borrarUsuario(cliente.id);
		io.emit('usuarios-activos', usuariosConectados.getLista());
	});
};

// Escuchar mensaje
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
	cliente.on('mensaje', (payload) => {
		console.log('Mensaje Recibido', payload);

		io.emit('mensaje-nuevo', payload);
	});
};

// configurar-usuario
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
	cliente.on('configurar-usuario', (payload, callback: Function) => {
		usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
		io.emit('usuarios-activos', usuariosConectados.getLista());

		callback({
			ok: true,
			mensaje: `Usuario ${payload.nombre}`
		});
	});
};

// Obtener usuarios
export const obtenerUsuarios = (cliente: Socket, io: SocketIO.Server) => {
	cliente.on('obtener-usuarios', () => {
		io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
	});
};
