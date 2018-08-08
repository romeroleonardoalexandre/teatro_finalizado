using Autofac;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheaterApi.Data;
using TheaterApi.Infra;
using TheaterApi.Infra.Impl;

namespace TheaterApi
{
    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            this.RegisterInfra(builder);

            this.RegisterMediatR(builder);

            this.RegisterCqrsHandlers(builder);
        }

        private void RegisterInfra(ContainerBuilder builder)
        {
            builder.RegisterType<DefaultPasswordToolkit>().As<IPasswordToolkit>();
        }

        private void RegisterMediatR(ContainerBuilder builder)
        {
            builder.RegisterType<Mediator>().As<IMediator>().InstancePerLifetimeScope();

            builder.Register<SingleInstanceFactory>(context => {
                var ctx = context.Resolve<IComponentContext>();
                return t => { object o; return ctx.TryResolve(t, out o) ? o : null; };
            }).InstancePerLifetimeScope();

            builder.Register<MultiInstanceFactory>(context => {
                var ctx = context.Resolve<IComponentContext>();
                return t => (IEnumerable<object>)ctx.Resolve(typeof(IEnumerable<>).MakeGenericType(t));
            }).InstancePerLifetimeScope();
        }

        private void RegisterCqrsHandlers(ContainerBuilder builder)
        {
            var types = (from type in this.ThisAssembly.GetTypes()
                         where type.IsClass
                            && type.GetInterfaces().Any(m => m.FullName.StartsWith("MediatR.IRequestHandler"))
                         select type).ToArray();

            foreach (var type in types) {
                builder.RegisterType(type).AsImplementedInterfaces();
            }
        }
    }
}
