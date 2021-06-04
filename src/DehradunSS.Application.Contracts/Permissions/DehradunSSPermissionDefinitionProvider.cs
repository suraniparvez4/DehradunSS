using DehradunSS.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace DehradunSS.Permissions
{
    public class DehradunSSPermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(DehradunSSPermissions.GroupName);

            //Define your own permissions here. Example:
            //myGroup.AddPermission(DehradunSSPermissions.MyPermission1, L("Permission:MyPermission1"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<DehradunSSResource>(name);
        }
    }
}
