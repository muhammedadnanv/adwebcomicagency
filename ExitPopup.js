// ExitPopup.js - JavaScript Module for Timer-based Exit Pop-up

class ExitPopup {
    constructor(timerDuration, formActionUrl) {
        this.timerDuration = timerDuration || 30000;  // Default to 30 seconds
        this.formActionUrl = formActionUrl || 'https://formbold.com/s/3Or40';  // Default FormBold URL
        this.popupElement = null;
        this.timer = null;
        this.timeRemaining = this.timerDuration / 1000;  // Convert to seconds
        this.init();
    }

    // Initialize the pop-up by creating the HTML structure and binding event listeners
    init() {
        this.createPopup();
        this.setupTimer();
        this.bindEvents();
    }

    // Create the HTML structure for the pop-up
    createPopup() {
        // Create pop-up div
        this.popupElement = document.createElement('div');
        this.popupElement.id = 'exit-popup';
        this.popupElement.style.display = 'none';
        this.popupElement.style.position = 'fixed';
        this.popupElement.style.top = '50%';
        this.popupElement.style.left = '50%';
        this.popupElement.style.transform = 'translate(-50%, -50%)';
        this.popupElement.style.padding = '30px';
        this.popupElement.style.backgroundColor = '#fff';
        this.popupElement.style.border = '1px solid #ddd';
        this.popupElement.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        this.popupElement.style.zIndex = '1000';
        this.popupElement.style.width = '400px';

        // Create HTML content inside pop-up
        this.popupElement.innerHTML = `
            <h3>Wait! Don’t Go Yet!</h3>
            <p>Before you leave, get a Free Website Audit and improve your online presence!</p>
            <form id="exit-form" method="POST" action="${this.formActionUrl}">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br>

                <label for="company">Company Name (Optional):</label>
                <input type="text" id="company" name="company"><br><br>

                <button type="submit">Claim My Free Audit</button>
            </form>
            <p id="countdown">Time left: ${this.timeRemaining} seconds</p>
        `;
        
        // Append the pop-up to the body
        document.body.appendChild(this.popupElement);
    }

    // Set up the timer to show the pop-up after the specified duration
    setupTimer() {
        setTimeout(() => {
            this.popupElement.style.display = 'block';
            this.startCountdown();  // Start countdown when pop-up is shown
        }, this.timerDuration);  // Trigger pop-up after timerDuration milliseconds
    }

    // Start a countdown that updates every 1 second
    startCountdown() {
        this.timer = setInterval(() => {
            if (this.timeRemaining > 0) {
                this.timeRemaining--;
                document.getElementById('countdown').textContent = `Time left: ${this.timeRemaining} seconds`;
            } else {
                clearInterval(this.timer);  // Stop the countdown once it reaches 0
            }
        }, 1000);  // Update every 1 second
    }

    // Bind close event for clicking outside of the pop-up
    bindEvents() {
        window.addEventListener('click', (event) => {
            if (event.target === this.popupElement) {
                this.popupElement.style.display = 'none';
                clearInterval(this.timer);  // Stop the countdown if the pop-up is closed
            }
        });
    }

    // Optionally, allow the user to manually close the pop-up
    closePopup() {
        this.popupElement.style.display = 'none';
        clearInterval(this.timer);  // Stop the countdown when manually closed
    }
}

// Export the module so it can be used in other parts of your app
export default ExitPopup;
