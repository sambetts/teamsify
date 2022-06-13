using OpenQA.Selenium.Chrome;
using System;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;

namespace API.Controllers
{
    public class ScreenshotController : ApiController
    {

        // GET api/Screenshot/Get?url={url}
        public HttpResponseMessage Get(string url)
        {
            var options = new ChromeOptions();
            options.AddArgument("--window-size=800,550");

            var driver = new ChromeDriver(options);

            driver.Navigate().GoToUrl(url);
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromMilliseconds(500);
            var ss = driver.GetScreenshot();
            
            driver.Quit();

            var base64 = Convert.ToBase64String(ss.AsByteArray);

            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(base64, System.Text.Encoding.UTF8);
            return response;

        }


    }
}
