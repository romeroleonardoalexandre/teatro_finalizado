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
    public class RoomsController : Controller
    {
        public RoomsController(ApplicationDBContext db) {
            this.DB = db;
        }

        public ApplicationDBContext DB { get; }

        [Authorize]
        [HttpGet]
        public IEnumerable<Room> Get()
        {
            return this.DB.Rooms;
        }

        [Authorize]
        [HttpGet("{id}")]
        public Room Get(int id)
        {
            return this.DB.Rooms.Find(id);
        }

        [Authorize]
        [HttpPost]
        public void Post([FromBody]Room room)
        {
            this.DB.Rooms.Add(room);
            this.DB.SaveChanges();
        }

        [Authorize]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Room room)
        {
            room.Id = id;

            this.DB.Rooms.Update(room);
            this.DB.SaveChanges();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var room = this.DB.Rooms.Find(id);

            if (room == null) return NoContent();

            this.DB.Rooms.Remove(room);
            this.DB.SaveChanges();

            return Ok();
        }
    }
}
