// Phone input with better configuration
const phoneInput = window.intlTelInput(document.querySelector("#phone"), {
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    preferredCountries: ['us', 'gb', 'de', 'ua'],
    separateDialCode: true,
    customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
        return " " + selectedCountryPlaceholder.replace(/[0-9]/g, 'X');
    },
    initialCountry: "auto",
    geoIpLookup: function(callback) {
        fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(data => callback(data.country_code))
            .catch(() => callback("us"));
    }
});

// Enhanced form validation
document.getElementById('bandForm').addEventListener('submit', function(e) {
    const phoneNumber = phoneInput.getNumber();
    const email = document.getElementById('email').value;
    
    if (!phoneInput.isValidNumber()) {
        alert("Please enter a valid phone number");
        e.preventDefault();
        return;
    }
    
    if (!validateEmail(email)) {
        alert("Please enter a valid email address");
        e.preventDefault();
        return;
    }
    
    document.getElementById('phone').value = phoneNumber;
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}