$(document).ready(function() {
    var billingPageDone = false;
    var shippingPageDone = false;
    var paymentPageDone = false;
    var ccBrand = "-1";
    var states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
        'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH',
        'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'
    ];

    var billingFirstName, billingMiddleName, billingLastName, billingAddressLine1, billingAddressLine2,
        billingCity, billingState, billingZip, email, billingPhone;
    var shippingFirstName, shippingMiddleName, shippingLastName, shippingAddressLine1, shippingAddressLine2,
        shippingCity, shippingState, shippingZip, shippingPhone;
    var ccName, ccNumber, ccCvv, ccExp;

    $("#billingZip").keyup(function() {
        $("#billingZip").val(this.value.match(/[0-9]*/));
    });

    $("#billingPhone").keyup(function() {
        var phoneNumDigits = this.value.replace(/\D/g, '');
        if (phoneNumDigits.length > 6) {
            $("#billingPhone").val(phoneNumDigits.substring(0, 10).replace(/(\d{3})(\d{3})(\d)/, "($1) $2-$3"));
        } else if (phoneNumDigits.length > 3) {
            $("#billingPhone").val(phoneNumDigits.replace(/(\d{3})(\d)/, "($1) $2"));
        } else {
            $("#billingPhone").val(phoneNumDigits)
        }
    });

    function validateBillingPage() {
        var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var valid = true;
        if (document.getElementById("billingFirstName").value.length < 1) {
            $("#billingFirstNameGroup").addClass("has-error");
            valid = false;
        } else $("#billingFirstNameGroup").removeClass("has-error");
        if (document.getElementById("billingLastName").value.length < 1) {
            $("#billingLastNameGroup").addClass("has-error");
            valid = false;
        } else $("#billingLastNameGroup").removeClass("has-error");
        if (document.getElementById("billingAddressLine1").value.length < 1) {
            $("#billingAddressLine1Group").addClass("has-error");
            valid = false;
        } else $("#billingAddressLine1Group").removeClass("has-error");
        if (document.getElementById("billingCity").value.length < 1) {
            $("#billingCityGroup").addClass("has-error");
            valid = false;
        } else $("#billingCityGroup").removeClass("has-error");
        if (states.indexOf(document.getElementById("billingState").value.toUpperCase()) == -1) {
            $("#billingStateGroup").addClass("has-error");
            valid = false;
        } else $("#billingStateGroup").removeClass("has-error");
        if (document.getElementById("billingZip").value.length != 5) {
            $("#billingZipGroup").addClass("has-error");
            valid = false;
        } else $("#billingZipGroup").removeClass("has-error");
        if (!emailReg.test(document.getElementById("email").value)) {
            $("#emailGroup").addClass("has-error");
            valid = false;
        } else $("#emailGroup").removeClass("has-error");
        if (document.getElementById("billingPhone").value.replace(/\D/g, '').length != 10) {
            $("#billingPhoneGroup").addClass("has-error");
            valid = false;
        } else $("#billingPhoneGroup").removeClass("has-error");
        if (valid) {
            billingPageDone = true;
            shippingPage();
            $("#billing-error-message").removeClass().addClass("bg-danger hidden page-error");
        } else {
            $("#billing-error-message").removeClass("hidden");
        }
    }

    $("#shippingZip").keyup(function() {
        $("#shippingZip").val(this.value.match(/[0-9]*/));
    });

    $("#shippingPhone").keyup(function() {
        var phoneNumDigits = this.value.replace(/\D/g, '');
        if (phoneNumDigits.length > 6) {
            $("#shippingPhone").val(phoneNumDigits.replace(/(\d{3})(\d{3})(\d)/, "($1) $2-$3"));
        } else if (phoneNumDigits.length > 3) {
            $("#shippingPhone").val(phoneNumDigits.replace(/(\d{3})(\d)/, "($1) $2"));
        } else {
            $("#shippingPhone").val(phoneNumDigits)
        }
    });

    function validateShippingPage() {
        var valid = true;
        if (document.getElementById("shippingFirstName").value.length < 1) {
            $("#shippingFirstNameGroup").addClass("has-error");
            console.log("fn");
            valid = false;
        } else $("#shippingFirstNameGroup").removeClass("has-error");
        if (document.getElementById("shippingLastName").value.length < 1) {
            $("#shippingLastNameGroup").addClass("has-error");
            console.log("ln");
            valid = false;
        } else $("#shippingLastNameGroup").removeClass("has-error");
        if (document.getElementById("shippingAddressLine1").value.length < 1) {
            $("#shippingAddressLine1Group").addClass("has-error");
            console.log("addr1");
            valid = false;
        } else $("#shippingAddressLine1Group").removeClass("has-error");
        if (document.getElementById("shippingCity").value.length < 1) {
            $("#shippingCityGroup").addClass("has-error");
            console.log("city");
            valid = false;
        } else $("#shippingCityGroup").removeClass("has-error");
        if (states.indexOf(document.getElementById("shippingState").value.toUpperCase()) == -1) {
            $("#shippingStateGroup").addClass("has-error");
            console.log("state");
            valid = false;
        } else $("#shippingStateGroup").removeClass("has-error");
        if (document.getElementById("shippingZip").value.length < 1) {
            $("#shippingZipGroup").addClass("has-error");
            console.log("zip");
            valid = false;
        } else $("#shippingZipGroup").removeClass("has-error");
        if (document.getElementById("shippingPhone").value.replace(/\D/g, '').length != 10) {
            $("#shippingPhoneGroup").addClass("has-error");
            console.log("phone");
            valid = false;
        } else $("#shippingPhoneGroup").removeClass("has-error");
        if (valid) {
            shippingPageDone = true;
            paymentPage();
            $("#shipping-error-message").removeClass().addClass("bg-danger hidden page-error");
        } else {
            $("#shipping-error-message").removeClass("hidden");
        }
    }

    $('#ccNumber').on('keyup', function(event) {
        var editKeyCodes = [37, 38, 39, 40];
        if (editKeyCodes.indexOf(event.keyCode) == -1) { // allows arrow keys
            var visaRegex = new RegExp("^4");
            var mcRegex = new RegExp("^5[1-5]");
            var amexRegexp = new RegExp("^3[47]");
            var discRegex = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
            if (this.value.match(visaRegex) != null) {
                $("#ccIcon").removeClass().addClass("fa fa-cc-visa");
                this.value = getDefaultFormattedCcNumber(this.value);
                setCvvAmexFormat(false);
                ccBrand = "VISA";
            } else if (this.value.match(mcRegex) != null) {
                $("#ccIcon").removeClass().addClass("fa fa-cc-mastercard");
                this.value = getDefaultFormattedCcNumber(this.value);
                setCvvAmexFormat(false);
                ccBrand = "MASTERCARD";
            } else if (this.value.match(amexRegexp) != null) {
                $("#ccIcon").removeClass().addClass("fa fa-cc-amex");
                this.value = getAmexFormattedCcNumber(this.value);
                setCvvAmexFormat(true);
                ccBrand = "AMEX";
            } else if (this.value.match(discRegex) != null) {
                $("#ccIcon").removeClass().addClass("fa fa-cc-discover");
                this.value = getDefaultFormattedCcNumber(this.value);
                setCvvAmexFormat(false);
                ccBrand = "DISCOVER";
            } else {
                $("#ccIcon").removeClass().addClass("fa fa-credit-card-alt");
                this.value = getDefaultFormattedCcNumber(this.value);
                setCvvAmexFormat(false);
                ccBrand = "-1";
            }
        }
    });

    $("#ccExp").keyup(function() {
        var exp = this.value.replace(/\D/g, '')
        if (exp.length > 2) {
            $("#ccExp").val(exp.replace(/(\d{2})(\d)/, "$1/$2"));
        } else {
            $("#ccExp").val(exp);
        }
    });

    function setCvvAmexFormat(amexFormat) {
        if (amexFormat) {
            $("#ccCvv").attr('placeholder', '####');
            $("#ccCvvLabel").text("CID:");
        } else {
            $("#ccCvv").attr('placeholder', '###');
            $("#ccCvvLabel").text("CVV:");
        }
    }

    function getDefaultFormattedCcNumber(ccNumInput) {
        ccNumInput = ccNumInput.replace(/ /g, '');
        if (ccNumInput.length > 12) {
            return ccNumInput.replace(/(\d{4})(\d{4})(\d{4})(\d)/, "$1 $2 $3 $4");
        } else if (ccNumInput.length > 8) {
            return ccNumInput.replace(/(\d{4})(\d{4})(\d)/, "$1 $2 $3");
        } else if (ccNumInput.length > 4) {
            return ccNumInput.replace(/(\d{4})(\d)/, "$1 $2");
        } else return ccNumInput;
    }

    function getAmexFormattedCcNumber(ccNumInput) {
        ccNumInput = ccNumInput.replace(/ /g, '');
        if (ccNumInput.length > 10) {
            return ccNumInput.replace(/(\d{4})(\d{6})(\d)/, "$1 $2 $3");
        } else if (ccNumInput.length > 4) {
            return ccNumInput.replace(/(\d{4})(\d)/, "$1 $2");
        } else return ccNumInput;
    }

    function validateExpDate() {
        var date = new Date();
        var expDate = document.getElementById("ccExp").value.replace(/ /g, '');
        var expMonth = parseInt(expDate.substring(0, 2));
        var expYear = parseInt(expDate.substring(2));

        if (expDate.length < 4) {
            return false
        } else if (expMonth < 1 || expMonth > 12) {
            return false
        } else if (expYear == parseInt(date.getFullYear().toString().substring(2)) && expMonth < parseInt(date.getMonth()) + 1) {
            return false
        } else if (expYear < parseInt(date.getFullYear().toString().substring(2))) {
            return false
        } else {
            return true;
        }
    }

    /**
     * Luhn algorithm in JavaScript: validate credit card number supplied as string of numbers
     * @author ShirtlessKirk. Copyright (c) 2012.
     * @license WTFPL (http://www.wtfpl.net/txt/copying)
     */
    var luhnChk = (function(arr) {
        return function(ccNum) {
            var
                len = ccNum.length,
                bit = 1,
                sum = 0,
                val;
            while (len) {
                val = parseInt(ccNum.charAt(--len), 10);
                sum += (bit ^= 1) ? arr[val] : val;
            }
            return sum && sum % 10 === 0;
        };
    }([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));

    function validatePaymentPage() {
        var valid = true;
        var cvvLength;
        var ccNumLength;
        var ccNum;
        if (ccBrand == "AMEX") {
            cvvLength = 4;
            ccNumLength = 15;
        } else {
            cvvLength = 3;
            ccNumLength = 16;
        }
        if (ccBrand == "-1") {
            $("#ccNumberGroup").addClass("has-error");
            valid = false;
        } else $("#ccNumberGroup").removeClass("has-error");
        if (document.getElementById("ccName").value.length < 1) {
            $("#ccNameGroup").addClass("has-error");
            valid = false;
        } else $("#ccNameGroup").removeClass("has-error");
        ccNum = document.getElementById("ccNumber").value.replace(/ /g, '');
        if (ccNum.length != ccNumLength || ccBrand == "-1" || !luhnChk(ccNum)) {
            $("#ccNumberGroup").addClass("has-error");
            valid = false;
        } else $("#ccNumberGroup").removeClass("has-error");
        if (document.getElementById("ccCvv").value.length != cvvLength) {
            $("#ccCvvGroup").addClass("has-error");
            valid = false;
        } else $("#ccCvvGroup").removeClass("has-error");
        if (validateExpDate()) {
            $("#ccExpGroup").removeClass("has-error");
        } else {
            $("#ccExpGroup").addClass("has-error");
        }
        if (valid && validateExpDate()) {
            paymentPageDone = true;
            reviewPage();
            $("#payment-error-message").removeClass().addClass("bg-danger hidden page-error");
        } else {
            $("#payment-error-message").removeClass("hidden");
        }
    }

    function validateCardCharge() {
        if (ccNumber.replace(/ /g, '') == "4000000000000101") {
            $("#cardDeclinedModal").modal({
                backdrop: 'static',
                keyboard: false
            });
        } else { receiptPage(); }
    }

    function setReviewReceiptValues() {
        billingFirstName = document.getElementById("billingFirstName").value;
        billingMiddleName = document.getElementById("billingMiddleName").value;
        billingLastName = document.getElementById("billingLastName").value;
        billingAddressLine1 = document.getElementById("billingAddressLine1").value;
        billingAddressLine2 = document.getElementById("billingAddressLine2").value;
        billingCity = document.getElementById("billingCity").value;
        billingState = document.getElementById("billingState").value;
        billingZip = document.getElementById("billingZip").value;
        email = document.getElementById("email").value;
        billingPhone = document.getElementById("billingPhone").value;

        shippingFirstName = document.getElementById("shippingFirstName").value;
        shippingMiddleName = document.getElementById("shippingMiddleName").value;
        shippingLastName = document.getElementById("shippingLastName").value;
        shippingAddressLine1 = document.getElementById("shippingAddressLine1").value;
        shippingAddressLine2 = document.getElementById("shippingAddressLine2").value;
        shippingCity = document.getElementById("shippingCity").value;
        shippingState = document.getElementById("shippingState").value;
        shippingZip = document.getElementById("shippingZip").value;
        shippingPhone = document.getElementById("shippingPhone").value;

        ccName = document.getElementById("ccName").value;
        ccNumber = document.getElementById("ccNumber").value;
        ccCvv = document.getElementById("ccCvv").value;
        ccExp = document.getElementById("ccExp").value;
    }

    function fillValues(page) {
        if (billingMiddleName.length > 0) var reviewBillingName = billingFirstName + " " + billingMiddleName + " " + billingLastName;
        else var reviewBillingName = billingFirstName + " " + billingLastName;
        if (billingAddressLine2.length > 0) var reviewBillingAddress = billingAddressLine1 + "<br />" + billingAddressLine2;
        else var reviewBillingAddress = billingAddressLine1;
        var reviewCityStZip = billingCity + ", " + billingState + " " + billingZip;
        var reviewBillingSection = reviewBillingName + "<br />" + reviewBillingAddress + "<br />" +
            reviewCityStZip + "<br />" + billingPhone + "<br />" + email;
        document.getElementById(page + "-billing-address").innerHTML = reviewBillingSection

        if (shippingMiddleName.length > 0) var reviewshippingName = shippingFirstName + " " + shippingMiddleName + " " + shippingLastName;
        else var reviewshippingName = shippingFirstName + " " + shippingLastName;
        if (shippingAddressLine2.length > 0) var reviewshippingAddress = shippingAddressLine1 + "<br />" + shippingAddressLine2;
        else var reviewshippingAddress = shippingAddressLine1;
        var reviewCityStZip = shippingCity + ", " + shippingState + " " + shippingZip;
        var reviewshippingSection = reviewshippingName + "<br />" + reviewshippingAddress + "<br />" +
            reviewCityStZip + "<br />" + shippingPhone;
        document.getElementById(page + "-shipping-address").innerHTML = reviewshippingSection;
        var lastDigits = "-1";
        if (ccBrand == "AMEX") {
            lastDigits = ccNumber.replace(/ /g, '').substring(9);
        } else {
            lastDigits = ccNumber.replace(/ /g, '').substring(12);
        }
        document.getElementById(page + "-payment-details").innerHTML = "Name on card: " + ccName + "<br />" +
            ccBrandIconElement(ccBrand) + " Ending in " + lastDigits + "<br />Expires " + ccExp + "<br />" + "<br />";
    }

    function ccBrandIconElement(brand) {
        return "<i class=\"fa fa-cc-" + brand.toLowerCase() + "\"></i>";
    }

    function billingPage() {
        $("#billing-address-form").show();
        $("#shipping-address-form").hide();
        $("#payment-method-form").hide();
        $("#review-form").hide();
        $("#billing-tab").addClass("active");
        if (!billingPageDone) $("#shipping-tab").addClass("disabled");
        else $("#shipping-tab").removeClass("active");
        if (!shippingPageDone) $("#payment-tab").addClass("disabled");
        else $("#payment-tab").removeClass("active");
        if (!paymentPageDone) $("#order-tab").addClass("disabled");
        else $("#order-tab").removeClass("active");
        if (!paymentPageDone) $("#review-tab").addClass("disabled");
        else $("#review-tab").removeClass("active");
        $("#receipt-form").hide();
    }

    function shippingPage() {
        $("#billing-address-form").hide();
        $("#shipping-address-form").show();
        $("#payment-method-form").hide();
        $("#review-form").hide();
        $("#billing-tab").removeClass("active");
        $("#shipping-tab").removeClass("disabled").addClass("active");
        if (!shippingPageDone) $("#payment-tab").addClass("disabled");
        else $("#payment-tab").removeClass("active");
        if (!paymentPageDone) $("#review-tab").addClass("disabled");
        else $("#review-tab").removeClass("active");
    }

    function paymentPage() {
        $("#billing-address-form").hide();
        $("#shipping-address-form").hide();
        $("#payment-method-form").show();
        $("#review-form").hide();
        $("#billing-tab").removeClass("active");
        $("#shipping-tab").removeClass("active");
        $("#payment-tab").removeClass("disabled").addClass("active");
        if (!paymentPageDone) $("#review-tab").addClass("disabled");
        else $("#review-tab").removeClass("active");
    }

    function reviewPage() {
        $("#billing-address-form").hide();
        $("#shipping-address-form").hide();
        $("#payment-method-form").hide();
        $("#review-form").show();
        $("#billing-tab").removeClass("active");
        $("#shipping-tab").removeClass("active");
        $("#payment-tab").removeClass("active");
        $("#review-tab").removeClass("disabled").addClass("active");
        setReviewReceiptValues();
        fillValues("review");
    }

    function receiptPage() {
        $("#checkout-nav").hide();
        $("#billing-address-form").hide();
        $("#shipping-address-form").hide();
        $("#payment-method-form").hide();
        $("#review-form").hide();
        $("#receipt-form").show();
        fillValues("receipt");
    }

    $("#sameAsBilling").click(function() {
        if (document.getElementById('sameAsBilling').checked) {
            $("#shippingFirstName").val($("#billingFirstName").val()).prop("disabled", true);
            $("#shippingMiddleName").val($("#billingMiddleName").val()).prop("disabled", true);
            $("#shippingLastName").val($("#billingLastName").val()).prop("disabled", true);
            $("#shippingAddressLine1").val($("#billingAddressLine1").val()).prop("disabled", true);
            $("#shippingAddressLine2").val($("#billingAddressLine2").val()).prop("disabled", true);
            $("#shippingCity").val($("#billingCity").val()).prop("disabled", true);
            $("#shippingState").val($("#billingState").val()).prop("disabled", true);
            $("#shippingZip").val($("#billingZip").val()).prop("disabled", true);
            $("#shippingPhone").val($("#billingPhone").val()).prop("disabled", true);
            $("#shipping-error-message").removeClass().addClass("bg-danger hidden page-error");
        } else {
            $("#shippingFirstName").val("").prop("disabled", false);
            $("#shippingMiddleName").val("").prop("disabled", false);
            $("#shippingLastName").val("").prop("disabled", false);
            $("#shippingAddressLine1").val("").prop("disabled", false);
            $("#shippingAddressLine2").val("").prop("disabled", false);
            $("#shippingCity").val("").prop("disabled", false);
            $("#shippingState").val("").prop("disabled", false);
            $("#shippingZip").val("").prop("disabled", false);
            $("#shippingPhone").val("").prop("disabled", false);
            $("#shipping-error-message").removeClass().addClass("bg-danger hidden page-error");
        }
    });

    billingPage();

    $("#next-shipping").click(function() {
        validateBillingPage();
    });
    $("#prev-billing").click(function() {
        billingPage();
    });

    $("#next-payment").click(function() {
        validateShippingPage();
    });

    $("#prev-shipping").click(function() {
        shippingPage();
    });

    $("#next-review").click(function() {
        validatePaymentPage();
    });

    $("#prev-payment").click(function() {
        paymentPage();
    });

    $("#next-place-order").click(function() {
        mockAsyncWaitModal();
    });

    $("#billing-tab").click(function() {
        if (!document.getElementById("billing-tab").classList.contains("disabled")) billingPage();
    });

    $("#shipping-tab").click(function() {
        if (!document.getElementById("shipping-tab").classList.contains("disabled")) shippingPage();
    });

    $("#payment-tab").click(function() {
        if (!document.getElementById("payment-tab").classList.contains("disabled")) paymentPage();
    });

    $("#review-tab").click(function() {
        if (!document.getElementById("review-tab").classList.contains("disabled")) reviewPage();
    });

    $("#declinedModalPaymentPageButton").click(function() {
        $("#cardDeclinedModal").modal('hide');
        paymentPage();
        $("#review-tab").addClass("disabled").removeClass("active");
    });

    function mockAsyncWaitModal() {
        $("#mockApiWaitModal").modal({
            backdrop: 'static',
            keyboard: false
        });

        // Mock back-end behavior - Wait for 1-10 seconds before proceeding
        var timeout = Math.floor((Math.random() * 10000) + 1000);
        setTimeout(function() {
            $("#mockApiWaitModal").modal('hide');
            validateCardCharge();
        }, timeout);
    }

});