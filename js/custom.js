//Session

// var deadline = new Date("Dec 16, 2022 15:45:00").getTime();
// var x = setInterval(function() {
// 	var now = new Date().getTime();
// 	var t = deadline - now;
// 	var days = Math.floor(t / (1000 * 60 * 60 * 24));
// 	var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
// 	// var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60 ));
// 	var minutes = Math.floor(t / (1000 * 60 ));
// 	var seconds = Math.floor((t % (1000 * 60)) / 1000);
// 	document.getElementById("timer").innerHTML = "<div class='minutes'>" + minutes + "</div> : <div class='seconds'>" + seconds + '</div>';
// 		if (t < 0) {
// 			clearInterval(x);
// 			document.getElementById("timer").innerHTML = "EXPIRED";
// 		}
// }, 1000);

$(function() {
	$('.counter').setCountDownTimer({
		time: "00:05:00",
		// button: $('.btn'),
		countDownText: '',
		afterCountText: 'Time\'s up!'
	});
});

$.fn.setCountDownTimer = function (param) {
	this.html('<label class="countdownText" style="float:left;margin-right:5px;">' + param.countDownText + '</label>' +
			'<div id="countdown" style="float:left;">' +
				'<strong>' +
					'<span id="minutes" style="float:left"></span>' +
					'<span style="float:left">:</span>' +
					'<span id="seconds" style="float:left"></span>' +
				'</strong>' +
			'</div>' +
			'<div id="aftercount" style="display:none">' + param.afterCountText + '</div>');
	var remTime = param.time.split(":"),
		sTime = new Date().getTime(),
		countDown = (remTime[01] * 60) + parseInt(remTime[02]),
		minutesSel = $("#minutes"),
		secondsSel = $("#seconds"),
		afterCountSel = $("#aftercount"),
		countDownSel = $("#countdown"),
		countDownTextSel = $('.countdownText');

	var timer = setInterval(function () {
		var cTime = new Date().getTime(),
		diff = cTime - sTime,
		seconds = countDown - Math.floor(diff / 1000);
		//param.button.attr('disabled', 'disabled');
		if (seconds >= 0) {
			var minutes = Math.floor(seconds / 60);
			seconds -= minutes * 60;
			minutesSel.text(minutes < 10 ? "0" + minutes : minutes);
			secondsSel.text(seconds < 10 ? "0" + seconds : seconds);
		} else {
			countDownSel.hide();
			countDownTextSel.hide();
			afterCountSel.show();
			//param.button.removeAttr('disabled');
			clearInterval(timer);
		}
	}, 00);
}

// Bank Form

window.addDash = function addDash(a) {
    var b = /(\D+)/g,
        npa = '',
        nxw = '',
        last1 = '';
    a.value = a.value.replace(b, '');
    npa = a.value.substr(0, 5);
    nxw = a.value.substr(5, 7);
    last1 = a.value.substr(12, 1);
    a.value = npa + '-' + nxw + '-' + last1;
}

