using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TheaterApi.Data
{
    public class Room
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        public int Seats { get; set; }

        public byte[] Map { get; set; }

        [JsonIgnore]
        public List<Schedule> Schedules { get; set; }
    }
}
