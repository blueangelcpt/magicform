MagicForm
=========

Extends CakePHP's native Form helper by supporting HTML5 form elements (1.3+) and validation based on Cake model validation rules.

Supports Cake 2.x and 1.3.x (find the code for 1.3 in the 1.3 branch of this repo.)

Usage
-----

You have a a few ways to use this code. By far the simplest way is to simply drop the Form helper in your your app/helpers folder. Because Cake will look in your project first for any code before looking inside the framework, this helper will be used instead of the default Cake Form helper. All of the native Cake functionality is still there. The helper simply adds the model validation rules you set up in your model as HTML5 validation rules when creating the form elements.

It is still up to you to ensure you add any additional validation required for your site/app. This is intended to get you 90% of the way there in a fraction of the time.

**********
An example
----------

In your model:
```php
class User extends AppModel {
	var $validate = array(
		'firstname' => array(
			'notempty' => array(
				'rule' => array('notempty'),
				'message' => 'Please enter your first name.',
			),
		),
		'surname' => array(
			'notempty' => array(
				'rule' => array('notempty'),
				'message' => 'Please enter your surname.',
			),
		),
		'email' => array(
			'email' => array(
				'rule' => array('email'),
				'message' => 'Please supply a valid email address',
			),
		),
		'password' => array(
			'notempty' => array(
				'rule' => array('notempty'),
				'message' => 'Please enter a password.',
			),
		)
	);
	}
```
In your view (notice that we are not specifying any validation rules, or any fields as required):
```php
echo $this->Form->create('User', array('action' => 'signup'));
    echo $this->Form->input('firstname', array('label' => 'First name'));
    echo $this->Form->input('surname');
    echo $this->Form->input('email', array('type' => 'email'));
    echo $this->Form->input('password');
echo $this->Form->end();
```
This will be the generated HTML
```html
<form action="/users/signup" method="post" id="UserSignupForm">
	<div class="input text required">
		<label for="UserFirstname">First name</label>
		<input type="text" id="UserFirstname" maxlength="100" x-moz-errormessage="Please enter your first name(s)." title="Please enter your first name(s)." required="required" name="data[User][firstname]">
	</div>
	<div class="input text required">
		<label for="UserSurname">Surname</label>
		<input type="text" id="UserSurname" maxlength="100" x-moz-errormessage="Please enter your surname." title="Please enter your surname." required="required" name="data[User][surname]">
	</div>
	<div class="input email required">
		<label for="UserEmail">Email</label>
		<input type="email" id="UserEmail" x-moz-errormessage="Please supply a valid email address" title="Please supply a valid email address" required="required" name="data[User][email]">
	</div>
	<div class="input password required">
		<label for="UserPassword">Password</label>
		<input type="password" id="UserPassword" x-moz-errormessage="Please enter a password." title="Please enter a password." required="required" name="data[User][password]">
	</div>
	<input type="submit" value="Send Request" class="btn-orange">
</form>
```

Also included is Ryan Seddon's H5F HTML5 JavaScript validation polyfill/library, to ensure compatibility with older browsers and to enhance the UX by providing inline validation of form elements, as you type.

To use this library, place the H5F in app/webroot/js, and add the following to your view:

```php
$this->Html->scriptBlock('$(function(){H5F.setup(document.getElementsByTagName("form"))})', array('inline' => false));
$this->Html->script('h5f.min', array('inline' => false));
```

Once this is done, you probably want to show the inline form validation - to use this, add some style rules:

```css
input[type="email"],
input[type="number"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="text"],
input[type="url"],
textarea {
	background-repeat: no-repeat;
	background-position: 100% 50%;
	border: 1px solid #D3D1D1;
	border-radius: 3px;
	font: bold 18px/19px Arial, Helvetica, sans-serif;
	color: #EF5329;
	padding: 11px 12px;
	height: 19px;
	transition: .5s ease-out;
}
input[type="email"]:focus,
input[type="number"]:focus,
input[type="password"]:focus,
input[type="search"]:focus,
input[type="tel"]:focus,
input[type="text"]:focus,
input[type="url"]:focus,
textarea:focus {
	border-color: #CCC;
	box-shadow: 0 0 3px 1px #D3D1D1;
	outline: none
}
.input-notification {
	display: block
}
.error input[type="email"],
.error input[type="number"],
.error input[type="password"],
.error input[type="search"],
.error input[type="tel"],
.error input[type="text"],
.error input[type="url"],
.error textarea,
input.required:invalid,
textarea.required:invalid {
	box-shadow: 0 0 3px 1px #EF532A;
	background-image: url("../img/test-error-icon.png");
/*	border-color: #EF532A; */
}
.custom-select select.required:required {
	box-shadow: 0 0 3px 1px #EF532A;
}
input[type="email"].valid:valid,
input[type="number"].valid:valid,
input[type="password"].valid:valid,
input[type="search"].valid:valid,
input[type="tel"].valid:valid,
input[type="text"].valid:valid,
input[type="url"].valid:valid,
textarea.valid:valid {
	background-image: url("../img/test-pass-icon.png");
}
input[type="email"].valid:optional,
input[type="number"].valid:optional,
input[type="password"].valid:optional,
input[type="search"].valid:optional,
input[type="tel"].valid:optional,
input[type="text"].valid:optional,
input[type="url"].valid:optional,
textarea.valid:valid {
	background-image: none;
}
input:optional, select:optional, textarea:optional {
	border-color: #EEE;
}
input:optional:focus, select:optional:focus, textarea:optional:focus {
	border-color: #CCC;
}
```