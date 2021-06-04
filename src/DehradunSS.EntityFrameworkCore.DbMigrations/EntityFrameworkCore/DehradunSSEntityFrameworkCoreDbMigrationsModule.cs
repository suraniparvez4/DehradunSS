using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace DehradunSS.EntityFrameworkCore
{
    [DependsOn(
        typeof(DehradunSSEntityFrameworkCoreModule)
        )]
    public class DehradunSSEntityFrameworkCoreDbMigrationsModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<DehradunSSMigrationsDbContext>();
        }
    }
}
