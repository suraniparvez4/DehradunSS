using DehradunSS.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace DehradunSS.Web.Pages
{
    /* Inherit your PageModel classes from this class.
     */
    public abstract class DehradunSSPageModel : AbpPageModel
    {
        protected DehradunSSPageModel()
        {
            LocalizationResourceType = typeof(DehradunSSResource);
        }
    }
}