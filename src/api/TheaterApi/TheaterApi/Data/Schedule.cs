using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TheaterApi.Data
{
    public class Schedule
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int SpectacleId { get; set; }

        [ForeignKey(nameof(SpectacleId))]
        public virtual Spectacle Spectacle { get; set; }

        [Required]
        public int RoomId { get; set; }

        [ForeignKey(nameof(RoomId))]
        public virtual Room Room { get; set; }

        [Required]
        public DateTime StartsAt { get; set; }

        [Required]
        public DateTime EndsAt { get; set; }

        [JsonIgnore]
        public virtual List<Ticket> Tickets { get; set; }
    }
}
