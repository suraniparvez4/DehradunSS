using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace DehradunSS.Data
{
    /* This is used if database provider does't define
     * IDehradunSSDbSchemaMigrator implementation.
     */
    public class NullDehradunSSDbSchemaMigrator : IDehradunSSDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}