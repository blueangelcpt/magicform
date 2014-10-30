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
	H5F.setup(document.getElementsByTagName('form'));
	var inputs = document.getElementsByTagName('input');
	var textareas = document.getElementsByTagName('textarea');
	var selects = document.getElementsByTagName('select');
	inputs = inputs.concat(textareas,selects);
	for (i=0; i<inputs.length; i++) {
		inputs[i].oninput = validate(inputs[i]);
		if (inputs[i].addEventListener) {
			inputs[i].addEventListener('change', function() { validate(this); }, false);
		} else {
			inputs[i].attachEvent('change', function() { validate(this); });
		}
	}
})