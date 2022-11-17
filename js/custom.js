$(document).ready(function () {
    $("#cnic").mask("99999-9999999-9");
    // $("#account-no").mask("9999999999999999");
    $("#vendor-cnic").mask("99999-9999999-9");
    $("#mobile-no").mask("9999-9999999");
    $("#card-no").mask("9999 9999 9999 9999");
    $("#card-expiry").mask("99/99");
    $("#cvv").mask("999");
});

$(document).ready(function() {
	$(document).on('click', '.finish', function(e) {
		if($('#bank-confirmation').hasClass('d-none')) {
			$('#bank-confirmation').removeClass('d-none');
			$('#bank-confirmation').addClass('d-block');
			$('#payment').addClass('d-none');
		}
	});

	$(document).on('click', '.wallet-div', function(e) {
		if($('#wallet-confirmation').hasClass('d-none')) {
			$('#wallet-confirmation').removeClass('d-none');
			$('#wallet-confirmation').addClass('d-block');
			$('#payment').addClass('d-none');
			$('#myModal').removeClass('show');
			$('#myModal').addClass('d-none');
			$('.modal-backdrop').removeClass('show');
			$('.modal-backdrop').addClass('d-none');
			$('.modal-open').css({"overflow": ""});
		}
	});

	$(document).on('click', '.proceed', function(e) {
		if($('#card-confirmation').hasClass('d-none')) {
			$('#card-confirmation').removeClass('d-none');
			$('#card-confirmation').addClass('d-block');
			$('#payment').addClass('d-none');
		}
	});

	$(document).on('click', '.home', function(e) {
		if($('#bank-confirmation').hasClass('d-block')) {
			$('#bank-confirmation').addClass('d-none');
			$('#payment').removeClass('d-none');
		}
	});

	$(document).on('click', '.home', function(e) {
		if($('#wallet-confirmation').hasClass('d-block')) {
			$('#wallet-confirmation').addClass('d-none');
			$('#payment').removeClass('d-none');
		}
	});
	
	$(document).on('click', '.home', function(e) {
		if($('#card-confirmation').hasClass('d-block')) {
			$('#card-confirmation').addClass('d-none');
			$('#payment').removeClass('d-none');
		}
	});

});

// Validate Form

(function () {
	'use strict'
  
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.querySelectorAll('.needs-validation')
  
	// Loop over them and prevent submission
	Array.prototype.slice.call(forms)
	  .forEach(function (form) {
		form.addEventListener('submit', function (event) {
		  if (!form.checkValidity()) {
			event.preventDefault()
			event.stopPropagation()
		  }
  
		  form.classList.add('was-validated')
		}, false)
	  })
})()

// Session

var deadline = new Date("Nov 16, 2022 00:00:00").getTime();
var x = setInterval(function() {
var now = new Date().getTime();
var t = deadline - now;
var days = Math.floor(t / (1000 * 60 * 60 * 24));
var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((t % (1000 * 60)) / 1000);
document.getElementById("timer").innerHTML = "<div class='minutes'>" + minutes + "</div> : <div class='seconds'>" + seconds + '</div>';
    if (t < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }
}, 1000);

function clickEvent(first,last){
    if(first.value.length){
        document.getElementById(last).focus();
    }
}

// OTP

$(document).ready(function () {
	$(".otp-form *:input[type!=hidden]:first").focus();
	let otp_fields = $(".otp-form .otp-field"),
	otp_value_field = $(".otp-form .otp-value");
	otp_fields
		.on("input", function (e) {
			$(this).val(
				$(this)
					.val()
					.replace(/[^0-9]/g, "")
			);
			let opt_value = "";
			otp_fields.each(function () {
				let field_value = $(this).val();
				if (field_value != "") opt_value += field_value;
			});
			otp_value_field.val(opt_value);
		})
		.on("keyup", function (e) {
			let key = e.keyCode || e.charCode;
			if (key == 8 || key == 46 || key == 37 || key == 40) {
				// Backspace or Delete or Left Arrow or Down Arrow
				$(this).prev().focus();
			} else if (key == 38 || key == 39 || $(this).val() != "") {
				// Right Arrow or Top Arrow or Value not empty
				$(this).next().focus();
			}
		})
		.on("paste", function (e) {
			let paste_data = e.originalEvent.clipboardData.getData("text");
			let paste_data_splitted = paste_data.split("");
			$.each(paste_data_splitted, function (index, value) {
				otp_fields.eq(index).val(value);
			});
		});
});

