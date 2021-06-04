using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using DehradunSS.Emps;
namespace DehradunSS.Web.Pages.DehradunSS
{
    public class SignInModel : DehradunSSPageModel
    {
        [BindProperty]
        public CreateUpdateEmpDto User { get; set; }
        public List<EmpDto> emp { get; set; }

        private readonly IEmpAppService _userAppService;
        public SignInModel(IEmpAppService userAppService)
        {
            _userAppService = userAppService;
        }

        public void OnGet()
        {
            User = new CreateUpdateEmpDto();
        }
        public async Task<IActionResult> OnPostAsync()
        {
            //Console.WriteLine("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
            emp=await _userAppService.GetListAsync1();
            var t=emp.Find(x => (x.Username == User.Username && x.Password == User.Password));
            Console.WriteLine(t);
            

            if (t is null) {
                return Redirect("/DehradunSS/SignIn");
            }
            else {
                return Redirect("/DehradunSS/DehradunSS");
                
            }
        }
    }
}
