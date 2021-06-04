using Volo.Abp.Modularity;

namespace DehradunSS
{
    [DependsOn(
        typeof(DehradunSSApplicationModule),
        typeof(DehradunSSDomainTestModule)
        )]
    public class DehradunSSApplicationTestModule : AbpModule
    {

    }
}