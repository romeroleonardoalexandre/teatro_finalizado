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
    public class TicketsController : Controller
    {
        public TicketsController(ApplicationDBContext db) {
            this.DB = db;
        }

        public ApplicationDBContext DB { get; }

        [Authorize]
        [HttpGet]
        public IEnumerable<Ticket> Get()
        {
            return this.DB.Tickets;
        }

        [Authorize]
        [HttpGet("{id}")]
        public Ticket Get(int id)
        {
            return this.DB.Tickets.Find(id);
        }

        [Authorize]
        [HttpPost]
        public void Post([FromBody]Ticket ticket)
        {
            this.DB.Tickets.Add(ticket);
            this.DB.SaveChanges();
        }

        [Authorize]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Ticket ticket)
        {
            ticket.Id = id;

            this.DB.Tickets.Update(ticket);
            this.DB.SaveChanges();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var ticket = this.DB.Tickets.Find(id);

            if (ticket == null) return NoContent();

            this.DB.Tickets.Remove(ticket);
            this.DB.SaveChanges();

            return Ok();
        }
    }
}
