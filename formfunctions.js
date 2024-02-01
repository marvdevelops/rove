
  $(function () {
    $( ".loan_type" ).on( "change", function() {
      $(".loan_type").prop('checked',false);
      $(".loan_type").parent().removeClass('checkbox-style');
      $(this).prop('checked',true);
			$("#loan_type_value").val($(this).attr('id'));
      $(this).parent().addClass('checkbox-style');
    } );
    
    $( ".loan_term" ).on( "change", function() {
      $(".loan_term").prop('checked',false);
      $(".loan_term").parent().removeClass('checkbox-style-options');
      $("#loan_term_value").val($(this).attr('id'));
			$(this).prop('checked',true);
      $(this).parent().addClass('checkbox-style-options');
    } );
    
    $( ".payment_frequency" ).on( "change", function() {
      $(".payment_frequency").prop('checked',false);
      $(".payment_frequency").parent().removeClass('checkbox-style-options');
			$("#payment_frequency").val($(this).attr('name'));
      $(this).prop('checked',true);
      $(this).parent().addClass('checkbox-style-options');
    } );
    
    $( ".breakdown_insurance" ).on( "change", function() {
      $(".breakdown_insurance").prop('checked',false);
      $(".breakdown_insurance").parent().removeClass('checkbox-style-options');
			$("#breakdown_insurance").val($(this).attr('id'));
      $(this).prop('checked',true);
      $(this).parent().addClass('checkbox-style-options');
    } );
    
    $( ".security_vehicle" ).on( "change", function() {
      $(".security_vehicle").prop('checked',false);
      $(".security_vehicle").parent().removeClass('checkbox-style-options');
      $(this).prop('checked',true);
      $(this).parent().addClass('checkbox-style-options');
    } );
    
    $( ".own_property" ).on( "change", function() {
      $(".own_property").prop('checked',false);
      $(".own_property").parent().removeClass('checkbox-style-options');
      $(this).prop('checked',true);
      $(this).parent().addClass('checkbox-style-options');
    } );
    
    $( ".outstanding_debts" ).on( "change", function() {
      $(".outstanding_debts").prop('checked',false);
      $(".outstanding_debts").parent().removeClass('checkbox-style-options');
      $(this).prop('checked',true);
      $(this).parent().addClass('checkbox-style-options');
    } );
    
  });

		var slideIndex = 0;
    var loanType;

    var loanAmount = parseFloat($('#Loan-Amount').val());
    var loanTerm = $('#loan_term_value').val();
    var paymentFrequency = $('#payment_frequency').val();
    var breakdownInsurance = $('#breakdown_insurance');

    $(document).ready(function () {
        $('[data-toggle="datepicker"]').datepicker({
            format: 'mm-dd-yyyy'
        });
        if (window.innerWidth < 768) {
            $('[data-toggle="datepicker"]').attr('readonly', 'readonly')
        }
        $('.loan_type').on("click", function(){
        	$('#next-step').fadeIn(100);
        });
    });
    
    function validate(){
    	switch (slideIndex){
      	case 0:
        	$('#next-step').show();
          break;
        case 1:
        	$('#next-step').hide();
          break;
       	case 2:
        	$('#next-step').hide();
          break;
        case 3:
        	$('#next-step').show();
          calculateResult();
          break;
        case 4:
        	$('#next-step').hide();
          break;
        case 5:
        	$('#next-step').hide();
          break;
        case 6:
        	$('#next-step').hide();
          break;
        case 7:
        	$('#next-step').hide();
          break;
        case 8:
        	$('#next-step').hide();
          break;
        case 9:
        	$('#next-step').hide();
          break;
        default:
        	
      }
    }
    
    
    function calculateResult(){
    	switch(loanTerm){
      	case 'Pay-Back-36mo':
        	loanTerm = 36;
        break;
        case 'Pay-Back-48mo':
        	loanTerm = 48;
				break;
        case 'Pay-Back-60mo':
        	loanTerm = 60;
        break;
       	default:
      }

			switch(paymentFrequency){
      	case 'Weekly':
        	paymentFrequency = parseFloat(loanTerm) / 4;
       	break;
        case 'Fortnightly':
        	paymentFrequency = parseFloat(loanTerm) / 2;
       	break;
        case 'Monthly':
        	paymentFrequency = parseFloat(loanTerm) / 1;
        break;
       	default:
      }
      
      if($('#breakdown_insurance').val() == "MB-Insurance-Yes"){
      	breakdownInsurance = 5000;
      }
			
      loanAmount = parseFloat(loanAmount) * 0.1295;
			calculationResult = parseFloat(loanAmount) / parseFloat(paymentFrequency);
			
    	$('#calculation-result').text(parseFloat(calculationResult));
			$('#payment-frequency-result').text($("#payment_frequency").val());
    }


    function checkFields() {
        var currentStep = $('.Slide:visible');
        var requiredInputs = currentStep.find('input[required], select[required]');

        var isValid = true;
        requiredInputs.each(function() {
            if ($(this).val() === '' || ($(this).is('select') && $(this).val() === null)) {
                isValid = false;
                return false; // exit the loop if any required field is empty
            }
        });
				
        if (isValid) {
            $('#next-step').show();
        } else {
            $('#next-step').hide();
        }
        
    }

    // Check fields on input/change
    $('input[required], select[required]').on('input change keyup', function() {
        checkFields();
    });

    // "Next" button click event
    $('#next-step').on('click', function() {
        slideIndex += 1;
        validate();
        console.log(slideIndex);
    });

    // "Previous" button click event
    $('#previous-step').on('click', function() {
       slideIndex -= 1;
    });

