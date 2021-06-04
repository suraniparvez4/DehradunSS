using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace DehradunSS.Emps
{
    public class Emp : AuditedAggregateRoot<Guid>
    {
        public string Fname { get; set; }

        public string Lname { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public decimal Mobno { get; set; }

        public string Email { get; set; }
    }
}
