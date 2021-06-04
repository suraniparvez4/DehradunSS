using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DehradunSS.Emps
{
    public class CreateUpdateEmpDto
    {
        
        [Required]
        public string Fname { get; set; }

        [Required]
        public string Lname { get; set; }

        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public decimal Mobno { get; set; }
        [Required]
        public string Email { get; set; }


    }
}
