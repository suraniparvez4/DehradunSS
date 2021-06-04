using AutoMapper;
using DehradunSS.Emps;
namespace DehradunSS
{
    public class DehradunSSApplicationAutoMapperProfile : Profile
    {
        public DehradunSSApplicationAutoMapperProfile()
        {
            CreateMap<Emp, EmpDto>();
            CreateMap<CreateUpdateEmpDto, Emp>();
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */
        }
    }
}