$('.accountno').bind('keypress', function (event) {
    var regexa = new RegExp("^[a-zA-Z0-9\b]+$");
    var keya = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regexa.test(keya)) {
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

function formatBank (bank) {
	if (!bank.id) {
	  return bank.text;
	}
	var baseUrl = "images/bank";
	var $bank = $(
	//   '<span><img src="' + baseUrl + '/' + bank.element.value.toLowerCase() + '.png" class="img-flag" /> ' + bank.text + '</span>'
	'<span><img class="img-flag" /> <span></span></span>'
	);
	$bank.find("span").text(bank.text);
  	$bank.find("img").attr("src", baseUrl + "/" + bank.element.value.toLowerCase() + ".png");
	return $bank;
};

$(document).ready(function () {

    $('.bank').on('change', function () {
        $(this).valid();
    });

    $(".bank").select2({
		templateResult: formatBank,
		templateSelection: formatBank
   	});

    var validator = $("#bankForm").validate();

});

$(document).ready(function() {
	// Custom method to validate username
	$(".next").click(function() {
		var form = $("#bankForm");
		form.validate({
			errorElement: 'label',
			errorClass: 'error',
			highlight: function(element, errorClass, validClass) {
				//$(element).closest('.form-group').addClass("has-error");
				$(element).parents('.form-control').removeClass('has-success').addClass('has-error');
			},
			unhighlight: function(element, errorClass, validClass) {
				//$(element).closest('.form-group').removeClass("has-error");
				$(element).parents('.form-control').removeClass('has-success').addClass('has-error');
			},
			errorPlacement: function (error, element) {
				if (element.parent('.form-group').length) {
					error.insertAfter(element.parent());
				} else if (element.hasClass('select2')) {
					error.insertAfter(element.next('span'));
				} else {
					error.insertAfter(element);
				}
			},
			rules: {
				bankaccount: {
					required: true,
				},
				accountno: {
					required: true,
				},
				cnic: {
					required: true,
				},
			},
			// messages: {
			// 	bankaccount: {
			// 		required: "This field is Required",
			// 	},
			// 	accountno: {
			// 		required: "This Field is Required",
			// 	},
			// 	cnic: {
			// 		required: "This Field is Required",
			// 	},
			// }
		});
		if(form.valid() === true) {
			if($('#bank_information_1').is(":visible")) {
				current_fs = $('#bank_information_1');
				next_fs = $('#bank_information_2');
			} else if($('#bank_information_2').is(":visible")) {
				current_fs = $('#bank_information_2');
				// next_fs = $('#account_information');
			}
			next_fs.show();
			current_fs.hide();
		}
	});
	$('#previous').click(function() {
		if($('#bank_information_2').is(":visible")) {
			current_fs = $('#bank_information_2');
			next_fs = $('#bank_information_1');
		} else if($('#bank_information_2').is(":visible")) {
			current_fs = $('#bank_information_2');
			//next_fs = $('#company_information');
		}
		next_fs.show();
		current_fs.hide();
	});
});

$(document).ready(function(){
    $('#bankaccount').on('change', function() {
		if ( this.value == 'allied-bank')
		{
			$("#allied").show();
			$("#inputaccount").hide();
			$("#habibmetro").hide();
			$("#alfalah").hide();
			$("#bop").hide();
			$("#mcb").hide();
			$("#samba").hide();
			$("#bok").hide();
			$("#faysal").hide();
			$("#askari").hide();
			$("#islami").hide();
			$("#alhabib").hide();
			$("#hbl").hide();
			$("#konnect").hide();
			$("#albaraka").hide();
			$("#meezan").hide();
		}
		else if ( this.value == 'habib-metro-bank')
		{
			$("#allied").hide();
			$("#inputaccount").hide();
			$("#habibmetro").show();
			$("#alfalah").hide();
			$("#bop").hide();
			$("#mcb").hide();
			$("#samba").hide();
			$("#bok").hide();
			$("#faysal").hide();
			$("#askari").hide();
			$("#islami").hide();
			$("#alhabib").hide();
			$("#hbl").hide();
			$("#konnect").hide();
			$("#albaraka").hide();
			$("#meezan").hide();
		}
		else if ( this.value == 'alfalah-bank')
		{
			$("#allied").hide();
			$("#inputaccount").hide();
			$("#habibmetro").hide();
			$("#alfalah").show();
			$("#bop").hide();
			$("#mcb").hide();
			$("#samba").hide();
			$("#bok").hide();
			$("#faysal").hide();
			$("#askari").hide();
			$("#islami").hide();
			$("#alhabib").hide();
			$("#hbl").hide();
			$("#konnect").hide();
			$("#albaraka").hide();
			$("#meezan").hide();
		}
		else if ( this.value == 'bop-bank')
		{
			$("#allied").hide();
			$("#inputaccount").hide();
			$("#habibmetro").hide();
			$("#alfalah").hide();
			$("#bop").show();
			$("#mcb").hide();
			$("#samba").hide();
			$("#bok").hide();
			$("#faysal").hide();
			$("#askari").hide();
			$("#islami").hide();
			$("#alhabib").hide();
			$("#hbl").hide();
			$("#konnect").hide();
			$("#albaraka").hide();
			$("#meezan").hide();
		}
		else if ( this.value == 'mcbi-bank')
		{
			$("#allied").hide();
			$("#inputaccount").hide();
			$("#habibmetro").hide();
			$("#alfalah").hide();
			$("#bop").hide();
			$("#mcb").show();
			$("#samba").hide();
			$("#bok").hide();
			$("#faysal").hide();
			$("#askari").hide();
			$("#islami").hide();
			$("#alhabib").hide();
			$("#hbl").hide();
			$("#konnect").hide();
			$("#albaraka").hide();
			$("#meezan").hide();
		}
		else if ( this.value == 'samba-bank')
		{
			$("#allied").hide();
			$("#inputaccount").hide();
			$("#habibmetro").hide();
			$("#alfalah").hide();
			$("#bop").hide();
			$("#mcb").hide();
			$("#samba").show();
			$("#bok").hide();
			$("#faysal").hide();
			$("#askari").hide();
			$("#islami").hide();
			$("#alhabib").hide();
			$("#hbl").hide();
			$("#konnect").hide();
			$("#albaraka").hide();
			$("#meezan").hide();
		}
		else if ( this.value == 'bok-bank')
		{
			$("#allied").hide();
			$("#inputaccount").hide();
			$("#habibmetro").hide();
			$("#alfalah").hide();
			$("#bop").hide();
			$("#mcb").hide();
			$("#samba").hide();
			$("#bok").show();
			$("#faysal").hide();
			$("#askari").hide();
			$("#islami").hide();
			$("#alhabib").hide();
			$("#hbl").hide();
			$("#konnect").hide();
			$("#albaraka").hide();
			$("#meezan").hide();
		}
		else if ( this.value == 'faysal-bank')
		{
			$("#allied").hide();
			$("#inputaccount").hide();
			$("#habibmetro").hide();
			$("#alfalah").hide();
			$("#bop").hide();
			$("#mcb").hide();
			$("#samba").hide();
			$("#bok").hide();
			$("#faysal").show();
			$("#askari").hide();
			$("#islami").hide();
			$("#alhabib").hide();
			$("#hbl").hide();
			$("#konnect").hide();
			$("#albaraka").hide();
			$("#meezan").hide();
		}
		else if ( this.value == 'askari-bank')
		{
			$("#allied").hide();
			$("#inputaccount").hide();
			$("#habibmetro").hide();
			$("#alfalah").hide();
			$("#bop").hide();
			$("#mcb").hide();
			$("#samba").hide();
			$("#bok").hide();
			$("#faysal").hide();
			$("#askari").show();
			$("#islami").hide();
			$("#alhabib").hide();
			$("#hbl").hide();
			$("#konnect").hide();
			$("#albaraka").hide();
			$("#meezan").hide();
		}
		else if ( this.value == 'bank-islami-bank')
		{
			$("#allied").hide();
			$("#inputaccount").hide();
			$("#habibmetro").hide();
			$("#alfalah").hide();
			$("#bop").hide();
			$("#mcb").hide();
			$("#samba").hide();
			$("#bok").hide();
			$("#faysal").hide();
			$("#askari").hide();
			$("#islami").show();
			$("#alhabib").hide();
			$("#hbl").hide();
			$("#konnect").hide();
			$("#albaraka").hide();
			$("#meezan").hide();
		}
		else if ( this.value == 'bank-al-habib-bank')
		{
			$("#allied").hide();
			$("#inputaccount").hide();
			$("#habibmetro").hide();
			$("#alfalah").hide();
			$("#bop").hide();
			$("#mcb").hide();
			$("#samba").hide();
			$("#bok").hide();
			$("#faysal").hide();
			$("#askari").hide();
			$("#islami").hide();
			$("#alhabib").show();
			$("#hbl").hide();
			$("#konnect").hide();
			$("#albaraka").hide();
			$("#meezan").hide();
		}
		else if ( this.value == 'habib-bank')
		{
			$("#allied").hide();
			$("#inputaccount").hide();
			$("#habibmetro").hide();
			$("#alfalah").hide();
			$("#bop").hide();
			$("#mcb").hide();
			$("#samba").hide();
			$("#bok").hide();
			$("#faysal").hide();
			$("#askari").hide();
			$("#islami").hide();
			$("#alhabib").hide();
			$("#hbl").show();
			$("#konnect").hide();
			$("#albaraka").hide();
			$("#meezan").hide();
		}
		// else if ( this.value == 'konnect-bank')
		// {
		// 	$("#allied").hide();
		// 	$("#inputaccount").hide();
		// 	$("#habibmetro").hide();
		// 	$("#alfalah").hide();
		// 	$("#bop").hide();
		// 	$("#mcb").hide();
		// 	$("#samba").hide();
		// 	$("#bok").hide();
		// 	$("#faysal").hide();
		// 	$("#askari").hide();
		// 	$("#islami").hide();
		// 	$("#alhabib").hide();
		// 	$("#hbl").hide();
		// 	$("#konnect").show();
		// 	$("#albaraka").hide();
		// 	$("#meezan").hide();
		// }
		else if ( this.value == 'albaraka-bank')
		{
			$("#allied").hide();
			$("#inputaccount").hide();
			$("#habibmetro").hide();
			$("#alfalah").hide();
			$("#bop").hide();
			$("#mcb").hide();
			$("#samba").hide();
			$("#bok").hide();
			$("#faysal").hide();
			$("#askari").hide();
			$("#islami").hide();
			$("#alhabib").hide();
			$("#hbl").hide();
			$("#konnect").hide();
			$("#albaraka").show();
			$("#meezan").hide();
		}
		else if ( this.value == 'meezan-bank')
		{
			$("#allied").hide();
			$("#inputaccount").hide();
			$("#habibmetro").hide();
			$("#alfalah").hide();
			$("#bop").hide();
			$("#mcb").hide();
			$("#samba").hide();
			$("#bok").hide();
			$("#faysal").hide();
			$("#askari").hide();
			$("#islami").hide();
			$("#alhabib").hide();
			$("#hbl").hide();
			$("#konnect").hide();
			$("#albaraka").hide();
			$("#meezan").show();
		}
		else 
		{	
			$("#inputaccount").show();
			$("#allied").hide();
			$("#habibmetro").hide();
			$("#alfalah").hide();
			$("#bop").hide();
			$("#mcb").hide();
			$("#samba").hide();
			$("#bok").hide();
			$("#faysal").hide();
			$("#askari").hide();
			$("#islami").hide();
			$("#alhabib").hide();
			$("#hbl").hide();
			$("#konnect").hide();
			$("#albaraka").hide();
			$("#meezan").hide();
		}
    });

	var $regexallac = /^[0-9]{4}(001|002)[0-9]{13}$/;
	var $regexalliban = /^(PK)[0-9]{2}(ABPA)[0-9]{16}/g;
	$('#alliedaccount').on('keypress keydown keyup',function(){
		if (!$(this).val().match($regexallac) && !$(this).val().match($regexalliban)) {
			$('.emsg').removeClass('hidden');
			$('.emsg').show();
		}
		else {
			$('.emsg').addClass('hidden');
		}
    });

	var $regexhmbac = /^[0]?[6]{1,2}\d{18}$/;
	var $regexhmbiban = /^(PK)\d{2}(MPBL)[0-9]{16}/g;
	$('#hmbaccount').on('keypress keydown keyup',function(){
		if (!$(this).val().match($regexhmbac) && !$(this).val().match($regexhmbiban)) {
		// there is a mismatch, hence show the error message
			$('.emsg').removeClass('hidden');
			$('.emsg').show();
		}
		else {
			// else, do not display message
			$('.emsg').addClass('hidden');
		}
    });

	var $regexalfac = /^[0-9]{4}(1|5)[0-9]{9}$/;
	$('#alfalahaccount').on('keypress keydown keyup',function(){
		if (!$(this).val().match($regexalfac)) {
		// there is a mismatch, hence show the error message
			$('.emsg').removeClass('hidden');
			$('.emsg').show();
		}
		else {
			// else, do not display message
			$('.emsg').addClass('hidden');
		}
    });

	var $regexbopac = /^(4|5|6|8)[0-9]{15}$/;
	$('#bopaccount').on('keypress keydown keyup',function(){
		if (!$(this).val().match($regexbopac)) {
			$('.emsg').removeClass('hidden');
			$('.emsg').show();
		}
		else {
			$('.emsg').addClass('hidden');
		}
    });

	// var $regexmcbac = /^[0-9]{16}$/;
	var $regexmcbac = /^(10)[0-9]{14}$/;
	var $regexmcbiban = /^(PK)\d{2}(MCIB)[0-9]{16}/g;
	$('#mcbaccount').on('keypress keydown keyup',function(){
		if (!$(this).val().match($regexmcbac) && !$(this).val().match($regexmcbiban)) {
		// there is a mismatch, hence show the error message
			$('.emsg').removeClass('hidden');
			$('.emsg').show();
		}
		else {
			// else, do not display message
			$('.emsg').addClass('hidden');
		}
    });

	var $regexsambaac = /^(20|64|65)[0-9]{8}$/;
	$('#sambaaccount').on('keypress keydown keyup',function(){
		if (!$(this).val().match($regexsambaac)) {
		// there is a mismatch, hence show the error message
			$('.emsg').removeClass('hidden');
			$('.emsg').show();
		}
		else {
			// else, do not display message
			$('.emsg').addClass('hidden');
		}
    });

	var $regexbokac = /^(0|1)[0-9]{13,15}$/;
	$('#bokaccount').on('keypress keydown keyup',function(){
		if (!$(this).val().match($regexbokac)) {
		// there is a mismatch, hence show the error message
			$('.emsg').removeClass('hidden');
			$('.emsg').show();
		}
		else {
			// else, do not display message
			$('.emsg').addClass('hidden');
		}
    });

	var $regexfaysalac = /^(0|3|8)[0-9]{13,15}$/;
	$('#faysalaccount').on('keypress keydown keyup',function(){
		if (!$(this).val().match($regexfaysalac)) {
		// there is a mismatch, hence show the error message
			$('.emsg').removeClass('hidden');
			$('.emsg').show();
		}
		else {
			// else, do not display message
			$('.emsg').addClass('hidden');
		}
    });

	var $regexaskariac = /^[0-9]{13}$/;
	var $regexaskariiban = /^(PK)\d{2}(ASCM)[0-9]{16}/g;
	$('#askariaccount').on('keypress keydown keyup',function(){
		if (!$(this).val().match($regexaskariac) && !$(this).val().match($regexaskariiban)) {
		// there is a mismatch, hence show the error message
			$('.emsg').removeClass('hidden');
			$('.emsg').show();
		}
		else {
			// else, do not display message
			$('.emsg').addClass('hidden');
		}
    });

	var $regexislamiac = /^[0-9]{15}$/;
	$('#islamiaccount').on('keypress keydown keyup',function(){
		if (!$(this).val().match($regexislamiac)) {
		// there is a mismatch, hence show the error message
			$('.emsg').removeClass('hidden');
			$('.emsg').show();
		}
		else {
			// else, do not display message
			$('.emsg').addClass('hidden');
		}
    });

	var $regexalhabibac = /^[0-9]{17}$/;
	var $regexalhabibiban = /^(PK)\d{2}(BAHL)[0-9]{16}/g;
	$('#alhabibaccount').on('keypress keydown keyup',function(){
		if (!$(this).val().match($regexalhabibac) && !$(this).val().match($regexalhabibiban)) {
		// there is a mismatch, hence show the error message
			$('.emsg').removeClass('hidden');
			$('.emsg').show();
		}
		else {
			// else, do not display message
			$('.emsg').addClass('hidden');
		}
    });

	var $regexhblac = /^[0-9]{14}$/;
	$('#hblaccount').on('keypress keydown keyup',function(){
		if (!$(this).val().match($regexhblac)) {
		// there is a mismatch, hence show the error message
			$('.emsg').removeClass('hidden');
			$('.emsg').show();
		}
		else {
			// else, do not display message
			$('.emsg').addClass('hidden');
		}
    });

	// var $regexkonnectac = /^[0-9]{11}$/;
	// $('#konnectaccount').on('keypress keydown keyup',function(){
	// 	if (!$(this).val().match($regexkonnectac)) {
	// 	// there is a mismatch, hence show the error message
	// 		$('.emsg').removeClass('hidden');
	// 		$('.emsg').show();
	// 	}
	// 	else {
	// 		// else, do not display message
	// 		$('.emsg').addClass('hidden');
	// 	}
    // });

	var $regexalbarakaac = /^[0-9]{13}$/;
	var $regexalbarakaiban = /^(PK)\d{2}(AIIN)[0-9]{16}/g;
	$('#albarakaaccount').on('keypress keydown keyup',function(){
		if (!$(this).val().match($regexalbarakaac) && !$(this).val().match($regexalbarakaiban)) {
		// there is a mismatch, hence show the error message
			$('.emsg').removeClass('hidden');
			$('.emsg').show();
		}
		else {
			// else, do not display message
			$('.emsg').addClass('hidden');
		}
    });

	var $regexmeezanac = /^[0-9]{14}$/;
	$('#meezanaccount').on('keypress keydown keyup',function(){
		if (!$(this).val().match($regexmeezanac)) {
		// there is a mismatch, hence show the error message
			$('.emsg').removeClass('hidden');
			$('.emsg').show();
		}
		else {
			// else, do not display message
			$('.emsg').addClass('hidden');
		}
    });

});

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

$(document).ready(function() {
	$(document).on('click', '#pay', function(e) {
		if($('#bank-confirmation').hasClass('d-none')) {
			$('#bank-confirmation').removeClass('d-none');
			$('#bank-confirmation').addClass('d-block');
			$('#payment').addClass('d-none');
		}
	});

});

// Wallet Form

window.addDashe = function addDashe(c) {
    var d = /(\D+)/g,
		first2 = '03',
        npb = '',
        nxx = '';
    c.value = c.value.replace(d, '');
	last2 = c.value.substr(0, 2);
    npb = c.value.substr(2, 2);
    nxx = c.value.substr(4, 7);
    c.value = first2 + npb + '-' + nxx ;
}

window.addDashes = function addDashes(e) {
    var f = /(\D+)/g,
        npc = '',
        nxy = '',
        last3 = '';
    e.value = e.value.replace(f, '');
    npc = e.value.substr(0, 5);
    nxy = e.value.substr(5, 7);
    last3 = e.value.substr(12, 1);
    e.value = npc + '-' + nxy + '-' + last3;
}

$('#mobileno').bind('keypress', function (event) {
    var regexm = new RegExp("^[0-9\b]+$");
    var keym = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regexm.test(keym)) {
       event.preventDefault();
       return false;
    }
});

$('#vendorcnic').bind('keypress', function (event) {
    var regexvc = new RegExp("^[0-9\b]+$");
    var keyvc = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regexvc.test(keyvc)) {
       event.preventDefault();
       return false;
    }
});

