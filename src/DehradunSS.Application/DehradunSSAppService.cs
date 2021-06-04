using System;
using System.Collections.Generic;
using System.Text;
using DehradunSS.Localization;
using Volo.Abp.Application.Services;

namespace DehradunSS
{
    /* Inherit your application services from this class.
     */
    public abstract class DehradunSSAppService : ApplicationService
    {
        protected DehradunSSAppService()
        {
            LocalizationResource = typeof(DehradunSSResource);
        }
    }
}
