import { Router, Request, Response } from 'express';
const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
	res.json({
		ok: true,
		mensaje: 'bbcita'
	});
});

router.post('/mensajes', (req: Request, res: Response) => {
	const cuerpo = req.body;
	res.json({
		ok: true,
		mensaje: 'bbcita',
		cuerpo
	});
});

export default router;