function formatWallet (wallet) {
	if (!wallet.id) {
	  return wallet.text;
	}
	var baseUrl = "images/wallet";
	var $wallet = $(
	//  '<span><img src="' + baseUrl + '/' + wallet.element.value.toLowerCase() + '.png" class="img-flag" /> ' + wallet.text + '</span>'
	'<span><img class="img-flag" /> <span></span></span>'
	);
	$wallet.find("span").text(wallet.text);
  	$wallet.find("img").attr("src", baseUrl + "/" + wallet.element.value.toLowerCase() + ".png");
	return $wallet;
};

$(document).ready(function () {

    $('.vendor').on('change', function () {
        $(this).valid();
    });

    $(".vendor").select2({
		templateResult: formatWallet,
		templateSelection: formatWallet
   	});

    var validators = $("#walletForm").validate();

});

$("#walletForm").validate({
	highlight: function (element, errorClass, validClass) {
		$(element).parents('.form-control').removeClass('has-success').addClass('has-error');     
	},
	unhighlight: function (element, errorClass, validClass) {
		$(element).parents('.form-control').removeClass('has-error').addClass('has-success');
	},
	errorPlacement: function (error, element) {
		if (element.parent('.form-group').length) {
			error.insertAfter(element.parent());
		} else if (element.hasClass('select2')) {
			error.insertAfter(element.next('span'));
		} else {
			error.insertAfter(element);
		}
	}
});

