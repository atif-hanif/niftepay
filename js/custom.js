var cnic = document.querySelector('#cnic');
cnic.addEventListener('keyup', function(e) {
	if (event.key != 'Backspace' && (cnic.value.length === 5 || cnic.value.length === 13)) {
  		cnic.value += '-';
  	}
});

var vcnic = document.querySelector('#vendor-cnic');
vcnic.addEventListener('keyup', function(e) {
	if (event.key != 'Backspace' && (vcnic.value.length === 5 || vcnic.value.length === 13)) {
  		vcnic.value += '-';
  	}
});

var mobile = document.querySelector('#mobile-no');
mobile.addEventListener('keyup', function(e) {
	if (event.key != 'Backspace' && (mobile.value.length === 4)) {
  		mobile.value += '-';
  	}
});

var card = document.querySelector('#card-no');
card.addEventListener('keyup', function(e) {
	if (event.key != 'Backspace' && (card.value.length === 4 || card.value.length === 9 || card.value.length === 14)) {
  		card.value += ' ';
  	}
});

var cexpiry = document.querySelector('#card-expiry');
cexpiry.addEventListener('keyup', function(e) {
	if (event.key != 'Backspace' && (cexpiry.value.length === 2)) {
  		cexpiry.value += '/';
  	}
});

$('#account-no').bind('keypress', function (event) {
    var regexa = new RegExp("^[a-zA-Z0-9\b]+$");
    var keya = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regexa.test(keya)) {
       event.preventDefault();
       return false;
    }
});

$('#mobile-no').bind('keypress', function (event) {
    var regexm = new RegExp("^[0-9\b]+$");
    var keym = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regexm.test(keym)) {
       event.preventDefault();
       return false;
    }
});

$('#cnic').bind('keypress', function (event) {
    var regexc = new RegExp("^[0-9\b]+$");
    var keyc = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regexc.test(keyc)) {
       event.preventDefault();
       return false;
    }
});

$('#vendor-cnic').bind('keypress', function (event) {
    var regexvc = new RegExp("^[0-9\b]+$");
    var keyvc = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regexvc.test(keyvc)) {
       event.preventDefault();
       return false;
    }
});

$('#card-no').bind('keypress', function (event) {
    var regexcn = new RegExp("^[0-9\b]+$");
    var keycn = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regexcn.test(keycn)) {
       event.preventDefault();
       return false;
    }
});

$('#card-expiry').bind('keypress', function (event) {
    var regexce = new RegExp("^[0-9\b]+$");
    var keyce = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regexce.test(keyce)) {
       event.preventDefault();
       return false;
    }
});

$('#cvv').bind('keypress', function (event) {
    var regexcvv = new RegExp("^[0-9\b]+$");
    var keycvv = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regexcvv.test(keycvv)) {
       event.preventDefault();
       return false;
    }
});

// Bank Form

var currentTab = 0;
document.addEventListener("DOMContentLoaded", function(event) {
	showTab(currentTab);
});

function showTab(n) {
	var x = document.getElementsByClassName("tab");
	x[n].style.display = "block";
	if(n == 0) {
		document.getElementById("prevBtn").style.display = "none";
		document.getElementById("pay").style.display = "none";
	} else {
		document.getElementById("prevBtn").style.display = "inline";
		document.getElementById("pay").style.display = "none";
	}
	if(n == (x.length - 1)) {
		document.getElementById("pay").style.display = "inline";
		document.getElementById("nextBtn").style.display = "none";
		//document.getElementById("nextBtn").innerHTML = "Submit <i class='fa fa-arrow-right'></i>";
	} else {
		document.getElementById("pay").style.display = "none";
		document.getElementById("nextBtn").style.display = "inline";
		//document.getElementById("nextBtn").innerHTML = "Next <i class='fa fa-arrow-right'></i>";
	}
	fixStepIndicator(n)
}

function nextPrev(n) {
	var x = document.getElementsByClassName("tab");
	if(n == 1 && !validateForm()) return false;
	x[currentTab].style.display = "none";
	currentTab = currentTab + n;
	if(currentTab >= x.length) {
		// document.getElementById("regForm").submit();
		// return false;
		//alert("sdf");
		document.getElementById("nextprevious").style.display = "none";
		document.getElementById("bank-steps").style.display = "none";
		document.getElementById("register").style.display = "none";
		document.getElementById("payment").style.display = "none";
		document.getElementById("bank-confirmation").style.display = "block";
	}
	showTab(currentTab);
}

function validateForm() {
	var x, y, i, valid = true;
	x = document.getElementsByClassName("tab");
	y = x[currentTab].getElementsByTagName("input");
	for(i = 0; i < y.length; i++) {
		if(y[i].value == "") {
			y[i].className += " invalid";
			valid = false;
			document.getElementById("bankerror1").innerHTML = "This field is required."
			document.getElementById("bankerror2").innerHTML = "This field is required."
			document.getElementById("bankerror3").innerHTML = "This field is required."
			document.getElementById("bankerror4").innerHTML = "This field is required."
		}
	}

	if(valid) {
		document.getElementsByClassName("bank-step")[currentTab].className += " finish";
	}
	return valid;
}

