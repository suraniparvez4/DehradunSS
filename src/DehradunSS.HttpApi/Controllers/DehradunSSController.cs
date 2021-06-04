using DehradunSS.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace DehradunSS.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class DehradunSSController : AbpController
    {
        protected DehradunSSController()
        {
            LocalizationResource = typeof(DehradunSSResource);
        }
    }
}