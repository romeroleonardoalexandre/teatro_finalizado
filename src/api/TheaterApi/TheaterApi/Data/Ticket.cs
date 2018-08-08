using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TheaterApi.Data
{
    public class Ticket
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public int ScheduleId { get; set; }

        [ForeignKey(nameof(ScheduleId))]
        public virtual Schedule Schedule { get; set; }

        [Required]
        public TicketType Type { get; set; }

        [Required]
        public decimal Value { get; set; }

        [MaxLength(5)]
        public string Seat { get; set; }

        [Required]
        public bool Paid { get; set; }

        [Required]
        public DateTime IssuedAt { get; set; }
    }
}
