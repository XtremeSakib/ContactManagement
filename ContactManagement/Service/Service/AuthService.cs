using ContactManagement.Model;
using ContactManagement.Service.Interface;
using ContactManagement.UOW;

namespace ContactManagement.Service.Service
{
    public class AuthService : IAuthService
    {
        private readonly IUnitofWork _unitofWork;
        public AuthService(IUnitofWork unitofWork)
        {
            _unitofWork = unitofWork;

        }

        public string Login(string phoneNumber, string password)
        {
            // ১. UOW এর মাধ্যমে ডাটাবেজ থেকে এই নম্বরের ইউজারকে খুঁজে বের করা
            var user = _unitofWork.UserRepository.GetByPhoneNumber(phoneNumber);

            // কন্ডিশন ১: ইউজার যদি ডাটাবেজে না থাকে (ভুল নম্বর দিলে)
            if (user == null)
            {
                return "UserNotFound";
            }

            // ২. BCrypt দিয়ে চেক করা—ইনপুট দেওয়া পাসওয়ার্ড আর ডাটাবেজের হ্যাশ মিলছে কি না
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);

            // কন্ডিশন ২: পাসওয়ার্ড যদি ভুল হয়
            if (!isPasswordValid)
            {
                return "InvalidPassword";
            }

            // ৩. সব ঠিক থাকলে "Success" রিটার্ন করবে
            return "Success";
        }






        public bool Register(string phoneNumber, string password)
        {
            
            var existingUser = _unitofWork.UserRepository.GetByPhoneNumber(phoneNumber);
            if (existingUser != null) return false;

            // ২. পাসওয়ার্ড হ্যাশ করা
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

            var newUser = new User
            {
                PhoneNumber = phoneNumber,
                PasswordHash = hashedPassword
            };

            // ৩. UOW দিয়ে ডেটাবেজে সেভ করা
            _unitofWork.UserRepository.Add(newUser);
            _unitofWork.SaveChangesAsync();
            

            return true;


        }


}
}