let timerOn = true;

function otptimer(remaining) {
    var m = Math.floor(remaining / 60);
    var s = remaining % 60;
  
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    document.getElementById('otp-timer').innerHTML = m + ':' + s;
    remaining -= 1;
  
    if(remaining >= 0 && timerOn) {
        setTimeout(function() {
            otptimer(remaining);
        }, 1000);
        return;
    }

    if(!timerOn) {
    // Do validate stuff here
        return;
    }
}

otptimer(120);

// Milti Step Form

const nextButton = document.getElementById("next");
const backButton = document.getElementById("back");
const payButton = document.getElementById("pay");

const pages = $(".assessment-form .page");
const firstPage = $(pages).first()[0];
const lastPage = $(pages).last()[0];
const activeClass = "active";
const nextButtonContent = "Proceed <i class='fa fa-arrow-right'></i>";
nextButton.addEventListener("click", function() {
	const activePage = $(".assessment-form .page.active");
	const isValid = validatePage(activePage);
	if(isValid) {
		nextPage(activePage);
	} 
	else {
		document.getElementById("error").innerHTML = "Please fill all required fields";
		//alert("There are inputs that are not valid. Please fill out all fields and check to make sure your email is valid.");
	}
});


backButton.addEventListener("click", function() {
	const activePage = $(".assessment-form .page.active");
	previousPage(activePage);
});

/**
 * Navigate to the next form page.
 * @param {HTMLElement} element The current page element
 * @returns void on it being the last page.
 */

function nextPage(element) {
	const onLastPage = $(lastPage).hasClass(activeClass);
	if(onLastPage) {
		submitForm();
		return;
	}
	$(element).removeClass(activeClass);
	const nextElement = $(element).next();
	if(nextElement[0] === lastPage) {
		nextButton.innerHTML = "Proceed <i class='fa fa-arrow-right'></i>";
	}
	nextElement.addClass(activeClass);
	if(!$(firstPage).hasClass(activeClass)) {
		$(backButton).css("display", "unset");
		$(backButton).css("margin-right", "5px");
		$(nextButton).css("display", "none");
		$(payButton).css("display", "unset");
	}
}

function submitForm() {
	const form = $(".assessment-form");
	const submittedValues = $(form).serializeArray();
	const formValues = {};
	for(submittedValue of submittedValues) {
		formValues[submittedValue.name] = submittedValue.value;
	}
	window.submitAssessment(formValues);
	//alert("Thank you for submitting an inquiry. You will be contacted by email or your preferred contact method shortly.");
	$(form)[0].reset();
	$(lastPage).removeClass("active");
	$(firstPage).addClass("active");
}

/**
 * Navigate to the previus form page.
 * @param {HTMLElement} element The active page element
 */
function previousPage(element) {
	$(element).removeClass(activeClass);
	const previousElement = $(element).prev();
	if(previousElement[0] === firstPage) {
		$(backButton).css("display", "none");
	}
	nextButton.innerHTML = nextButtonContent;
	$(previousElement).addClass(activeClass);
}

/**
 * Validates a form page.
 * @param {HTMLElement} page The current page being validated
 * @returns {Boolean} If the page is successully validated or not.
 */

function validatePage(page) {
	const formElements = $(page).find("input, select");
	for(formElement of formElements) {
		const value = formElement.value;
		if(!value) {
			return false;
		}
	}
	return true;
}

function formatBank (bank) {
	if (!bank.id) {
	  return bank.text;
	}
	var baseUrl = "images/bank";
	var $bank = $(
	  '<span><img src="' + baseUrl + '/' + bank.element.value.toLowerCase() + '.png" class="img-flag" /> ' + bank.text + '</span>'
	);
	return $bank;
};
  
$(".bank").select2({
	templateResult: formatBank
});

function formatWallet (wallet) {
	if (!wallet.id) {
	  return wallet.text;
	}
	var baseUrl = "images/wallet";
	var $wallet = $(
	  '<span><img src="' + baseUrl + '/' + wallet.element.value.toLowerCase() + '.png" class="img-flag" /> ' + wallet.text + '</span>'
	);
	return $wallet;
};
  
$(".vendor").select2({
	templateResult: formatWallet
});

$(document).ready(function(){
	$('#form-3').on('submit', function(e){
		$('#myModal').modal('show');
		e.preventDefault();
	})
});