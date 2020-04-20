import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/sockets';
const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
	res.json({
		ok: true,
		mensaje: 'bbcita'
	});
});

router.post('/mensajes', (req: Request, res: Response) => {
	const cuerpo = req.body.cuerpo;
	const de = req.body.de;
	const payload = { cuerpo, de };
	const server = Server.instance;
	server.io.emit('mensaje-nuevo', payload);
	res.json({
		ok: true,
		payload
	});
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
	const cuerpo = req.body.cuerpo;
	const de = req.body.de;
	const id = req.params.id;
	const payload = {
		de,
		cuerpo
	};
	const server = Server.instance;
	server.io.in(id).emit('mensaje-privado', { payload });

	res.json({
		ok: true,
		mensaje: 'bbcita',
		cuerpo
	});
});

router.get('/usuarios', (req: Request, res: Response) => {
	const server = Server.instance;
	server.io.clients((err, clientes: string[]) => {
		if (err) {
			return res.json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			clientes
		});
	});
});

// Obtener usuarios y sus nombre
router.get('/usuarios/detalle', (req: Request, res: Response) => {
	res.json({
		ok: true,
		clientes: usuariosConectados.getLista();
	});
})

export default router;
