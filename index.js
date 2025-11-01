
const roleOptions = document.querySelectorAll('.role-option');
const userRoleInput = document.getElementById('userRole');
let farmer = document.getElementById('farmer')
let consumer = document.getElementById('consumer')
// console.log(farmer);
// console.log(consumer);

let active="consumer"

farmer.addEventListener("click",(e)=>{
    active="farmer"
    // console.log("farmer");
    
})

consumer.addEventListener("click",(e)=>{
    active="consumer"
    console.log("consumer");
})
// roleOptions[0].addEventListener("click",(e)=>{
//     e.preventDefault();
//     console.log(e.target.innerText)
// })

// roleOptions[1].addEventListener("click",(e)=>{
//     e.preventDefault();
//     console.log(e.target.innerText)
// })

document.addEventListener('DOMContentLoaded', function() {
    // Role selector
    
    roleOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            roleOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update hidden role input
            userRoleInput.value = this.dataset.role;
        });
    });

    
    
    // Form validation
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;
        
        // Full name validation
        const fullName = document.getElementById('fullName');
        const nameError = document.getElementById('nameError');
        if (!fullName.value.trim()) {
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }
        
        // Email validation
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }
        
        // Contact validation
        const contact = document.getElementById('contact');
        const contactError = document.getElementById('contactError');
        if (!contact.value.trim() || isNaN(contact.value)) {
            contactError.style.display = 'block';
            isValid = false;
        } else {
            contactError.style.display = 'none';
        }
        
        // Username validation
        const username = document.getElementById('username');
        const usernameError = document.getElementById('usernameError');
        if (username.value.length < 4) {
            usernameError.style.display = 'block';
            isValid = false;
        } else {
            usernameError.style.display = 'none';
        }
        
        // Password validation
        const password = document.getElementById('password');
        const passwordError = document.getElementById('passwordError');
        if (password.value.length < 6) {
            passwordError.style.display = 'block';
            isValid = false;
        } else {
            passwordError.style.display = 'none';
        }
        
        if (isValid) {
            // Store user data (in a real app, this would be sent to a server)
            const userData = {
                role: userRoleInput.value,
                fullName: fullName.value,
                email: email.value,
                contact: contact.value,
                username: username.value,
                password: password.value
            };
            
            // Save to localStorage (for demo purposes)
            const users = JSON.parse(localStorage.getItem('farmConnectUsers') || '[]');
            users.push(userData);
            localStorage.setItem('farmConnectUsers', JSON.stringify(users));
            
            const data = document.getElementsByClassName("active")
            console.log("data",data);

            //alert('Registration successful! You can now login.'); 
            
            
            if(active=='consumer'){
                window.location.href = './consumer-dashboard.html';
            }else{
                window.location.href = './farmer-dashboard.html';
            }
            
        }
    });
});
