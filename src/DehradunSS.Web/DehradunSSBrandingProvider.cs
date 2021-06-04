using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;

namespace DehradunSS.Web
{
    [Dependency(ReplaceServices = true)]
    public class DehradunSSBrandingProvider : DefaultBrandingProvider
    {
        public override string AppName => "DehradunSS";
    }
}
