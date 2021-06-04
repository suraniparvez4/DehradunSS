using DehradunSS.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace DehradunSS.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(DehradunSSEntityFrameworkCoreDbMigrationsModule),
        typeof(DehradunSSApplicationContractsModule)
        )]
    public class DehradunSSDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