$(document).ready(function() {
    $(document).on('click', '.pay', function(e) {
		if($('#myModal').hasClass('d-none')) {
			$('#myModal').removeClass('d-none');
			
		}
	});

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
});

// Card Form

window.addDashess = function addDashess(g) {
    var h = /(\D+)/g,
        npc = '',
        nxy = '',
        last4 = '',
		last = '';
    g.value = g.value.replace(h, '');
    npc = g.value.substr(0, 4);
    nxy = g.value.substr(4, 4);
    last4 = g.value.substr(8, 4);
	last = g.value.substr(12, 4);
    g.value = npc + ' ' + nxy + ' ' + last4 + ' ' + last;
}

var card = document.querySelector('#number');
card.addEventListener('keyup', function(e) {
	if (event.key != 'Backspace' && (card.value.length === 4 || card.value.length === 9 || card.value.length === 14)) {
  		card.value += ' ';
  	}
	if(card.value.length == 19)
	{

		update(card.value);

	}
});

$('#number').bind('keypress', function (event) {
    var regexcn = new RegExp("^[0-9\b]+$");
    var keycn = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regexcn.test(keycn)) {
       event.preventDefault();
       return false;
    }
});

$('#nameOnCard').bind('keypress', function (event) {
    var regexcnm = new RegExp("^[a-zA-Z \b]+$");
    var keycnm = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regexcnm.test(keycnm)) {
       event.preventDefault();
       return false;
    }
});

