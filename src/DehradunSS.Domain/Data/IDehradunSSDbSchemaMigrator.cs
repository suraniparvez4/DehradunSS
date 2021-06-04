using System.Threading.Tasks;

namespace DehradunSS.Data
{
    public interface IDehradunSSDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
