$(document).ready(function () {
    $("#cnic").mask("99999-9999999-9");
    $("#account-no").mask("9999999999999999");
    $("#vendor-cnic").mask("99999-9999999-9");
    $("#mobile-no").mask("9999-9999999");
    $("#card-no").mask("9999 9999 9999 9999");
    $("#card-expiry").mask("99/99");
    $("#cvv").mask("999");
});

var deadline = new Date("Nov 9, 2022 00:00:00").getTime();
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

// Smart Wizrd

$(document).ready(function() {
	$(document).on('click', '.finish', function(e) {
		if($('#thank-you').hasClass('d-none')) {
			$('#thank-you').removeClass('d-none');
			$('#thank-you').addClass('d-block');
			$('#payment').addClass('d-none');
		}
	});

	$(document).on('click', '.home', function(e) {
		if($('#thank-you').hasClass('d-block')) {
			$('#thank-you').addClass('d-none');
			$('#payment').removeClass('d-none');
		}
	});

});

// Smart Wizard

$(function() {
	// Leave step event is used for validating the forms
	$("#smartwizard").on("leaveStep", function(e, anchorObject, currentStepIdx, nextStepIdx, stepDirection) {
		// Validate only on forward movement  
		if(stepDirection == 'forward') {
			let form = document.getElementById('form-' + (currentStepIdx + 1));
			if(form) {
				if(!form.checkValidity()) {
					form.classList.add('was-validated');
					$('#smartwizard').smartWizard("setState", [currentStepIdx], 'error');
					$("#smartwizard").smartWizard('fixHeight');
					return false;
				}
				$('#smartwizard').smartWizard("unsetState", [currentStepIdx], 'error');
			}
		}
	});
	// Step show event
	$("#smartwizard").on("showStep", function(e, anchorObject, stepIndex, stepDirection, stepPosition) {
		$("#prev-btn").removeClass('disabled').prop('disabled', false);
		$("#next-btn").removeClass('disabled').prop('disabled', false);
		if(stepPosition === 'first') {
			$("#prev-btn").addClass('disabled').prop('disabled', true);
		} else if(stepPosition === 'last') {
			$("#next-btn").addClass('disabled').prop('disabled', true);
		} else {
			$("#prev-btn").removeClass('disabled').prop('disabled', false);
			$("#next-btn").removeClass('disabled').prop('disabled', false);
		}
		// Get step info from Smart Wizard
		let stepInfo = $('#smartwizard').smartWizard("getStepInfo");
		$("#sw-current-step").text(stepInfo.currentStep + 1);
		$("#sw-total-step").text(stepInfo.totalSteps);
		if(stepPosition == 'last') {
			$("#btnFinish").prop('disabled', false);
		} else {
			$("#btnFinish").prop('disabled', true);
		}
	});
	// Smart Wizard
	$('#smartwizard').smartWizard({
		selected: 0,
		// autoAdjustHeight: false,
		theme: 'arrows', // basic, arrows, square, round, dots
		transition: {
			animation: 'none'
		},
		toolbar: {
			showNextButton: true, // show/hide a Next button
			showPreviousButton: true, // show/hide a Previous button
			position: 'bottom', // none/ top/ both bottom
			extraHtml: `<button class="btn btn-success finish ms-2" id="btnFinish" disabled onclick="onConfirm()">Complete</button>`
                              //<button class="btn btn-danger" id="btnCancel" onclick="onCancel()">Cancel</button>
		},
		anchor: {
			enableNavigation: true, // Enable/Disable anchor navigation 
			enableNavigationAlways: false, // Activates all anchors clickable always
			enableDoneState: true, // Add done state on visited steps
			markPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
			unDoneOnBackNavigation: true, // While navigate back, done state will be cleared
			enableDoneStateNavigation: true // Enable/Disable the done state navigation
		},
	});
	$("#state_selector").on("change", function() {
		$('#smartwizard').smartWizard("setState", [$('#step_to_style').val()], $(this).val(), !$('#is_reset').prop("checked"));
		return true;
	});
	$("#style_selector").on("change", function() {
		$('#smartwizard').smartWizard("setStyle", [$('#step_to_style').val()], $(this).val(), !$('#is_reset').prop("checked"));
		return true;
	});
});