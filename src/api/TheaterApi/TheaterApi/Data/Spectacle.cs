using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TheaterApi.Data
{
    public class Spectacle
    {
        [Key]
        public int Id { get; set; }
        
        [MaxLength(50)]
        public string Description { get; set; }

        public byte[] Photo { get; set; }
        
        public decimal? TicketValue { get; set; }

        [JsonIgnore]
        public List<Schedule> Schedules { get; set; }
    }
}
