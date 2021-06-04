using System.Threading.Tasks;
using DehradunSS.Localization;
using DehradunSS.MultiTenancy;
using Volo.Abp.Identity.Web.Navigation;
using Volo.Abp.SettingManagement.Web.Navigation;
using Volo.Abp.TenantManagement.Web.Navigation;
using Volo.Abp.UI.Navigation;

namespace DehradunSS.Web.Menus
{
    public class DehradunSSMenuContributor : IMenuContributor
    {
        public async Task ConfigureMenuAsync(MenuConfigurationContext context)
        {
            if (context.Menu.Name == StandardMenus.Main)
            {
                await ConfigureMainMenuAsync(context);
            }
        }

        private async Task ConfigureMainMenuAsync(MenuConfigurationContext context)
        {
            var administration = context.Menu.GetAdministration();
            var l = context.GetLocalizer<DehradunSSResource>();

            
            
            if (MultiTenancyConsts.IsEnabled)
            {
                administration.SetSubItemOrder(TenantManagementMenuNames.GroupName, 1);
            }
            else
            {
                administration.TryRemoveMenuItem(TenantManagementMenuNames.GroupName);
            }

            administration.SetSubItemOrder(IdentityMenuNames.GroupName, 2);
            administration.SetSubItemOrder(SettingManagementMenuNames.GroupName, 3);
            //context.Menu.AddItem(
            //    new ApplicationMenuItem(
            //        "DehradunSS",
            //        l["DehradunSS"],
            //        icon: "fa fa-book"
            //    ).AddItem(
            //        new ApplicationMenuItem(
            //            "Emp.Emps",
            //            l["CityGIS"],
            //            url: "/DehradunSS/DehradunSS"
            //        )
            //    )
            //);
            context.Menu.Items.Insert(
               0,
               new ApplicationMenuItem(
                   DehradunSSMenus.CityGIS,
                   l["CityGIS"],
                   "~/DehradunSS/DehradunSS",
                   icon: "fas fa-home",
                   order: 0
               )
           );
            context.Menu.Items.Insert(
              0,
              new ApplicationMenuItem(
                  DehradunSSMenus.About,
                  l["About"],
                  "~/DehradunSS/About",
                  icon: "fas fa-home",
                  order: 0
              )
          );
            context.Menu.Items.Insert(
              0,
              new ApplicationMenuItem(
                  DehradunSSMenus.SignIn,
                  l["SignIn"],
                  "~/DehradunSS/SignIn",
                  icon: "fas fa-home",
                  order: 0
              )
            );
            context.Menu.Items.Insert(
                0,
                new ApplicationMenuItem(
                    DehradunSSMenus.Home,
                    l["Menu:Home"],
                    "~/",
                    icon: "fas fa-home",
                    order: 0
                )
            );
           
            
        }
    }
}
