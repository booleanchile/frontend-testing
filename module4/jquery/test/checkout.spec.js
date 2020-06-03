/*
	Necesario para hacer global jquery en Jest
*/
window.$ = require('../src/assets/lib/jquery.min');

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

	Los archivos HTML pueden ser incluidos a través de "require"
	gracias a la configuración del archivo jest.config en la sección "transform"
*/
const template = require('./templates/checkout.spec.html');

describe('Checkout page', () => {
	/*
		Función que se ejecutará una única vez.
		En este caso la utilizamos para reemplazar el comportamiento original de la función
		$.ajax
		Si no se establece una implementación a través del método mockImplementation
		por defecto se asigna una función no operacional. (una función que no recibe argumentos
		que siempre retorna el valor undefined)
	*/
	beforeAll(() => {
		jest.spyOn(window.$, 'ajax');
	});

	beforeEach(() => {
		/*
			Por cada test asignamos el template con su estado inicial
			para volver determinista cada prueba de software y ejecutamos la función
			init para asociar los listeners nuevamente
		*/
		document.body.innerHTML = template;
		checkoutModule.init();
		
		window.$.ajax.mockReset();
	});

	/*
		Utilizamos Snapshot testing para hacer pruebas de software implícitas. Por lo tanto
		no vamos a hacer asersiones basadas en preguntar si ciertas clases fueron aplicadas
		sobre ciertos elementos. Vamos a sacar "una foto" de como quedó el DOM luego de aplicar
		las acciones y vamos a comparar con esta copia en las futuras ejecucioes de estas pruebas.
		En caso de que un cambio sea legítimo ya sea una corrección o modificación del algún detalle
		debemos actualizar los snapshots
	*/
	it('should active confirmation section when next Step button is clicked ', () => {
		expect(
			$(checkoutModule.steps.confirmation.selector).hasClass('checkout__confirmation--active')
		).not.toBe(true);

		$(checkoutModule.steps.resume.buttonNextStepSelector).click();

		// expect(
		// 	$(checkoutModule.steps.confirmation.selector).hasClass('checkout__confirmation--active')
		// ).toBe(true);
		expect(document.body.innerHTML).toMatchSnapshot();
	});

	it('should show success message if ajax call were ok', () => {
		$(checkoutModule.steps.resume.buttonNextStepSelector).click();
		window.$.ajax
			.mockImplementation((config) => config.success());
		$(checkoutModule.steps.confirmation.instructorSelectionSelector)
			.val('gonzalo');
		$(checkoutModule.steps.confirmation.instructorCourseSelector)
			.val('angular');
		
		$(checkoutModule.steps.confirmation.formSelector).submit();

		const ajaxCall = window.$.ajax.mock.calls[0][0];
		expect(ajaxCall.data).toEqual({
			instructor: 'gonzalo',
			course: 'angular',
		});
		expect(ajaxCall.url).toEqual('https://my-endpoint');
		expect(ajaxCall.type).toEqual('POST');
		expect(document.body.innerHTML).toMatchSnapshot();
	});

	it('should show error message if ajax call were ok', () => {
		$(checkoutModule.steps.resume.buttonNextStepSelector).click();
		window.$.ajax
			.mockImplementation((config) => config.error());		

		$(checkoutModule.steps.confirmation.formSelector).submit();

		const ajaxCall = window.$.ajax.mock.calls[0][0];
		expect(ajaxCall.data).toEqual({
			instructor: 'Selecciona un profesor',
			course: 'Selecciona un curso',
		});
		expect(ajaxCall.url).toEqual('https://my-endpoint');
		expect(ajaxCall.type).toEqual('POST');
		expect(document.body.innerHTML).toMatchSnapshot();
	});
});
