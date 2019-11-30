let isValid = new Boolean(false); 
const postcode_regex = /[0-9A-Z]{2}?[-]?[0-9A-Z]{2}/gi;
const lettersRegex = /^[A-Za-z]+$/;
const numberRegex = /^[0-9]?[,]?^[0-9]/;
let nettoFieldValid = new Boolean(false);
let vatFieldValid = new Boolean(false);


function validateName(){
	let name = document.getElementById('nameId');
	let nameError = document.getElementById('nameIdError');
	validateLength(2, 100, name, nameError);
}

function validateCheckbox(){
	let checkoboxes = document.getElementsByClassName('mojclass');
	let checkboxIdError = document.getElementById('checkboxIdError');
	console.log("work");
	let inputs = document.getElementsByTagName("input");
	let howManyChecked = checkIfAtleastTwoCheckobxes(inputs);

	console.log(howManyChecked);
	if(howManyChecked >= 2){
		checkboxIdError.innerHTML="ok";
		for(var i = 0; i <checkoboxes.length; i++){
			checkoboxes[i].classList.remove("is-invalid");
			checkoboxes[i].classList.add("is-valid");
		}
		checkboxIdError.classList.remove("invalid-feedback");
		checkboxIdError.classList.add("valid-feedback");
		isValid = true;
	} else {
		checkboxIdError.innerHTML = "Moga byc tylko liczby!";
		checkboxIdError.classList.add("invalid-feedback");
		for(var i = 0; i <checkoboxes.length; i++){
			checkoboxes[i].classList.add("is-invalid");
		}
		isValid = false;
	}
}

function checkIfAtleastTwoCheckobxes(inputs){
	var count = 0;

	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type == "checkbox" && inputs[i].checked) {
			count++;
		}
	}
	return count;
}

function validateNetto(){
	let netto = document.getElementById('nettoId');
	let nettoError = document.getElementById('nettoIdError');
	if (netto.value.length != null){
		let numbersOnly = matchesRegex(netto, numberRegex);
		if (!numbersOnly){
			nettoError.innerHTML = "Moga byc tylko liczby!";
			nettoError.classList.add("invalid-feedback");
			netto.classList.add("is-invalid");
			isValid = false;
			nettoFieldValid = false;
		} else {
			nettoError.innerHTML="ok";
			netto.classList.remove("is-invalid");
			netto.classList.add("is-valid");
			nettoError.classList.remove("invalid-feedback");
			nettoError.classList.add("valid-feedback");
			isValid = true;
			nettoFieldValid = true;
			calculateBrutto();
		}
	}
}

function validateVat(){
	let vat = document.getElementById('vatId');
	let vatError = document.getElementById('vatIdError');
	if (vat.value.length != null){
		let numbersOnly = matchesRegex(vat, numberRegex);
		if (!numbersOnly){
			vatError.innerHTML = "Moga byc tylko liczby!";
			vatError.classList.add("invalid-feedback");
			vat.classList.add("is-invalid");
			isValid = false;
			vatFieldValid = false;
		} else {
			vatError.innerHTML="ok";
			vat.classList.remove("is-invalid");
			vat.classList.add("is-valid");
			vatError.classList.remove("invalid-feedback");
			vatError.classList.add("valid-feedback");
			isValid = true;
			vatFieldValid = true;
			calculateBrutto();
		}
	}
}

function validateKod(){
	let kod = document.getElementById('kodId');
	let kodError = document.getElementById('kodIdError');
	if(kod.value != null){
		let validCode = matchesRegex(kod, postcode_regex);
		if (!validCode){
			kodError.innerHTML = "Tylko liczby lub cyfry";
			kodError.classList.add("invalid-feedback");
			kod.classList.add("is-invalid");
			isValid = false;
		} else {
			kodError.innerHTML="ok";
			kod.classList.remove("is-invalid");
			kod.classList.add("is-valid");
			kodError.classList.remove("invalid-feedback");
			kodError.classList.add("valid-feedback");
			isValid = true;
		}
	}
}

function validateLength(minlength, maxlength, fieldToValidate, errorField){
	if(fieldToValidate.value.length<minlength){
		errorField.innerHTML="Za krótkie";
		fieldToValidate.classList.add("is-invalid");
		errorField.classList.add("invalid-feedback");
		isValid = false;
// walidacja na innych oknach
	} else if (fieldToValidate.value.length>maxlength){
		errorField.innerHTML="Za dlugie";
		fieldToValidate.classList.add("is-invalid");
		errorField.classList.add("invalid-feedback");
		isValid = false;
	}
	else
	{
		errorField.innerHTML="ok";
		fieldToValidate.classList.remove("is-invalid");
		fieldToValidate.classList.add("is-valid");
		errorField.classList.remove("invalid-feedback");
		errorField.classList.add("valid-feedback");
		isValid = true;
	}
}

function matchesRegex(input, regex)
  {
   if(input.value.match(regex))
     {
      return true;
     }
   else
     {
     return false;
     }
  }

function calculateBrutto(){
	let nettoField = document.getElementById('nettoId');
	let bruttoField = document.getElementById('bruttoId');
	let vatField = document.getElementById('vatId');
	if (nettoFieldValid === true && vatFieldValid === true){
		let value = parseFloat(nettoField.value) + (parseFloat(nettoField.value) * parseFloat(vatField.value)/100);
		bruttoField.placeholder=value;
	}
}

function validateAll(){
	validateName();
	validateNetto();
	validateVat();
	validateKod();
}