// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct
//    name has 0 or 2 whitespaces benween words
//    name length is 1 or more chars
//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters.
//    message must not iclude bad language: ugly, dumm, stupid, pig, ignorant
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,

function validateMe() {
  validateById('email', 5, 50, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  validateById('name', 2, 1000, /^\w+\s\w+\s\w+\s*$|^\w{2,}\s*$/);
  validateById('phone', 0, 1000, /^(\+|0)380(\(32\)|32)((\s|\-)(\d{3})){2}(\s|\-)\d{2}$/);
  validateById('message', 10, 10000, /^((?!(ugly|stupid)).)*$/);
  return false;
}

function validateById(id, minLength, maxLength, formatRegex) {
  const node = document.getElementById(id);
  const errorNode = node.parentNode.querySelector('p.help-block')
  errorNode.innerHTML = '';

  let errors = document.createElement('ul');
  errors.setAttribute("role", "alert");

  if (node.value.length < minLength || node.value.length > maxLength) {
    let li = document.createElement('li');
    li.innerText = 'Length less than ' + minLength.toString() + ' or greater than ' + maxLength.toString();
    errors.appendChild(li);
  }

  if (!node.value.match(formatRegex)) {
    let li = document.createElement('li');
    li.innerText = 'Format is incorrect';
    errors.appendChild(li);
  }

  if (errors.childElementCount > 0) {
    errorNode.appendChild(errors);
  }
  return false;
}

document.addEventListener('keyup', function (e) {
  validateMe();
});