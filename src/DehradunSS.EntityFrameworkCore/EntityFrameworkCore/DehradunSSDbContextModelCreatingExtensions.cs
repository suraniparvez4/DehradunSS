using Microsoft.EntityFrameworkCore;
using Volo.Abp;
using Volo.Abp.EntityFrameworkCore.Modeling;
using DehradunSS.Emps;
namespace DehradunSS.EntityFrameworkCore
{
    public static class DehradunSSDbContextModelCreatingExtensions
    {
        public static void ConfigureDehradunSS(this ModelBuilder builder)
        {
            Check.NotNull(builder, nameof(builder));

            /* Configure your own tables/entities inside here */

            //builder.Entity<YourEntity>(b =>
            //{
            //    b.ToTable(DehradunSSConsts.DbTablePrefix + "YourEntities", DehradunSSConsts.DbSchema);
            //    b.ConfigureByConvention(); //auto configure for the base class props
            //    //...
            //});
            builder.Entity<Emp>(b =>
            {
                b.ToTable(DehradunSSConsts.DbTablePrefix + "Registerform", DehradunSSConsts.DbSchema);
                b.ConfigureByConvention(); //auto configure for the base class props
                //...
            });

        }
    }
}