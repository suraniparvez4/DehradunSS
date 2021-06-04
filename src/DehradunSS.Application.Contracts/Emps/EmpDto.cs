using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace DehradunSS.Emps
{
    public class EmpDto : AuditedEntityDto<Guid>
    {
        
        public string Fname { get; set; }

        public string Lname { get; set; }
        
        public string Username { get; set; }
        
        public string Password { get; set; }
        
        public decimal Mobno { get; set; }
        
        public string Email { get; set; }
    }
}
