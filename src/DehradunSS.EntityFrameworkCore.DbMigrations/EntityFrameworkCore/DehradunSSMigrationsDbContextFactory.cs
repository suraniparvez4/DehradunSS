using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace DehradunSS.EntityFrameworkCore
{
    /* This class is needed for EF Core console commands
     * (like Add-Migration and Update-Database commands) */
    public class DehradunSSMigrationsDbContextFactory : IDesignTimeDbContextFactory<DehradunSSMigrationsDbContext>
    {
        public DehradunSSMigrationsDbContext CreateDbContext(string[] args)
        {
            DehradunSSEfCoreEntityExtensionMappings.Configure();

            var configuration = BuildConfiguration();

            var builder = new DbContextOptionsBuilder<DehradunSSMigrationsDbContext>()
                .UseNpgsql(configuration.GetConnectionString("Default"));

            return new DehradunSSMigrationsDbContext(builder.Options);
        }

        private static IConfigurationRoot BuildConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../DehradunSS.DbMigrator/"))
                .AddJsonFile("appsettings.json", optional: false);

            return builder.Build();
        }
    }
}
