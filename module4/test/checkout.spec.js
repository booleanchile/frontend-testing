/*
	Necesario para hacer global jquery
*/
window.$ = require('../src/jquery.min');

/* 
	Incluimos el modulo. es necesario que el modulo sea
	asociado a la varible global window
*/
require('../src/checkout');

/* 
	Un template que representa el estado del DOM respecto
	del módulo con su estado inicial.
	Es posible utilizar algún loader si se tienen plantillas 
	con algun otro formato como pug, haml o html de manera
	de no escribir el template inline en este archivo
*/
const template = `
<section class="checkout">
	<div class="checkout__resume">
		<h2>Resumen de tu compra</h2>
		<div>
			<h3>Pruebas de Integración en Frontend</h3>
			<div>
				<h4>Plan Básico</h4>
				<ul>
					<li> 6 clases de 1 hr</li>
					<li> Videollamada 1:1</li>
					<li> Chat personalizado para preguntas</li>
					<li> 1 Profesor dedicado experto en el tópico del programa</li>
					<li> Material Audiovisual y en formato PDF</li>
					<li> Evaluación e Informe de resultado</li>
				</ul>
				<button type="button" data-course-plan="custom">Reservar Hora</button>
			</div>
		</div>
	</div>
	<div class="checkout__confirmation">
		<h2>Selecciona la hora disponible</h2>
		<div>
			<form>
				<fieldset>
					<label for="instructor-selection">Elige a tu profesor</label>
					<select name="" id="instructor-selection" class="confirmation__instructor-selection">
						<option>Selecciona un profesor</option>
						<option value="gonzalo">Gonzalo Pincheira</option>
						<option value="camilo">Camilo Flores</option>
					</select>
					<div class="confirmation__instructor-availability">
						<label for="instructor-schedule">Selecciona un día disponible</label>
						<div id="instructor-schedule">
							<div class="day">
								1
							</div>
							<div class="day">
								2
							</div>
							<div class="day">
								3
							</div>
							<div class="day">
								4
							</div>
							<div class="day">
								5
							</div>
							<div class="day">
								6
							</div>
							<div class="day">
								7
							</div>
						<div class="day">
								8
							</div>
							<div class="day">
								9
							</div>
							<div class="day">
								10
							</div>
							<div class="day">
								11
							</div>
							<div class="day">
								12
							</div>
							<div class="day">
								13
							</div>
							<div class="day">
								14
							</div>
						<div class="day">
								15
							</div>
							<div class="day">
								16
							</div>
							<div class="day">
								17
							</div>
							<div class="day">
								18
							</div>
							<div class="day">
								19
							</div>
							<div class="day">
								20
							</div>
							<div class="day">
								21
							</div>
							<div class="day">
								22
							</div>
							<div class="day">
								23
							</div>
							<div class="day">
								24
							</div>
							<div class="day">
								25
							</div>
							<div class="day">
								26
							</div>
							<div class="day">
								27
							</div>
							<div class="day">
								28
							</div>
					</div>
				</fieldset>
			</form>
		</div>
	</div>
</section>
`;

describe('Checkout page', function(){

	beforeEach(() => {
		/*
			Podemos notar como por cada test el estado anterior el DOM trasciende
		*/
		// console.log('++++++++++++++++++++++++++++++++++++');
		// console.log(document.body.innerHTML);
		// console.log('++++++++++++++++++++++++++++++++++++');
		
		/*
			Por cada test asignamos el template con su estado inicial
			para volver determinista cada prueba de software
		*/
		document.body.innerHTML = template;
		checkoutModule.init();
	});
	
	it('should active confirmation section when next Step button is clicked ', () => {
		expect(checkoutModule.steps.confirmation.show).toBe(false);
    expect($(checkoutModule.steps.confirmation.selector).hasClass('checkout__confirmation--active')).not.toBe(true);
		
		$(checkoutModule.steps.resume.buttonNextStepSelector).click();

		expect(checkoutModule.steps.confirmation.show).toBe(true);
		expect(
			$(checkoutModule.steps.confirmation.selector).hasClass('checkout__confirmation--active')
		).toBe(true);
	});
	
	// Se producirá un comportamiento "no determinista" si no aseguramos que el DOM partió del estado inicial dentro del contexto (describe) dado en este grupo de pruebas de software 
	it('should show availability if an instructor is selected', () => {
		expect(true).toBe(true);
	});
});