$('#expiry-month').bind('keypress', function (event) {
    var regexcm = new RegExp("^[0-9\b]+$");
    var keycm = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regexcm.test(keycm)) {
       event.preventDefault();
       return false;
    }
});

$('#expiry-year').bind('keypress', function (event) {
    var regexcy = new RegExp("^[0-9\b]+$");
    var keycy = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regexcy.test(keycy)) {
       event.preventDefault();
       return false;
    }
});

$('#security-code').bind('keypress', function (event) {
    var regexcvv = new RegExp("^[0-9\b]+$");
    var keycvv = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regexcvv.test(keycvv)) {
       event.preventDefault();
       return false;
    }
});

$("#cardForm").validate();

// function validateCreditCardNumber(cardNumber) {
	
// 	cardNumber = cardNumber.split(' ').join("");
// 	if (parseInt(cardNumber) <= 0 || (!/\d{15,16}(~\W[a-zA-Z])*$/.test(cardNumber)) || cardNumber.length > 16) {
// 		return false;
// 	}
// 	var carray = new Array();
// 	for (var i = 0; i < cardNumber.length; i++) {
// 		carray[carray.length] = cardNumber.charCodeAt(i) - 48;
// 	}
// 	carray.reverse();
// 	var sum = 0;
// 	for (var i = 0; i < carray.length; i++) {
// 		var tmp = carray[i];
// 		if ((i % 2) != 0) {
// 			tmp *= 2;
// 			if (tmp > 9) {
// 				tmp -= 9;
// 			}
// 		}
// 		sum += tmp;
// 	}
// 	return ((sum % 10) == 0);
// }

