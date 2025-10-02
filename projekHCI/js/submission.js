// Global variables for validation
let selectedTags = [];
let uploadedFile = null;

// File upload handling
document.getElementById('file-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('file-preview');
    
    if (file) {
        uploadedFile = file;
        preview.textContent = `Selected: ${file.name}`;
        preview.style.display = 'block';
        hideError('file-error');
    }
});

// Tag selection handling
document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tag = this.dataset.tag;
        
        if (this.classList.contains('selected')) {
            this.classList.remove('selected');
            selectedTags = selectedTags.filter(t => t !== tag);
        } else {
            this.classList.add('selected');
            selectedTags.push(tag);
        }
        
        if (selectedTags.length > 0) {
            hideError('category-error');
        }
    });
});

// Validation functions (without regex)
function validateEmail(email) {
    if (!email) return false;
    
    // Check for @ symbol
    const atIndex = email.indexOf('@');
    if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) return false;
    
    // Check for dot after @
    const dotIndex = email.indexOf('.', atIndex);
    if (dotIndex === -1 || dotIndex === atIndex + 1 || dotIndex === email.length - 1) return false;
    
    // Check for valid characters (basic check)
    for (let i = 0; i < email.length; i++) {
        const char = email[i];
        if (char === ' ' || char === '\t' || char === '\n') return false;
    }
    
    return true;
}

function validateTitle(title) {
    if (!title) return false;
    const trimmed = title.trim();
    return trimmed.length >= 3 && trimmed.length <= 50;
}

function validateDescription(description) {
    if (!description) return false;
    const trimmed = description.trim();
    return trimmed.length >= 10 && trimmed.length <= 500;
}

function validateFile() {
    if (!uploadedFile) return false;
    
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return validTypes.includes(uploadedFile.type);
}

function validateArtistType() {
    const radios = document.querySelectorAll('input[name="artist-type"]');
    for (let radio of radios) {
        if (radio.checked) return true;
    }
    return false;
}

function showError(errorId, message = null) {
    const errorElement = document.getElementById(errorId);
    const inputId = errorId.replace('-error', '');
    const inputElement = document.getElementById(inputId);
    
    if (inputElement) {
        inputElement.classList.add('error');
    }
    
    if (message) {
        errorElement.textContent = message;
    }
    errorElement.style.display = 'block';
}

function hideError(errorId) {
    const errorElement = document.getElementById(errorId);
    const inputId = errorId.replace('-error', '');
    const inputElement = document.getElementById(inputId);
    
    if (inputElement) {
        inputElement.classList.remove('error');
    }
    errorElement.style.display = 'none';
}

// Real-time validation
document.getElementById('email').addEventListener('input', function() {
    if (validateEmail(this.value)) {
        hideError('email-error');
    }
});

document.getElementById('title').addEventListener('input', function() {
    if (validateTitle(this.value)) {
        hideError('title-error');
    }
});

document.getElementById('description').addEventListener('input', function() {
    if (validateDescription(this.value)) {
        hideError('description-error');
    }
});

document.querySelectorAll('input[name="artist-type"]').forEach(radio => {
    radio.addEventListener('change', function() {
        if (validateArtistType()) {
            hideError('artist-type-error');
        }
    });
});

// Form submission
document.getElementById('submission-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate file
    if (!validateFile()) {
        showError('file-error');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        showError('email-error');
        isValid = false;
    }
    
    // Validate title
    const title = document.getElementById('title').value;
    if (!validateTitle(title)) {
        showError('title-error');
        isValid = false;
    }
    
    // Validate description
    const description = document.getElementById('description').value;
    if (!validateDescription(description)) {
        showError('description-error');
        isValid = false;
    }
    
    // Validate artist type
    if (!validateArtistType()) {
        showError('artist-type-error');
        isValid = false;
    }
    
    // Validate categories
    if (selectedTags.length === 0) {
        showError('category-error');
        isValid = false;
    }
    
    if (isValid) {
        alert('Artwork submitted successfully! (ﾉ◕ヮ◕)ﾉ:･ﾟ✧');
        // Here you would normally send the data to your server
        console.log({
            file: uploadedFile,
            email: email,
            title: title,
            description: description,
            artistType: document.querySelector('input[name="artist-type"]:checked').value,
            tags: selectedTags
        });
    }
});

// Reset form function
function resetForm() {
    document.getElementById('submission-form').reset();
    selectedTags = [];
    uploadedFile = null;
    
    // Reset tag buttons
    document.querySelectorAll('.tag-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Hide all errors
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    
    // Remove error classes
    document.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('error');
    });
    
    // Clear file preview
    document.getElementById('file-preview').style.display = 'none';
}