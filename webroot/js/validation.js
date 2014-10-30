function validate(element) {
	var hasValidationMessage = element.hasAttribute('data-validation-message'),
		isRequired = element.hasAttribute('required'),
		hasPattern = element.hasAttribute('pattern');
	// check if the required attribute has been set, or the pattern, also if there is a title
	if (hasValidationMessage && element.validity && (isRequired || hasPattern)) {
		var doesNotValidate = element.validity.valueMissing || element.validity.typeMismatch || element.validity.patternMismatch || element.validity.tooLong || element.validity.tooShort || element.validity.rangeUnderflow || element.validity.rangeOverflow || element.validity.stepMismatch || element.validity.badInput;
		element.setCustomValidity(doesNotValidate ? element.getAttribute("data-validation-message") : '');
	}
}

$(function() {
	/* quick workaround for firefox and password fields */
	if (navigator.userAgent.search("Firefox") >= 0) {
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
			allInputs[i].addEventListener('change', function() { validate(this); }, false);
		} else {
			allInputs[i].attachEvent('change', function() { validate(this); });
		}
	}
})