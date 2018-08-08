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
    public class SchedulesController : Controller
    {
        public SchedulesController(ApplicationDBContext db) {
            this.DB = db;
        }

        public ApplicationDBContext DB { get; }

        [Authorize]
        [HttpGet]
        public IEnumerable<Schedule> Get()
        {
            return this.DB.Schedules;
        }

        [Authorize]
        [HttpGet("{id}")]
        public Schedule Get(int id)
        {
            return this.DB.Schedules.Find(id);
        }

        [Authorize]
        [HttpPost]
        public void Post([FromBody]Schedule schedule)
        {
            this.DB.Schedules.Add(schedule);
            this.DB.SaveChanges();
        }

        [Authorize]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Schedule schedule)
        {
            schedule.Id = id;

            this.DB.Schedules.Update(schedule);
            this.DB.SaveChanges();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var schedule = this.DB.Schedules.Find(id);

            if (schedule == null) return NoContent();

            this.DB.Schedules.Remove(schedule);
            this.DB.SaveChanges();

            return Ok();
        }
    }
}
