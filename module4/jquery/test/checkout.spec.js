/*
	Necesario para hacer global jquery
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

describe('Checkout page', function(){
	beforeAll(() => {
		jest.spyOn(window.$, 'ajax');
	});

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
		window.$.ajax.mockReset();
	});
	
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
