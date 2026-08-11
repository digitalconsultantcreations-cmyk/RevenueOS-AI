```javascript
// RevenueOS AI - Authentication

const SUPABASE_URL = "https://vrzougqxycvejchaxklw.supabase.co";

const SUPABASE_KEY = "sb_publishable_FbP8XHEvTsJ84tUJq4u9RA_DSoFaDQe";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ==============================
// REGISTRATION
// ==============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const button = registerForm.querySelector("button");

        button.disabled = true;
        button.textContent = "Creating Account...";

        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (error) {

            alert(error.message);

            button.disabled = false;
            button.textContent = "Create Account";

            return;
        }

        alert("Account created successfully! Check your email to verify your account.");

        window.location.href = "login.html";
    });
}


// ==============================
// LOGIN
// ==============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const button = loginForm.querySelector("button");

        button.disabled = true;
        button.textContent = "Signing In...";

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {

            alert(error.message);

            button.disabled = false;
            button.textContent = "Login";

            return;
        }

        window.location.href = "dashboard.html";
    });
}


// ==============================
// FORGOT PASSWORD
// ==============================

const forgotPassword = document.getElementById("forgotPassword");

if (forgotPassword) {

    forgotPassword.addEventListener("click", async function(event) {

        event.preventDefault();

        const email = prompt("Enter your email address:");

        if (!email) return;

        const { error } = await supabaseClient.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: window.location.origin + "/reset-password.html"
            }
        );

        if (error) {

            alert(error.message);

        } else {

            alert("Password reset instructions have been sent to your email.");
        }
    });
}
```