// function cardType(cardNumber) { // returns card type; should not rely on this for checking if a card is valid
// 	cardNumber = cardNumber.split(' ').join("");
//     var o = {
//         electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
//         maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
//         dankort: /^(5019)\d+$/,
//         interpayment: /^(636)\d+$/,
//         unionpay: /^(62|88)\d+$/,
//         visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
//         mastercard: /^5[1-5][0-9]{14}$/,
//         amex: /^3[47][0-9]{13}$/,
//         diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
//         discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
//         jcb: /^(?:2131|1800|35\d{3})\d{11}$/
//     }
//     for(var k in o) {
//         if(o[k].test(cardNumber)) {
//             return k;
// 		}
//     }
// 	return null;
// }

// function update(cardNumber) {
// 	var cardtype = document.getElementById("cardtype");
// 	var valid = document.getElementById("valid");
// 	if(validateCreditCardNumber(cardNumber)) {
		
// 		valid.innerText = "Valid Card";
// 		cardtype.innerText = cardType(cardNumber);
// 		// img.src = (cardType(cardNumber) || "other") + "images/card/.png";
// 	}
// 	else {
// 		valid.innerText = "InValid Card";
// 		valid.style.color = "red";
// 		cardtype.innerText = cardType(cardNumber);
// 		//img.src = "images/card/other.png";
// 	}
// }

