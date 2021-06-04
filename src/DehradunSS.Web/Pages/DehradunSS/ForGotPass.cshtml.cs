using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Net.Mail;
using System.Net;
using DehradunSS.Emps;
namespace DehradunSS.Web.Pages.DehradunSS
{
    public class ForGotPassModel : DehradunSSPageModel
    {
        [BindProperty]
        public CreateUpdateEmpDto User { get; set; }
        public List<EmpDto> emp { get; set; }

        private readonly IEmpAppService _userAppService;
        public ForGotPassModel(IEmpAppService userAppService)
        {
            _userAppService = userAppService;
        }
        public void OnGet()
        {
        }
        public async Task<IActionResult> OnPostAsync()
        {
            //Console.WriteLine("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
            emp = await _userAppService.GetListAsync1();
            var t = emp.Find(x => (x.Email == User.Email));
            Console.WriteLine(t);
            if (t is null)
            {
                return Redirect("/DehradunSS/ForgotPass");
            }
            else
            {
                
                var body = "<h3>Your Password Is :"+ t.Password +" </h3>";
                var message = new MailMessage();
                message.To.Add(new MailAddress(User.Email));
                message.From = new MailAddress("jm5694990@gmail.com");
                message.Subject = "Dehradun SmartCity : Forgot Password";
                message.Body = string.Format(body);
                message.IsBodyHtml = true;
                using (var smtp = new SmtpClient())
                {
                    var credential = new NetworkCredential
                    {
                        UserName = "jm5694990@gmail.com",
                        Password = "Scan@9876"
                    };
                    smtp.Credentials = credential;
                    smtp.Port = 587;
                    smtp.Host = "smtp.gmail.com";
                    smtp.EnableSsl = true;
                    await smtp.SendMailAsync(message);

                }
                return Redirect("/DehradunSS/SignIn");

            }
           
        }
    }
}
