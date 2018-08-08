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
    public class SpectaclesController : Controller
    {
        public SpectaclesController(ApplicationDBContext db) {
            this.DB = db;
        }

        public ApplicationDBContext DB { get; }

        [Authorize]
        [HttpGet]
        public IEnumerable<Spectacle> Get()
        {
            return this.DB.Spectacles;
        }

        [Authorize]
        [HttpGet("{id}")]
        public Spectacle Get(int id)
        {
            return this.DB.Spectacles.Find(id);
        }

        [Authorize]
        [HttpPost]
        public void Post([FromBody]Spectacle spectacle)
        {
            this.DB.Spectacles.Add(spectacle);
            this.DB.SaveChanges();
        }

        [Authorize]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Spectacle spectacle)
        {
            spectacle.Id = id;

            this.DB.Spectacles.Update(spectacle);
            this.DB.SaveChanges();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var spectacle = this.DB.Spectacles.Find(id);

            if (spectacle == null) return NoContent();

            this.DB.Spectacles.Remove(spectacle);
            this.DB.SaveChanges();

            return Ok();
        }
    }
}
