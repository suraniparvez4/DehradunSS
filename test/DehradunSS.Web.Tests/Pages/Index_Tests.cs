using System.Threading.Tasks;
using Shouldly;
using Xunit;

namespace DehradunSS.Pages
{
    public class Index_Tests : DehradunSSWebTestBase
    {
        [Fact]
        public async Task Welcome_Page()
        {
            var response = await GetResponseAsStringAsync("/");
            response.ShouldNotBeNull();
        }
    }
}
