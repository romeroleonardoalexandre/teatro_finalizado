using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using TheaterApi.Data;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Autofac.Extensions.DependencyInjection;

namespace TheaterApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters {
                        ValidateIssuer           = true,
                        ValidateAudience         = true,
                        ValidateLifetime         = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer              = Environment.GetEnvironmentVariable(EnvNames.THEATERAPI_JWT_ISS),
                        ValidAudience            = Environment.GetEnvironmentVariable(EnvNames.THEATERAPI_JWT_AUD),
                        IssuerSigningKey         = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable(EnvNames.THEATERAPI_JWT_KEY)))
                    };
                });

            var connectionString = this.Configuration.GetConnectionString("TheaterApiDB");
            services.AddEntityFrameworkNpgsql()
                .AddDbContext<ApplicationDBContext>(options => {
                    options.UseNpgsql(connectionString);
                });

            services.AddMvc();

            var builder = new ContainerBuilder();
            builder.RegisterModule(new AutofacModule());
            builder.Populate(services);

            var container = builder.Build();

            return new AutofacServiceProvider(container);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
