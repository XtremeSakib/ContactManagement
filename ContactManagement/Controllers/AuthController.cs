using Azure.Core;
using ContactManagement.Service;
using ContactManagement.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace ContactManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] AuthRequest request)
        {
            if (string.IsNullOrEmpty(request.PhoneNumber) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "You need to enter your mobile number and password!" });
            }

            var isSuccess = _authService.Register(request.PhoneNumber, request.Password);

            if (!isSuccess)
            {
                return BadRequest(new { message = "You already have an account with this mobile number!" });
            }

            return Ok(new { message = "Registration successful! 🚀" });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] AuthRequest request)
        {
            if (string.IsNullOrEmpty(request.PhoneNumber) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "মোবাইল নম্বর এবং পাসওয়ার্ড দুটিই দিতে হবে!" });
            }

            // সার্ভিসকে কল করে রেজাল্ট নেওয়া (PhoneNumber এর P বড় হাতের করে দেওয়া হয়েছে)
            var result = _authService.Login(request.PhoneNumber, request.Password);

            if (result == "UserNotFound")
            {
                return BadRequest(new { message = "No account found on this mobile number!" });
            }

            if (result == "InvalidPassword")
            {
                return BadRequest(new { message = "Wrong password! Try again." });
            }

            // সব ঠিক থাকলে ইউজারকে সাকসেস মেসেজ দেওয়া হবে
            return Ok(new { message = "Login successful! Welcome to the Contact Management dashboard 🚀" });
        }
    }

    // সাইন-আপ এবং লগইন দুটোর জন্যই এই একটি কমন ক্লাস ব্যবহার করা হয়েছে ঝামেলা এড়াতে
    public class AuthRequest
    {
        public string PhoneNumber { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
 