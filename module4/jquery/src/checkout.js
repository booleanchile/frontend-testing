// Código jQuery refactorizado para hacerlo testeable
const checkoutModule = {
	init: () => {
		//Page states and selectors
		checkoutModule.steps = {
			resume: {
				selector: '.checkout__resume',
				buttonNextStepSelector: '.checkout__resume button[type="button"]'
			},
			confirmation: {
				selector: '.checkout__confirmation',
				formSelector: '.checkout__confirmation form',
				instructorSelectionSelector: '.checkout__confirmation .confirmation__instructor-selection',
				instructorCourseSelector: '.checkout__confirmation .confirmation__instructor-course-selection',
				confirmationResultSelector: '.checkout__confirmation .confirmation__instructor-result',
			},
		};

		//Page listeners
		$(checkoutModule.steps.resume.buttonNextStepSelector)
			.on('click', checkoutModule.onClickResume);
	},
	onClickResume: ($event) => {
		const confirmationSelector = checkoutModule.steps.confirmation.selector;
		const formSelector = checkoutModule.steps.confirmation.formSelector;

		$(confirmationSelector).addClass('checkout__confirmation--active');
		$(formSelector)
			.on('submit', checkoutModule.onSubmit);
	},

	onSubmit: ($event) => {
		const {
			instructorSelectionSelector,
			instructorCourseSelector,
			confirmationResultSelector,
		} = checkoutModule.steps.confirmation;

		$.ajax({
			url: 'https://my-endpoint',
			type: 'POST',
			data: {
				instructor: $(instructorSelectionSelector).val(),
				course: $(instructorCourseSelector).val(),
			},
			success: () => {
				$(confirmationResultSelector)
					.text('datos enviados correctamente')
					.addClass('confirmation__instructor-result--active');
			},
			error: () => {
				$(confirmationResultSelector)
					.text('datos no pudieron ser enviados')
					.addClass('confirmation__instructor-result--active');
			}
		});

		$event.preventDefault();
		return false;
	},
};
$( document ).ready( checkoutModule.init );

window.checkoutModule = checkoutModule;

// Código jQuery sin estructurar
// $(document).ready(function () {
//   $('.checkout__resume button[type="button"]').on("click", function () {
//     $(".checkout__confirmation").addClass("checkout__confirmation--active");
//   });
//   $(".checkout__confirmation form").on("submit", function () {
//     $.ajax({
//       url: "https://my-endpoint",
//       type: "POST",
//       data: {
//         instructor: $('.checkout__confirmation .confirmation__instructor-selection').val(),
//         course: $('.checkout__confirmation .confirmation__instructor-course-selection').val(),
//       },
//       success: () => {
//         $('.checkout__confirmation .confirmation__instructor-result')
//           .text("datos enviados correctamente")
//           .addClass("confirmation__instructor-result--active");
//       },
//       error: () => {
//         $('.checkout__confirmation .confirmation__instructor-result')
//           .text("datos no pudieron ser enviados")
//           .addClass("confirmation__instructor-result--active");
//       },
//     });

//     $event.preventDefault();
//     return false;
//   });
// });