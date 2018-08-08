using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheaterApi.Data;

namespace TheaterApi.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        public UsersController(ApplicationDBContext db) {
            this.DB = db;
        }

        public ApplicationDBContext DB { get; }

        [Authorize]
        [HttpGet]
        public IEnumerable<AppUser> Get()
        {
            return this.DB.AppUsers;
        }

        [Authorize]
        [HttpGet("{id}")]
        public AppUser Get(int id)
        {
            return this.DB.AppUsers.Find(id);
        }

        [Authorize]
        [HttpPost]
        public void Post([FromBody]AppUser user)
        {
            this.DB.AppUsers.Add(user);
            this.DB.SaveChanges();
        }

        [Authorize]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]AppUser user)
        {
            user.Id = id;

            this.DB.AppUsers.Update(user);
            this.DB.SaveChanges();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = this.DB.AppUsers.Find(id);

            if (user == null) return NoContent();

            this.DB.AppUsers.Remove(user);
            this.DB.SaveChanges();

            return Ok();
        }
    }
}