// const monthInput = document.querySelector('#month');
// const yearInput = document.querySelector('#year');

// const focusSibling = function(target, direction, callback) {
// 	const nextTarget = target[direction];
// 	nextTarget && nextTarget.focus();
// 	// if callback is supplied we return the sibling target which has focus
// 	callback && callback(nextTarget);
// }

// // input event only fires if there is space in the input for entry. 
// // If an input of x length has x characters, keyboard press will not fire this input event.
// monthInput.addEventListener('input', (event) => {

// 	const value = event.target.value.toString();
// 	// adds 0 to month user input like 9 -> 09
// 	if (value.length === 1 && value > 1) {
// 		event.target.value = "0" + value;
// 	}
// 	// bounds
// 	if (value === "00") {
// 		event.target.value = "01";
// 	} else if (value > 12) {
// 		event.target.value = "12";
// 	}
// 	// if we have a filled input we jump to the year input
// 	2 <= event.target.value.length && focusSibling(event.target, "nextElementSibling");
// 	event.stopImmediatePropagation();
// });

// yearInput.addEventListener('keydown', (event) => {
// 	// if the year is empty jump to the month input
// 	if (event.key === "Backspace" && event.target.selectionStart === 0) {
// 		focusSibling(event.target, "previousElementSibling");
// 		event.stopImmediatePropagation();
// 	}
// });

$(document).ready(function() {
	$(document).on('submit', function(e) {
		$('#card-confirmation').removeClass('d-none');
		$('#card-confirmation').addClass('d-block');
		$('#payment').addClass('d-none');
		e.preventDefault()
	})

});