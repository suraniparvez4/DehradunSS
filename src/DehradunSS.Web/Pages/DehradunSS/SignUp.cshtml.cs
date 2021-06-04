using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using DehradunSS.Emps;
namespace DehradunSS.Web.Pages.DehradunSS
{
    public class SignUpModel : DehradunSSPageModel
    {
        [BindProperty]
        public CreateUpdateEmpDto User { get; set; }

        private readonly IEmpAppService _userAppService;
        public SignUpModel(IEmpAppService userAppService)
        {
            _userAppService = userAppService;
        }

        public void OnGet()
        {
            User = new CreateUpdateEmpDto();
        }
        public async Task<IActionResult> OnPostAsync()
        {
            if (ModelState.IsValid)
            {
                await _userAppService.CreateAsync(User);
                return Redirect("/DehradunSS/SignIn");
            }
            else {
                return Redirect("/DehradunSS/SignUp");
            }
        }
    }
}