function fixStepIndicator(n) {
	var i, x = document.getElementsByClassName("bank-step");
	for(i = 0; i < x.length; i++) {
		x[i].className = x[i].className.replace(" active", "");
	}
	x[n].className += " active";
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

$(".vendor").select2({
	templateResult: formatWallet
});

// Wallet Bank

const nextButton = document.getElementById("next");
const backButton = document.getElementById("back");

const pages = $("#walletForm .page");
const firstPage = $(pages).first()[0];
const lastPage = $(pages).last()[0];
const activeClass = "active";
const nextButtonContent = "Proceed <i class='fa fa-arrow-right pt-1 ps-1'></i>";
nextButton.addEventListener("click", function() {
	const activePage = $("#walletForm .page.active");
	const isValid = validatePage(activePage);
	if(isValid) {
		nextPage(activePage);
	} else {
		var element = document.getElementById("mobile-no");
		element.classList.add("valid");
		var element = document.getElementById("vendor-cnic");
		element.classList.add("valid");
		document.getElementById("walleterror1").innerHTML = "This field is required."
		document.getElementById("walleterror2").innerHTML = "This field is required."
		document.getElementById("walleterror3").innerHTML = "This field is required."
	}
});

backButton.addEventListener("click", function() {
	const activePage = $("#walletForm .page.active");
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
		nextButton.innerHTML = "Submit Assessment";
		$('#next').removeClass("d-flex");
	}
	nextElement.addClass(activeClass);
	if(!$(firstPage).hasClass(activeClass)) {
		$(backButton).css("display", "unset");
	}
}

/**
 * Submitting the website assessment form to firebase real-time database.
 */
function submitForm() {
	const form = $("#walletForm");
	const submittedValues = $(form).serializeArray();
	const formValues = {};
	for(submittedValue of submittedValues) {
		formValues[submittedValue.name] = submittedValue.value;
	}
	$(lastPage).removeClass("active");
	$(firstPage).addClass("active");
	$('#myModal').modal('show');
	// $('#myModal').removeClass("d-none");
	// $('#myModal').addClass("d-block");
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
	const formElements = $(page).find("input, textarea, select");
	for(formElement of formElements) {
		const value = formElement.value;
		if(!value) {
			return false;
		}
	}
	return true;
}

// Card Form


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

$(".bank").select2({
	templateResult: formatBank
});

//Session

var deadline = new Date("Nov 22, 2022 16:00:00").getTime();
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

$(document).ready(function() {
	$(document).on('click', '#pay', function(e) {
		if($('#bank-confirmation').hasClass('d-none')) {
			$('#bank-confirmation').removeClass('d-none');
			$('#bank-confirmation').addClass('d-block');
			$('#payment').addClass('d-none');
		}
	});

	$(document).on('click', '.pay', function(e) {
		if($('#myModal').hasClass('d-none')) {
			$('#myModal').removeClass('d-none');
			
		}
	});

	$("#walletForm").validate();

	// $(document).on('click', '.back', function(e) {
	// 	if($('#myModal').hasClass('show')) {
	// 		$('#myModal').css("display", "none")
	// 		$('.modal-backdrop').removeClass('show');
	// 		$('.modal-backdrop').addClass('hide');
	// 	}
	// });

	$(document).on('click', '.wallet-div', function(e) {
		if($('#wallet-confirmation').hasClass('d-none')) {
			$('#wallet-confirmation').removeClass('d-none');
			$('#wallet-confirmation').addClass('d-block');
			$('#payment').addClass('d-none');
			$('#myModal').removeClass('show');
			$('#myModal').addClass('hide');
			$('#myModal').css("display", "none")
			$('.modal-backdrop').removeClass('show');
			$('.modal-backdrop').addClass('hide');
			$('.modal-open').css({"overflow": ""});
		}
	});

	// $(document).on('click', '.proceed', function(e) {
	// 	if($('#card-confirmation').hasClass('d-none')) {
	// 		$('#card-confirmation').removeClass('d-none');
	// 		$('#card-confirmation').addClass('d-block');
	// 		$('#payment').addClass('d-none');
	// 	}
	// });

	$("#cardForm").validate();

	$(document).on('submit', function(e) {
		$('#card-confirmation').removeClass('d-none');
		$('#card-confirmation').addClass('d-block');
		$('#payment').addClass('d-none');
		e.preventDefault()
	})

	// $(document).on('click', '.home', function(e) {
	// 	if($('#bank-confirmation').hasClass('d-block')) {
	// 		$('#bank-confirmation').addClass('d-none');
	// 		$('#payment').removeClass('d-none');
	// 	}
	// });

	// $(document).on('click', '.home', function(e) {
	// 	if($('#wallet-confirmation').hasClass('d-block')) {
	// 		$('#wallet-confirmation').addClass('d-none');
	// 		$('#payment').removeClass('d-none');
	// 	}
	// });
	
	// $(document).on('click', '.home', function(e) {
	// 	if($('#card-confirmation').hasClass('d-block')) {
	// 		$('#card-confirmation').addClass('d-none');
	// 		$('#payment').removeClass('d-none');
	// 	}
	// });

});