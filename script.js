document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const canvas = document.getElementById('certificateCanvas');
    const ctx = canvas.getContext('2d');
    
    // Load your certificate image
    const img = new Image();
    img.src = 'certificate.jpg'; // Replace with your image path
    img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
        ctx.drawImage(img, 0, 0);
        ctx.font = '30px Arial';
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
    link.download = 'certificate.png';
    link.href = canvas.toDataURL();
    link.click();
});
