using DehradunSS.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace DehradunSS
{
    [DependsOn(
        typeof(DehradunSSEntityFrameworkCoreTestModule)
        )]
    public class DehradunSSDomainTestModule : AbpModule
    {

    }
}