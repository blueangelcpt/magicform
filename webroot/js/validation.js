function validate(element) {
	var hasValidationMessage = element.hasAttribute('data-validation-message'),
		isRequired = element.hasAttribute('required'),
		hasPattern = element.hasAttribute('pattern');
	if (hasValidationMessage && element.validity && (isRequired || hasPattern)) {
		var doesNotValidate = element.validity.valueMissing || element.validity.typeMismatch || element.validity.patternMismatch || element.validity.tooLong || element.validity.tooShort || element.validity.rangeUnderflow || element.validity.rangeOverflow || element.validity.stepMismatch || element.validity.badInput;
		element.setCustomValidity(doesNotValidate ? element.getAttribute('data-validation-message') : '');
	}
}

var createAllErrors = function() {
	$(this).prepend('<div class="notify notify-validation notify-error"><h3>Please correct the following in your form:</h3><ul></ul></div>');
	var form = $(this),
		errorList = $('.notify-validation', form);
	errorList.hide();
	var showAllErrorMessages = function() {
		errorList.find('ul').empty();
		var invalidFields = form.find(':invalid').each(function(index, node) {
			var label = $('label[for=' + node.id + '] '),
				message = node.validationMessage || 'Invalid value.';
			errorList.show().find('ul').append('<li><span>' + label.html() + '</span> ' + message + '</li>');
		});
	};
	form.on('submit', function(event) {
		if (this.checkValidity && !this.checkValidity()) {
			$(this).find(':invalid').first().focus();
			event.preventDefault();
		}
	});
	$('input[type=submit], button:not([type=button])', form).on('click', showAllErrorMessages);
	$('input', form).on('keypress', function(event) {
		var type = $(this).attr('type');
		if (/date|email|month|number|search|tel|text|time|url|week/.test(type) && event.keyCode == 13) {
			showAllErrorMessages();
		}
	});
};

$(function() {
	$('form').each(createAllErrors);
	if (navigator.userAgent.search('Firefox') >= 0) {
		$('input[type="password"]').each(function(index, e) {
			$(e).attr('x-moz-errormessage', $(e).attr('data-validation-message'));
			$(e).removeAttr('data-validation-message');
		});
	}
	H5F.setup(document.getElementsByTagName('form'));
	var allInputs = document.querySelectorAll('input,textarea,select');
	for (i=0; i<allInputs.length; i++) {
		allInputs[i].oninput = validate(allInputs[i]);
		if (allInputs[i].addEventListener) {
			allInputs[i].addEventListener('change', function() {
				validate(this);
			}, false);
		} else {
			allInputs[i].attachEvent('change', function() {
				validate(this);
			});
		}
	}
});