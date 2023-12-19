/* MODAL */
const $ = (select) => document.querySelector(select);
const $modal = $('#modal');

document.addEventListener('click', (e) => {
	if (e.target.matches('#open-modal')) {
		$modal.classList.remove('hidden');
		$modal.classList.add('flex');
	}

	if (e.target.matches('#close-modal *')) {
		$modal.classList.remove('flex');
		$modal.classList.add('hidden');

		$form.classList.remove('hidden');
		$form.classList.add('flex')
	
		$invitacion.classList.remove('block');
		$invitacion.classList.add('hidden');
	}
});

//<==============LOGICA CONTADOR================>

const $day = $('#days');
const $hour = $('#hours');
const $minutes = $('#minutes');

const countDown = (newDate) => {
	const date = new Date();
	const dateEsperado = new Date(newDate);
	const dateRestante = dateEsperado - date;
	if (dateRestante > 0) {
		const days = Math.floor(dateRestante / (1000 * 60 * 60 * 24));
		const hours = Math.floor(
			(dateRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const mins = Math.floor((dateRestante % (1000 * 60 * 60)) / (1000 * 60));
		const resetFecha = (num) => (num >= 10 ? num : '0' + num);

		$day.textContent = resetFecha(days);
		$hour.textContent = resetFecha(hours);
		$minutes.textContent = resetFecha(mins);
	} else {
		clearInterval(countDownInterval);
	}
};

const countDownInterval = setInterval(() => countDown('January 2, 2024'), 1000);
countDown('January 2, 2024');

/* AGREGAR INVITADO */

const $form = document.querySelector('form');
const $invitacion = document.querySelector('#invitacion');

const supabaseUrl = 'https://ywwpmxahooxmaujhxpxb.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3d3BteGFob294bWF1amh4cHhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMwMjQ2NzAsImV4cCI6MjAxODYwMDY3MH0.190cXyZUsh1UUacLNuSyBunDCBiTsa9svrJa4IQgPlw';

const database = supabase.createClient(supabaseUrl, supabaseKey);

$form.addEventListener('submit', async (e) => {
	e.preventDefault();

	const $nombre = document.querySelector('#nombre').value;
	const $email = document.querySelector('#email').value;
	const res = await database.from('invitados').insert({
		name: $nombre,
		email: $email,
	}).select();

	$form.reset();

	$form.classList.remove('flex');
	$form.classList.add('hidden')

	$invitacion.classList.remove('hidden');
	$invitacion.classList.add('block');
});




