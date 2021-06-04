using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
namespace DehradunSS.Emps
{
    public interface IEmpAppService :
         ICrudAppService<
             EmpDto,
             Guid,
             PagedAndSortedResultRequestDto,
             CreateUpdateEmpDto>
    {
        Task<List<EmpDto>> GetListAsync1();

        //Task<List<BusDto>> GetListAsync2();
        //Task DeleteAsync1(Guid id);
    }
}
