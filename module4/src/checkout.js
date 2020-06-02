const checkoutModule = {
	init: () => {
		//Page states and selectors
		checkoutModule.steps = {
			resume: {
				selector: '.checkout__resume',
				show: true,
				buttonNextStepSelector: '.checkout__resume button[type="button"]'
			},
			confirmation: {
				selector: '.checkout__confirmation',
				show: false,
				instructorSelectionSelector: '.checkout__confirmation .confirmation__instructor-selection',
				instructorAvalabilitySelector: '.checkout__confirmation .confirmation__instructor-availability',
			},
		};
		
		//Page listeners
		$(checkoutModule.steps.resume.buttonNextStepSelector)
			.on('click', checkoutModule.onClickResume);
	},
	onClickResume: ($event) => {
		const confirmationSelector = checkoutModule.steps.confirmation.selector;
		const instructorSelectionSelector = checkoutModule.steps.confirmation.instructorSelectionSelector;

		$(confirmationSelector).addClass('checkout__confirmation--active');
		checkoutModule.steps.confirmation.show = true;
		// Listener cuando seleccionan profesor	
		$(instructorSelectionSelector).on('change', checkoutModule.onClickInstructor);
	},
	onClickInstructor: ($event) => {
    //1. loadInstructorAvailability
		$.ajax({
			url: '',
			success: () => {
				$(checkoutModule.steps.confirmation.instructorAvalabilitySelector)
					.addClass('confirmation__instructor-availability--active');
			}
		});
	},
};
$( document ).ready( checkoutModule.init );