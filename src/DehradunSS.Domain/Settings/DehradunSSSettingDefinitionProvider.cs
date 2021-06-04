using Volo.Abp.Settings;

namespace DehradunSS.Settings
{
    public class DehradunSSSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            //Define your own settings here. Example:
            //context.Add(new SettingDefinition(DehradunSSSettings.MySetting1));
        }
    }
}
