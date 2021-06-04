using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace DehradunSS.Emps
{
    public class EmpAppService :
       CrudAppService<
           Emp,
           EmpDto,
           Guid,
           PagedAndSortedResultRequestDto,
           CreateUpdateEmpDto>,
       IEmpAppService
    {
        private readonly IRepository<Emp, Guid> _EmpRepository;
        public EmpAppService(IRepository<Emp, Guid> repository)
            : base(repository)
        {
            _EmpRepository = repository;
        }
        public async Task<List<EmpDto>> GetListAsync1()
        {
            var items = await _EmpRepository.GetListAsync();
            return items
                .Select(item => new EmpDto
                {
                    Id = item.Id,
                    Fname = item.Fname,
                    Lname= item.Lname,
                    Email = item.Email,
                    Username= item.Username,
                    Mobno = item.Mobno,
                    Password=item.Password
                }).ToList();
        }

        
        //public async Task DeleteAsync1(Guid id)
        //{
        //    await _EmpRepository.DeleteAsync(id);
        //}
    }
}
