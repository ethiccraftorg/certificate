import { volunteersData } from './volunteers.js';

document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let selectedOption = document.getElementById('mySelect').value;
    // const userName = document.getElementById('userName').value;
    var userName = ""
    var imageSrc = ''
    if (selectedOption === '1') {
        userName = document.getElementById('userName').value;
        if (userName === '') {
            alert('Please enter your name');
            return;
        }
        imageSrc = './images/certificate.jpg'
    } else {
        var userEmail = document.getElementById('userEmail').value;
        if (userEmail === '') {
            alert('Please enter your email');
            return;
        }
        userName = searchName(userEmail)
        if (userName === '') {
            alert('Email not found in Volunteer Record');
            return;
        }
        imageSrc = './images/volunteer.jpg'
    }
    const canvas = document.getElementById('certificateCanvas');
    const ctx = canvas.getContext('2d');
    
    // Load your certificate image
    const img = new Image();

    img.src = imageSrc; // Replace with your image path
    img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
        ctx.drawImage(img, 0, 0);
        ctx.font = selectedOption === '1' ? "100px Great Vibes" : "60px Great Vibes";
        ctx.fillStyle = 'black'; // Text color
        ctx.textAlign = 'center';
        ctx.fillText(userName, canvas.width / 2, canvas.height / 2); // Center the text

        // Show download button
        document.getElementById('downloadBtn').style.display = 'block';
    };
});

// Download button functionality
document.getElementById('downloadBtn').addEventListener('click', function() {
    const canvas = document.getElementById('certificateCanvas');
    const link = document.createElement('a');
    link.download = 'udgaar-certificate.jpeg';
    link.href = canvas.toDataURL('image/jpeg',0.5);
    link.click();
    document.getElementById('downloadBtn').style.display = 'none';
});

document.getElementById('mySelect').addEventListener('change', function() {
    const selectedValue = this.value;

    if (selectedValue === '1') {
        document.getElementById('userEmail').style.display = 'none';
        document.getElementById('userName').style.display = 'inline';
    } else {
        document.getElementById('userName').style.display = 'none';
        document.getElementById('userEmail').style.display = 'inline';
    }
});

function searchName(email) {
    let flag = false
    let result = ''
    volunteersData.forEach(volunteer => {
        if (volunteer.email === email) {
            flag = true
            result = volunteer.name;
        }
    });
    return result;
}