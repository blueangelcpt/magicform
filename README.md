magicform
=========

Extends CakePHP's (1.3x for now) native Form helper by supporting HTML5 form elements and validation based on Cake model validation rules.

Usage
-----

You have a a few ways to use this code. By far the simplest way is to simply drop the Form helper in your your app/helpers folder. Because Cake will look in your project first for any code before looking inside the framework, this helper will be used instead of the default Cake Form helper. All of the native Cake functionality is still there. The helper simply adds the model validation rules you set up in your model as HTML5 validation rules when creating the form elements.

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